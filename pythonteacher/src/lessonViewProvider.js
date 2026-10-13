const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const lessonContent = require('./lessons/content');
const lessonRegistry = require('./lessons');
const ProgressTracker = require('./progress');
const { getLocale } = require('./i18n');

// Lesson viewer panel: renders teaching content, handles navigation and practice launch
class LessonViewProvider {
    constructor(context) {
        this.context = context;
        this.panel = null;
        this.progress = new ProgressTracker(context);
    }

    showLesson(lessonId) {
        const lesson = lessonRegistry.getLesson(lessonId);
        if (!lesson) return;

        const content = lessonContent[lessonId];
        if (!content) return;

        const allLessons = lessonRegistry.getAllLessons();
        const currentIndex = allLessons.findIndex(l => l.id === lessonId);
        const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
        const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

        const completedLessons = this.progress.data.completedLessons;
        const unlockedLessons = {};
        for (const l of allLessons) {
            const idx = allLessons.indexOf(l);
            if (idx <= 0) {
                unlockedLessons[l.id] = true;
            } else {
                unlockedLessons[l.id] = !!completedLessons[allLessons[idx - 1].id];
            }
        }

        if (!this.panel) {
            this.panel = vscode.window.createWebviewPanel(
                'pythonTeacherLesson',
                'Lesson',
                vscode.ViewColumn.One,
                {
                    enableScripts: true,
                    localResourceRoots: [vscode.Uri.file(path.join(this.context.extensionPath, 'src', 'pages'))],
                    retainContextWhenHidden: true,
                }
            );

            this.panel.onDidDispose(() => {
                this.panel = null;
            });
        }

        const lessonData = {
            ...content,
            practice: lesson.practice,
            currentIndex,
            totalLessons: allLessons.length,
            prevDisabled: !prevLesson || !unlockedLessons[prevLesson.id],
            nextDisabled: !nextLesson || !unlockedLessons[nextLesson.id],
        };

        this.panel.title = (getLocale() === 'fa' && content.titleFa ? content.titleFa : content.titleEn) + ' - Python Teacher';
        this.panel.webview.html = this.getHtml();
        this.panel.webview.postMessage({
            command: 'showLesson',
            lesson: lessonData,
            locale: getLocale(),
        });

        this.panel.reveal(vscode.ViewColumn.One);

        this.panel.webview.onDidReceiveMessage(message => {
            switch (message.command) {
                case 'goBack':
                    this.panel.dispose();
                    vscode.commands.executeCommand('pythonteacher.openSidebar');
                    break;
                case 'navigate': {
                    const targetIndex = currentIndex + message.direction;
                    if (targetIndex >= 0 && targetIndex < allLessons.length) {
                        const targetLesson = allLessons[targetIndex];
                        if (unlockedLessons[targetLesson.id]) {
                            this.showLesson(targetLesson.id);
                        }
                    }
                    break;
                }
                case 'startPractice':
                    this.panel.dispose();
                    vscode.commands.executeCommand('pythonteacher.openPractice', lessonId, message.practiceIndex);
                    break;
                case 'setLanguage':
                    vscode.commands.executeCommand('pythonteacher.setLanguage', message.locale);
                    this.panel.webview.postMessage({
                        command: 'showLesson',
                        lesson: lessonData,
                        locale: message.locale,
                    });
                    break;
            }
        });
    }

    getHtml() {
        const htmlPath = path.join(this.context.extensionPath, 'src', 'pages', 'lessonView.html');
        if (!fs.existsSync(htmlPath)) {
            throw new Error(`HTML file not found at path: ${htmlPath}`);
        }
        return fs.readFileSync(htmlPath, 'utf8');
    }
}

module.exports = LessonViewProvider;
