const { spawn } = require('child_process');

function getPythonCommand() {
    const { execSync } = require('child_process');
    try {
        execSync('python3 --version', { stdio: 'ignore' });
        return 'python3';
    } catch {
        try {
            execSync('python --version', { stdio: 'ignore' });
            return 'python';
        } catch {
            return null;
        }
    }
}

function runPythonCodeWi(code, userInput = null, callback, timeoutMs = 10000) {
    const pythonCmd = getPythonCommand();
    if (!pythonCmd) {
        callback(1, 'Python is not installed or not found in PATH');
        return;
    }

    const pythonProcess = spawn(pythonCmd, ['-c', code]);
    let output = '';
    let error = '';
    let timedOut = false;

    const timer = setTimeout(() => {
        timedOut = true;
        pythonProcess.kill();
    }, timeoutMs);

    pythonProcess.stdout.on('data', (data) => {
        output += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        error += data.toString();
    });

    pythonProcess.on('close', (code) => {
        clearTimeout(timer);
        if (timedOut) {
            callback(1, 'Execution timed out');
        } else if (code === 0) {
            callback(0, output.trim());
        } else {
            callback(1, error.trim());
        }
    });

    pythonProcess.on('error', (err) => {
        clearTimeout(timer);
        callback(1, err.message);
    });

    if (userInput) {
        pythonProcess.stdin.write(userInput);
    }
    pythonProcess.stdin.end();
}

module.exports = runPythonCodeWi;
