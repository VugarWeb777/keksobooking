"use strict";
var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_TIMES = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var Template = document.querySelector('template');

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandomIndex(arr) {
    return Math.floor(Math.random() * arr.length);
}

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
};

function RemoveChilds(el) {
    for (var i = el.children.length - 1; i >= 0; i--) {
        el.removeChild(el.children[i]);
    }
    return el;
}

var listAd = [];

function createOffers() {

    for (let i = 0; i < 8; i++) {
        var locationX = getRandomNum(300, 900);
        var locationY = getRandomNum(130, 630);
        var OfferObj = {
            author: {
                "avatar": "img/avatars/user0" + (i + 1) + ".png"
            },
            offer: {
                "title": OFFER_TITLES[i],
                "address": locationX.toString() + ',' + locationY.toString(),
                "price": getRandomNum(1000, 1000000),
                "type": OFFER_TYPES[Math.floor(Math.random() * OFFER_TYPES.length)],
                "rooms": getRandomNum(1, 5),
                "guests": getRandomNum(1, 5),
                "checkin": OFFER_TIMES[Math.floor(Math.random() * OFFER_TIMES.length)],
                "checkout": OFFER_TIMES[Math.floor(Math.random() * OFFER_TIMES.length)],
                "features": generateArrayRandomLength(OFFER_FEATURES),
                "description": "",
                "photos": mixArray(OFFER_PHOTOS)
            },
            location: {
                "x": locationX,
                "y": locationY
            }
        };
        listAd.push(OfferObj);
    }
    return listAd;
}

createOffers();



function mapPinsOnClickRender(evt) {
    if (evt.currentTarget.classList.contains("map__pin") && !evt.currentTarget.classList.contains("map__pin--main")){
        var pinIndex = evt.currentTarget.dataset.markerIndex;

        var mapCards = document.querySelectorAll(".map__card");

        for (let i = 0; i < mapCards.length; i++) {
            mapCards[i].style.display = "none";
            mapCards[pinIndex].style.display = "block";
        }
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

function AppendPins() {
    var fragment = document.createDocumentFragment();
    var mapPinsOut = document.querySelector('.map__pins');
    for (var i = 0; i < listAd.length; i++) {
        fragment.appendChild(RenderPins(listAd[i],i))
    }
    mapPinsOut.appendChild(fragment);
}


function RenderOffers(arr,index) {
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
}


function AppendOffers() {
    var map = document.querySelector('.map');
    var mapFilterContainer = map.querySelector('.map__filters-container');
    var OfferFragment = document.createDocumentFragment();
    for (var i = 0; i < listAd.length; i++) {
        OfferFragment.appendChild(RenderOffers(listAd[i],i));
    }
    return map.insertBefore(OfferFragment, mapFilterContainer);
}



