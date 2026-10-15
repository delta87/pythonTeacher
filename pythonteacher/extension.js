// Entry point: registers commands, sidebar, and lesson view providers
const vscode = require('vscode');
const SideBarViewProvider = require('./src/sideBar');
const LessonViewProvider = require('./src/lessonViewProvider');
const ProgressTracker = require('./src/progress');
const lessonRegistry = require('./src/lessons');
const { t, setLocale, getLocale } = require('./src/i18n');

function activate(context) {
    const progress = new ProgressTracker(context);
    const documentLessonMap = new Map();
    const sideBarProvider = new SideBarViewProvider(context);
    const lessonView = new LessonViewProvider(context, () => refreshSidebar());

    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider('pythonTeacherView', sideBarProvider)
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('pythonteacher.openSidebar', () => {
            vscode.commands.executeCommand('workbench.view.extension.pythonTeacherSidebar');
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('pythonteacher.openLesson', (lessonId) => {
            lessonView.showLesson(lessonId);
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('pythonteacher.openPractice', (lessonId, practiceIndex) => {
            const lesson = lessonRegistry.getLesson(lessonId);
            if (!lesson || !lesson.practice || !lesson.practice[practiceIndex]) return;

            const exercise = lesson.practice[practiceIndex];
            const locale = getLocale();
            const question = locale === 'fa' && exercise.questionFa ? exercise.questionFa : exercise.question;

            vscode.workspace.openTextDocument({ language: 'python' }).then(doc => {
                documentLessonMap.set(doc.uri.toString(), { lessonId, type: 'practice', practiceIndex });

                vscode.window.showTextDocument(doc).then(editor => {
                    editor.edit(editBuilder => {
                        const title = locale === 'fa' ? 'تمرین عملی' : 'Practice Exercise';
                        editBuilder.insert(
                            new vscode.Position(0, 0),
                            `# ${title}: ${lessonId} #${practiceIndex + 1}\n# ${question}\n\n`
                        );
                    });
                    showValidationButton(lessonId, practiceIndex);
                });
            });
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('pythonteacher.setLanguage', (locale) => {
            setLocale(locale);
            vscode.window.showInformationMessage(
                locale === 'fa' ? 'زبان به فارسی تغییر کرد' : 'Language changed to English'
            );
            refreshSidebar();
        })
    );

    context.subscriptions.push(
        vscode.commands.registerCommand('pythonteacher.resetProgress', async () => {
            const answer = await vscode.window.showWarningMessage(
                t('resetConfirm'),
                t('yes'),
                t('no')
            );
            if (answer === t('yes')) {
                progress.reset();
                refreshSidebar();
                vscode.window.showInformationMessage(
                    getLocale() === 'fa' ? 'پیشرفت بازنشانی شد' : 'Progress has been reset'
                );
            }
        })
    );

    let currentValidationButton = null;
    let validateCommand = null;

    function showValidationButton(lessonId, practiceIndex) {
        if (currentValidationButton) {
            currentValidationButton.dispose();
        }

        const lesson = lessonRegistry.getLesson(lessonId);
        if (!lesson) return;

        const label = practiceIndex !== undefined
            ? `Validate ${lessonId} #${practiceIndex + 1}`
            : `Validate ${lessonId}`;

        const button = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
        button.text = `$(check) ${label}`;
        button.command = `pythonteacher.validateCode.${lessonId}`;
        button.tooltip = `${t('clickToValidate')} - ${lessonId}`;
        button.show();

        currentValidationButton = button;

        if (validateCommand) {
            validateCommand.dispose();
        }

        validateCommand = vscode.commands.registerCommand(`pythonteacher.validateCode.${lessonId}`, () => {
            const editor = vscode.window.activeTextEditor;
            if (!editor) return;

            const code = editor.document.getText();
            const docInfo = documentLessonMap.get(editor.document.uri.toString());

            let validateFn;
            if (docInfo && docInfo.type === 'practice' && lesson.practice && lesson.practice[docInfo.practiceIndex]) {
                validateFn = lesson.practice[docInfo.practiceIndex].validateCode;
            } else {
                validateFn = lesson.validateCode;
            }

            if (!validateFn) return;

            validateFn(code, (score) => {
                if (score === 100) {
                    vscode.window.showInformationMessage(`✅ ${t('perfect')} ${score}/100`);
                    if (docInfo && (docInfo.type === 'lesson' || docInfo.type === 'practice')) {
                        progress.markDone(lessonId);
                        refreshSidebar();
                    }
                } else if (score > 0 && score < 100) {
                    vscode.window.showInformationMessage(`⚠️ ${t('someIssues')} ${score}/100`);
                } else {
                    vscode.window.showInformationMessage(`❌ ${t('failed')} ${score}/100`);
                }
            });
        });

        context.subscriptions.push(button, validateCommand);
    }

    function refreshSidebar() {
        sideBarProvider.refresh();
    }

    context.subscriptions.push(
        vscode.window.onDidChangeActiveTextEditor(editor => {
            if (editor) {
                const docInfo = documentLessonMap.get(editor.document.uri.toString());
                if (docInfo) {
                    showValidationButton(docInfo.lessonId, docInfo.practiceIndex);
                } else if (currentValidationButton) {
                    currentValidationButton.hide();
                }
            }
        })
    );

}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
