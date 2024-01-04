export class setPreciseTimeout {
    constructor(callback, timeInterval, options) {
        this.timeInterval = timeInterval;
        this.isRunning = false;

        this.start = () => {
            this.expected = Date.now() + this.timeInterval;
            this.theTimeout = null;
            this.isRunning = true

            if (options.immediate) {
                callback();
            }

            this.timeout = setTimeout(this.round, this.timeInterval);
        };

        this.stop = () => {
            clearTimeout(this.timeout);
            this.isRunning = false;
        };

        this.setInterval = (interval) => {
            if (interval === Infinity) {
                return;
            }

            if (!this.isRunning) {
                this.timeInterval = interval
                return
            }

            this.stop()
            this.timeInterval = interval
            this.start()
        }

        this.round = () => {
            let drift = Date.now() - this.expected;
            if (drift > this.timeInterval) {
                if (options.errorCallback) {
                    options.errorCallback();
                }
            }
            callback();
            this.expected += this.timeInterval;
            this.timeout = setTimeout(this.round, this.timeInterval - drift);
        };
    }
}
