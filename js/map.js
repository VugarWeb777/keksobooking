"use strict";

var features = ["wifi","dishwasher","parking","washer","elevator","conditioner"];
var photos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];

var objEx = {
    author: {
        "avatar": "img/avatars/user01.png"
    },
    offer: {
        "title": "Большая уютная квартира",
        "address": "600,300",
        "price": Math.floor(Math.random()* (1000-1 + 1) - 1),
        "type": "palace",
        "rooms": Math.floor(Math.random()* (5-1 + 1) - 1),
        "guests" : Math.floor(Math.random()* (100-1+1)-1),
        "checkin": "12:00",
        "checkout": "13:00",
        "features": features[Math.floor(Math.random() * features.length-1)],
        "description": "",
        "photos": photos.sort(function () {return Math.random() - 0.5})
    },
    location: {
        "x": 100,
        "y": Math.floor(Math.random() * (630-130 + 1) + 130)
    }
};

console.log(objEx);
