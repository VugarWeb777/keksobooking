"use strict";
var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_TIMES = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var OFFER_TYPES = ['palace','flat','house','bungalo'];

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
function getRandomIndex(arr) {
    return Math.floor(Math.random()* arr.length);
}

function AddOffers(count) {
    var listAd = [];
    for (let i = 0; i <count; i++) {
        var locationX = getRandomNum(300, 900);
        var locationY = getRandomNum(130, 630);
        var OfferObj = {
            author: {
                "avatar": "img/avatars/user0" +(i+1)+ ".png"
            },
            offer: {
                "title": OFFER_TITLES[i],
                "address": locationX.toString()+',' + locationY.toString(),
                "price": getRandomNum(1000,1000000),
                "type": OFFER_TYPES[Math.floor(Math.random()* OFFER_TYPES.length)],
                "rooms": getRandomNum(1,5),
                "guests" : getRandomNum(1,5),
                "checkin": OFFER_TIMES[Math.floor(Math.random()* OFFER_TIMES.length)],
                "checkout": OFFER_TIMES[Math.floor(Math.random()* OFFER_TIMES.length)],
                "features": OFFER_FEATURES[Math.floor(Math.random() * OFFER_FEATURES.length)],
                "description": "",
                "photos": OFFER_PHOTOS.sort(function () {return Math.random() - 0.5})
            },
            location: {
                "x": locationX,
                "y": locationY
            }
        };
        console.log(OfferObj);
    }
    return listAd;
}

AddOffers(8);