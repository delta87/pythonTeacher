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
        this.webviewView = null;
    }

    refresh() {
        if (this.webviewView) {
            this.updateWebviewState(this.webviewView);
        }
    }

    resolveWebviewView(webviewView) {
        this.webviewView = webviewView;
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
        // Re-read from globalState so changes made by the lesson view are
        // reflected immediately instead of using a stale in-memory snapshot.
        this.progress.reload();

        const categories = lessonRegistry.getCategories();
        const allLessons = lessonRegistry.getAllLessons();
        const lessonStatus = this.progress.data.lessons || {};

        webviewView.webview.postMessage({
            command: 'updateState',
            state: {
                categories,
                allLessons,
                lessonStatus,
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
