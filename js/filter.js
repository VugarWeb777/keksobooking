"use strict";
(function () {
    var formFilter = document.forms["filter-form"];
    var housingType = formFilter["housing-type"];
    var housingPrice = formFilter["housing-price"];
    var housingRooms = formFilter["housing-rooms"];
    var housingGuests = formFilter["housing-guests"];
    var housingFeatures = formFilter.querySelector("#housing-features");

    var offers = [];

    window.GetOffers = function (data) {
        offers = data;
        window.AppendOffers(data);
    };

    var FilterType = function(){
        window.AppendOffers(offers.slice().filter(function (it) {
            return it.offer.type === "house";
        }).map(function (value) {
            console.log(value);
            return value;
        }))
    };

    var FilterPrice = function(){
        window.AppendOffers(offers.slice().filter(function (it) {
            return it.offer.price >= 50000;
        }).map(function (value) {
            console.log(value);
            return value;
        }))
    };

    housingType.addEventListener("change",FilterType);
    housingPrice.addEventListener("change",FilterPrice);

})();
