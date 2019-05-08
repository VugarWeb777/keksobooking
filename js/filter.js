"use strict";
(function () {
    var formFilter = document.forms["filter-form"];
    var housingType = formFilter["housing-type"];
    var housingPrice = formFilter["housing-price"];
    var housingRooms = formFilter["housing-rooms"];
    var housingGuests = formFilter["housing-guests"];
    var housingFeatures = formFilter.querySelector("#housing-features");

    var offers = [];

    var priceVal;
    var filtersDefaults = {
        'housing-type': 'any',
        'housing-price': 'any',
        'housing-rooms': 'any',
        'housing-guests': 'any',
        'filter-wifi': false,
        'filter-dishwasher': false,
        'filter-parking': false,
        'filter-washer': false,
        'filter-elevator': false,
        'filter-conditioner': false
    };

    //Сохранение данных
    window.GetOffers = function (data) {
        offers = data;
        window.AppendOffers(data);
    };

    //Фильтр по типу жилья
    var FilterByType = function (evt) {
        var filteredType = offers.slice().filter(function (it) {
            return evt.target.value === filtersDefaults["housing-type"] ? true : evt.target.value === it.offer.type;
        }).map(value => value);
        window.AppendOffers(filteredType);
    };


    //Фильтр по цене жилья
    var FilterByPrice = function (evt) {
        var middlePrice = 10000;
        var maxPrice = 50000;

        //Фильтр по цене без жилья
        var filterPrice = offers.slice().filter(function (it) {
            switch (evt.target.value) {
                case "middle" :
                    return it.offer.price >= middlePrice && it.offer.price <= maxPrice;
                case "low" :
                    return it.offer.price <= middlePrice;
                case "high" :
                    return it.offer.price >= maxPrice;
                case filtersDefaults["housing-price"]:
                    return it.offer.price;
            }
        }).map(function (value) {
            return value;
        });
        window.AppendOffers(filterPrice);
    };


    var FilterByRooms = function (evt) {
        var filterRooms = offers.slice().filter(function (it) {
            return evt.target.value === filtersDefaults["housing-rooms"] ? true : evt.target.value === it.offer.rooms.toString();
        }).map(value => value);
        window.AppendOffers(filterRooms);
    };

    var FilterByGuests = function (evt) {
        var filterGuests = offers.slice().filter(function (it) {
            return evt.target.value === filtersDefaults["housing-guests"] ? true : evt.target.value === it.offer.guests.toString();
        }).map(value => value);
        window.AppendOffers(filterGuests);
    };

    housingType.addEventListener("change", FilterByType);
    housingPrice.addEventListener("change", FilterByPrice);
    housingRooms.addEventListener("change", FilterByRooms);
    housingGuests.addEventListener("change", FilterByGuests);
})();
