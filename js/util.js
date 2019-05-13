"use strict";

(function () {
    window.util = {
        debounce: function (callback) {
            var DEBOUNCE_INTERVAL = 300;
            var lastTimeout;

            if (lastTimeout) {
                window.clearTimeout(lastTimeout);
            }
            lastTimeout = window.setTimeout(callback, DEBOUNCE_INTERVAL);
        },
    }
})();