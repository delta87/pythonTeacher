// Persists per-lesson status across VS Code sessions via globalState.
// Status values: 'done' | 'in-progress' | 'not-started' (default)
const STORAGE_KEY = 'pythonteacher.progress';

const STATUS = {
    DONE: 'done',
    IN_PROGRESS: 'in-progress',
    NOT_STARTED: 'not-started',
};

class ProgressTracker {
    constructor(context) {
        this.context = context;
        this.data = this.load();
    }

    load() {
        const saved = this.context.globalState.get(STORAGE_KEY);
        if (saved && saved.lessons) {
            return saved;
        }

        // Migrate the older shape ({ completedLessons }) if present.
        const migrated = { lessons: {} };
        if (saved && saved.completedLessons) {
            for (const lessonId of Object.keys(saved.completedLessons)) {
                migrated.lessons[lessonId] = STATUS.DONE;
            }
        }
        return migrated;
    }

    // Re-read from globalState so multiple providers stay in sync.
    reload() {
        this.data = this.load();
    }

    save() {
        this.context.globalState.update(STORAGE_KEY, this.data);
    }

    getStatus(lessonId) {
        return this.data.lessons[lessonId] || STATUS.NOT_STARTED;
    }

    isDone(lessonId) {
        return this.getStatus(lessonId) === STATUS.DONE;
    }

    markInProgress(lessonId) {
        this.reload();
        if (this.data.lessons[lessonId] !== STATUS.DONE) {
            this.data.lessons[lessonId] = STATUS.IN_PROGRESS;
            this.save();
        }
    }

    markDone(lessonId) {
        this.reload();
        this.data.lessons[lessonId] = STATUS.DONE;
        this.save();
    }

    setStatus(lessonId, status) {
        this.reload();
        this.data.lessons[lessonId] = status;
        this.save();
    }

    reset() {
        this.data = { lessons: {} };
        this.save();
    }
}

ProgressTracker.STATUS = STATUS;

module.exports = ProgressTracker;
