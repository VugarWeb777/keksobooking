"use strict";

(function () {
    //render pins

    function mapPinsOnClickRender(evt) {
        if (evt.currentTarget.classList.contains("map__pin") && !evt.currentTarget.classList.contains("map__pin--main")){
            var pinIndex = evt.currentTarget.dataset.markerIndex;

            var mapCards = document.querySelectorAll(".map__card");

            for (let i = 0; i < mapCards.length; i++) {
                mapCards[i].style.display = "none";
                mapCards[pinIndex].style.display = "block";
            }
            var PopupClose =  function (event) {
                event.preventDefault();
                var currentPopup = event.target.parentNode;
                currentPopup.style.display = "none";
            };
            mapCards[pinIndex].querySelector(".popup__close").addEventListener("click",PopupClose);
        }
    }




    function RenderPins(arr,index) {
        var pinItem = Template.content.querySelector('.map__pin').cloneNode(true);
        pinItem.dataset.markerIndex = index;
        pinItem.style.left = arr.location.x + "px";
        pinItem.style.top = arr.location.y + "px";
        pinItem.querySelector('img').src = arr.author.avatar;
        pinItem.querySelector('img').alt = arr.offer.title;
        pinItem.addEventListener("click",mapPinsOnClickRender);
        return pinItem;
    }

    window.AppendPins = function () {
        var fragment = document.createDocumentFragment();
        var mapPinsOut = document.querySelector('.map__pins');
        for (var i = 0; i < listAd.length; i++) {
            fragment.appendChild(RenderPins(listAd[i],i))
        }
        mapPinsOut.appendChild(fragment);
    }
})();