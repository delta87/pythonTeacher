// Persists lesson completion and scores across VS Code sessions via globalState
const STORAGE_KEY = 'pythonteacher.progress';

class ProgressTracker {
    constructor(context) {
        this.context = context;
        this.data = this.load();
    }

    load() {
        const saved = this.context.globalState.get(STORAGE_KEY);
        if (saved) {
            return saved;
        }
        return { completedLessons: {}, scores: {}, currentLesson: null };
    }

    save() {
        this.context.globalState.update(STORAGE_KEY, this.data);
    }

    isCompleted(lessonId) {
        return !!this.data.completedLessons[lessonId];
    }

    completeLesson(lessonId, score) {
        this.data.completedLessons[lessonId] = {
            score,
            completedAt: Date.now(),
        };
        if (!this.data.scores[lessonId] || score > this.data.scores[lessonId]) {
            this.data.scores[lessonId] = score;
        }
        this.save();
    }

    getScore(lessonId) {
        return this.data.scores[lessonId] || 0;
    }

    getCurrentLesson() {
        return this.data.currentLesson;
    }

    setCurrentLesson(lessonId) {
        this.data.currentLesson = lessonId;
        this.save();
    }

    getOverallProgress(totalLessons) {
        const completed = Object.keys(this.data.completedLessons).length;
        return totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;
    }

    reset() {
        this.data = { completedLessons: {}, scores: {}, currentLesson: null };
        this.save();
    }
}

module.exports = ProgressTracker;
