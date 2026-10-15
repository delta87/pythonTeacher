const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const lessonContent = require('./lessons/content');
const lessonRegistry = require('./lessons');
const ProgressTracker = require('./progress');
const { getLocale } = require('./i18n');

// Lesson viewer panel: renders teaching content, handles navigation, practice
// launch, and marking a lesson as read. The panel is created once and reused;
// content is pushed over postMessage (the webview asks for it with
// 'requestLesson' once it is ready, avoiding a load race).
class LessonViewProvider {
    constructor(context, onProgressChanged) {
        this.context = context;
        this.onProgressChanged = onProgressChanged || (() => {});
        this.panel = null;
        this.currentLessonId = null;
        this.currentLessonData = null;
        this.progress = new ProgressTracker(context);
    }

    showLesson(lessonId) {
        const lesson = lessonRegistry.getLesson(lessonId);
        if (!lesson) return;

        const content = lessonContent[lessonId];
        if (!content) {
            vscode.window.showWarningMessage(`Lesson content not found for "${lessonId}".`);
            return;
        }

        // Opening a lesson moves it to "in-progress" unless it is already done.
        this.progress.markInProgress(lessonId);

        this.currentLessonId = lessonId;
        this.currentLessonData = this.buildLessonData(lessonId, lesson, content);

        this.ensurePanel();
        this.panel.title =
            (getLocale() === 'fa' && content.titleFa ? content.titleFa : content.titleEn) +
            ' - Python Teacher';
        this.panel.reveal(vscode.ViewColumn.One);
        this.sendLesson();

        this.onProgressChanged();
    }

    ensurePanel() {
        if (this.panel) return;

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

        // Set the HTML once so the webview document (and its message listener)
        // is created only once. Re-setting it on every navigation caused the
        // postMessage that followed to be dropped before the webview was ready.
        this.panel.webview.html = this.getHtml();

        this.panel.webview.onDidReceiveMessage(message => this.handleMessage(message));

        this.panel.onDidDispose(() => {
            this.panel = null;
            this.currentLessonId = null;
            this.currentLessonData = null;
        });
    }

    buildLessonData(lessonId, lesson, content) {
        const allLessons = lessonRegistry.getAllLessons();
        const currentIndex = allLessons.findIndex(l => l.id === lessonId);
        const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
        const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

        this.progress.reload();

        return {
            ...content,
            practice: lesson.practice,
            currentIndex,
            totalLessons: allLessons.length,
            prevDisabled: !prevLesson,
            nextDisabled: !nextLesson,
            status: this.progress.getStatus(lessonId),
        };
    }

    sendLesson() {
        if (!this.panel || !this.currentLessonData) return;
        this.panel.webview.postMessage({
            command: 'showLesson',
            lesson: this.currentLessonData,
            locale: getLocale(),
        });
    }

    refreshCurrentLesson() {
        const lesson = lessonRegistry.getLesson(this.currentLessonId);
        const content = lessonContent[this.currentLessonId];
        if (!lesson || !content) return;
        this.currentLessonData = this.buildLessonData(this.currentLessonId, lesson, content);
        this.sendLesson();
    }

    handleMessage(message) {
        switch (message.command) {
            case 'requestLesson':
                this.sendLesson();
                break;

            case 'goBack':
                this.panel.dispose();
                vscode.commands.executeCommand('pythonteacher.openSidebar');
                break;

            case 'navigate': {
                const allLessons = lessonRegistry.getAllLessons();
                const currentIndex = allLessons.findIndex(l => l.id === this.currentLessonId);
                const targetIndex = currentIndex + message.direction;
                if (targetIndex >= 0 && targetIndex < allLessons.length) {
                    this.showLesson(allLessons[targetIndex].id);
                }
                break;
            }

            case 'startPractice': {
                const lessonId = this.currentLessonId;
                this.panel.dispose();
                vscode.commands.executeCommand('pythonteacher.openPractice', lessonId, message.practiceIndex);
                break;
            }

            case 'markRead':
                if (this.currentLessonId) {
                    this.progress.markDone(this.currentLessonId);
                    this.refreshCurrentLesson();
                    this.onProgressChanged();
                }
                break;

            case 'setLanguage':
                vscode.commands.executeCommand('pythonteacher.setLanguage', message.locale);
                this.sendLesson();
                break;
        }
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
