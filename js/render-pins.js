"use strict";

(function () {
    //render pins

    function mapPinsOnClickRender(evt) {
        if (evt.currentTarget.classList.contains("map__pin") && !evt.currentTarget.classList.contains("map__pin--main")) {
            var pinIndex = evt.currentTarget.dataset.markerIndex;

            var mapCards = document.querySelectorAll(".map__card");

            for (let i = 0; i < mapCards.length; i++) {
                mapCards[i].style.display = "none";
                mapCards[pinIndex].style.display = "block";
            }
            var PopupClose = function (event) {
                event.preventDefault();
                var currentPopup = event.target.parentNode;
                currentPopup.style.display = "none";
            };
            mapCards[pinIndex].querySelector(".popup__close").addEventListener("click", PopupClose);
        }
    }


    window.RenderPins = function (arr) {
        var mapPins = document.querySelector('.map__pins');

        for (let i = 0; i < arr.length; i++) {
            var pinItem = Template.content.querySelector('.map__pin').cloneNode(true);
            pinItem.dataset.markerIndex = i;
            pinItem.style.left = arr[i].location.x + "px";
            pinItem.style.top = arr[i].location.y + "px";
            pinItem.querySelector('img').src = arr[i].author.avatar;
            pinItem.querySelector('img').alt = arr[i].offer.title;
            pinItem.addEventListener("click", mapPinsOnClickRender);
            mapPins.appendChild(pinItem);
        }
    };
})();