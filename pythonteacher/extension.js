const vscode = require('vscode');
const SideBarViewProvider = require('./src/sideBar');


function activate(context) {
    // Register the Webview view
    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider('pythonTeacherSidebar', new SideBarViewProvider(context))
    );
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
