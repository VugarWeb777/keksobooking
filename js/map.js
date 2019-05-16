"use strict";

(function () {
    var btnMapPin = document.querySelector(".map__pin--main");

    btnMapPin.addEventListener("mousedown", function (evt) {
        evt.preventDefault();

        window.startCoords = {
            x: evt.clientX,
            y: evt.clientY
        };

        var dragged = false;

        function onMouseMove(moveEvt) {
            moveEvt.preventDefault();
            dragged = true;

            var shift = {
                x: startCoords.x - moveEvt.clientX,
                y: startCoords.y - moveEvt.clientY
            };

            window.startCoords = {
                x: moveEvt.clientX,
                y: moveEvt.clientY
            };

            btnMapPin.style.top = (btnMapPin.offsetTop - shift.y) + "px";
            btnMapPin.style.left = (btnMapPin.offsetLeft - shift.x) + "px";
        }

        function onMouseUp(upEvt) {
            upEvt.preventDefault();

            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
        }

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });
})();






