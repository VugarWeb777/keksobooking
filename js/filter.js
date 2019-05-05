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

    window.GetOffers = function (data) {
        offers = data;
        window.AppendOffers(data);
    };


    var FilterType = function (evt) {
        priceVal = true;

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
        return filteredType;
    };

    var FilterPrice = function (evt) {
        var middlePrice = 10000;
        var maxPrice = 50000;
        priceVal = false;

        if (priceVal === false) {
            var filterPrice = offers.slice().filter(function (it) {
                switch (evt.target.value) {
                    case "middle" :
                        return it.offer.price >= middlePrice && it.offer.price <= maxPrice;
                    case "low" :
                        return it.offer.price <= middlePrice;
                    case "high" :
                        return it.offer.price >= maxPrice;
                }
            }).map(function (value) {
                return value;
            });
            window.AppendOffers(filterPrice);
        }

        if (priceVal === true) {
            var filteredPriceWithType = window.filteredType.slice().filter(function (it) {
                switch (evt.target.value) {
                    case "middle" :
                        return it.offer.price >= middlePrice && it.offer.price <= maxPrice;
                    case "low" :
                        return it.offer.price <= middlePrice;
                    case "high" :
                        return it.offer.price >= maxPrice;
                }
            }).map(function (value) {
                return value;
            });
            window.AppendOffers(filteredPriceWithType);
        }
    };


    housingType.addEventListener("change", FilterType);
    housingPrice.addEventListener("change", FilterPrice);
})();
