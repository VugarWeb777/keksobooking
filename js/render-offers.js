"use strict";

(function () {
    // render offers

    function RemoveChilds(el) {
        for (var i = el.children.length - 1; i >= 0; i--) {
            el.removeChild(el.children[i]);
        }
        return el;
    }

    window.RenderOffers = function (arr,index) {
        var OfferItem = Template.content.querySelector('.map__card').cloneNode(true);
        var featuresContainer = OfferItem.querySelector('.popup__features');
        var picturesContainer = OfferItem.querySelector('.popup__pictures');
        var offerType = OfferItem.querySelector('.popup__type');

        OfferItem.style.display = "none";
        OfferItem.dataset.cardIndex = index;
        OfferItem.querySelector('.popup__avatar').src = arr.author.avatar;
        OfferItem.querySelector('.popup__title').textContent = arr.offer.title;
        OfferItem.querySelector('.popup__text--address').textContent = arr.offer.address;
        OfferItem.querySelector('.popup__text--price').textContent = arr.offer.price + ' ₽/ночь';
        OfferItem.querySelector('.popup__type').textContent = arr.offer.type;
        OfferItem.querySelector('.popup__text--capacity').textContent = arr.offer.rooms + " команты" + " для " + arr.offer.guests + " гостей";
        OfferItem.querySelector('.popup__text--time').textContent = 'Заезд после ' + arr.offer.checkin + ', выезд до ' + arr.offer.checkout;
        OfferItem.querySelector('.popup__description').textContent = arr.offer.description;

        if (arr.offer.type === 'flat') {
            offerType.textContent = 'Квартира';
        } else if (arr.offer.type === 'bungalo') {
            offerType.textContent = 'Бунгало';
        } else if (arr.offer.type === 'palace') {
            offerType.textContent = 'Дворец';
        } else {
            offerType.textContent = 'Дом';
        }

        RemoveChilds(featuresContainer);
        RemoveChilds(picturesContainer);

        if (arr.offer.features.length > 0) {
            for (var i = 0; i < arr.offer.features.length; i++) {
                var featuresElement = document.createElement("li");
                featuresElement.classList.add('feature');
                featuresElement.classList.add('feature--' + arr.offer.features[i]);
                featuresContainer.appendChild(featuresElement);
            }
        } else {
            featuresContainer.remove();
        }
        if (arr.offer.photos.length > 0) {
            for (var j = 0; j < arr.offer.photos.length; j++) {
                var pictureElement = document.createElement('img');
                pictureElement.src = arr.offer.photos[j];
                pictureElement.classList.add('popup__photo');
                pictureElement.width = 45;
                pictureElement.height = 40;
                picturesContainer.appendChild(pictureElement);
            }
        } else {
            picturesContainer.remove();
        }

        return OfferItem;
    };


    window.AppendOffers = function() {
        var map = document.querySelector('.map');
        var mapFilterContainer = map.querySelector('.map__filters-container');
        var OfferFragment = document.createDocumentFragment();
        for (var i = 0; i < listAd.length; i++) {
            OfferFragment.appendChild(RenderOffers(listAd[i],i));
        }
        return map.insertBefore(OfferFragment, mapFilterContainer);
    }

})();