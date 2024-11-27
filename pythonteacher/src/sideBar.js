const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

class SideBarViewProvider {
    constructor(context) {
        this.context = context;
    }

    resolveWebviewView(webviewView) {
        webviewView.webview.options = {
            enableScripts: true
        };
        try {
            // Attempt to load the HTML content from the external file
            webviewView.webview.html = this.getHtmlForWebview(webviewView.webview);
        } catch (error) {
            webviewView.webview.html = "<html><body><h2>Error loading sidebar content</h2></body></html>";
        }

        webviewView.webview.onDidReceiveMessage(message => {
            switch (message.command) {
                case 'pythonteacher.openLessonFile':
                    vscode.commands.executeCommand(message.command, message.lessonTitle);
                    break;
            }
        });
    }

    getHtmlForWebview(webview) {
        const htmlPath = path.join(this.context.extensionPath, 'src/pages/sideBar.html');
        if (!fs.existsSync(htmlPath)) {
            throw new Error(`HTML file not found at path: ${htmlPath}`);
        }
        return fs.readFileSync(htmlPath, 'utf8');
    }
}

module.exports = SideBarViewProvider;
