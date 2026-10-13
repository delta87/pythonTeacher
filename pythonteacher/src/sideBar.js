const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const ProgressTracker = require('./progress');
const lessonRegistry = require('./lessons');

// Sidebar webview: displays lessons/categories/progress, communicates via postMessage
class SideBarViewProvider {
    constructor(context) {
        this.context = context;
        this.progress = new ProgressTracker(context);
    }

    resolveWebviewView(webviewView) {
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [vscode.Uri.file(path.join(this.context.extensionPath, 'src', 'pages'))],
        };

        webviewView.webview.html = this.getHtmlForWebview(webviewView.webview);

        webviewView.webview.onDidReceiveMessage(message => {
            switch (message.command) {
                case 'openLesson':
                    vscode.commands.executeCommand('pythonteacher.openLesson', message.lessonId);
                    break;
                case 'openPractice':
                    vscode.commands.executeCommand('pythonteacher.openPractice', message.lessonId, message.practiceIndex);
                    break;
                case 'setLanguage':
                    vscode.commands.executeCommand('pythonteacher.setLanguage', message.locale);
                    break;
                case 'resetProgress':
                    vscode.commands.executeCommand('pythonteacher.resetProgress');
                    break;
                case 'requestState':
                    this.updateWebviewState(webviewView);
                    break;
            }
        });

        webviewView.onDidChangeVisibility(() => {
            if (webviewView.visible) {
                this.updateWebviewState(webviewView);
            }
        });
    }

    updateWebviewState(webviewView) {
        const categories = lessonRegistry.getCategories();
        const completedLessons = this.progress.data.completedLessons;
        const scores = this.progress.data.scores;
        const allLessons = lessonRegistry.getAllLessons();

        const unlockedLessons = {};
        for (const lesson of allLessons) {
            const idx = allLessons.indexOf(lesson);
            if (idx <= 0) {
                unlockedLessons[lesson.id] = true;
            } else {
                const prev = allLessons[idx - 1];
                unlockedLessons[lesson.id] = !!completedLessons[prev.id];
            }
        }

        webviewView.webview.postMessage({
            command: 'updateState',
            state: {
                categories,
                completedLessons,
                unlockedLessons,
                scores,
                allLessons,
            },
        });
    }

    getHtmlForWebview() {
        const htmlPath = path.join(this.context.extensionPath, 'src', 'pages', 'sideBar.html');
        if (!fs.existsSync(htmlPath)) {
            throw new Error(`HTML file not found at path: ${htmlPath}`);
        }
        return fs.readFileSync(htmlPath, 'utf8');
    }
}

module.exports = SideBarViewProvider;
