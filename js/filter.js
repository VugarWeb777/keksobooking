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
    var FilterType = function (evt) {
        window.filteredType = offers.slice().filter(function (it) {
            switch (evt.target.value) {
                case it.offer.type :
                    return it.offer.type;
                case filtersDefaults["housing-type"] :
                    return it.offer.type;
            }
        }).map(function (value) {
            return value;
        });
        window.AppendOffers(filteredType);
        priceVal = true;
        return filteredType;
    };

    //Фильтр по цене жилья
    var FilterPrice = function (evt) {
        var middlePrice = 10000;
        var maxPrice = 50000;

        //Фильтр жилья с ценой
        if (priceVal === true) {
            var filteredPriceWithType = window.filteredType.slice().filter(function (it) {
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
            window.AppendOffers(filteredPriceWithType);
            return filteredPriceWithType;
        }
        //Фильтр по цене без жилья
        else {
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
            return filterPrice;
        }
    };


    housingType.addEventListener("change", FilterType);
    housingPrice.addEventListener("change", FilterPrice);
})();
