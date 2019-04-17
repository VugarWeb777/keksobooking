"use strict";

(function () {
    window.Template = document.querySelector('template');

    function getRandomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    window.getRandomIndex  = function(arr) {
        return Math.floor(Math.random() * arr.length);
    };

    var mixArray = function (arr) {
        var newArr = arr.slice();
        for (var i = newArr.length - 1; i > 0; i--) {
            var num = Math.floor(Math.random() * (i + 1));
            var buffer = newArr[num];
            newArr[num] = newArr[i];
            newArr[i] = buffer;
        }
        return newArr;
    };

    var generateArrayRandomLength = function (arr) {
        var newArr = arr.slice();
        return mixArray(newArr).slice(0, getRandomNum(1, newArr.length - 1));
        /*var newArr = [];
        var randLength = getRandomNum(1,arr.length-1);
        for (let i = 0; i < randLength; i++) {
            newArr.push(arr[i]);
        }
        return newArr;*/
    };
})();