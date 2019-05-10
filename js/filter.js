"use strict";
(function () {
    var formFilter = document.forms["filter-form"];
    var housingType = formFilter["housing-type"];
    var housingPrice = formFilter["housing-price"];
    var housingRooms = formFilter["housing-rooms"];
    var housingGuests = formFilter["housing-guests"];
    var housingFeatures = formFilter.querySelector("#housing-features");

    var offers = [];


    //Сохранение данных
    window.GetOffers = function (data) {
        offers = data;
        window.AppendOffers(data);
    };


    //Фильтрация
    var Filtering = function () {
        var middlePrice = 10000;
        var maxPrice = 50000;

        var filterData = offers.slice()
            .filter(function (item) {
                if (housingType.value === "any" || housingType.value === item.offer.type.toString()) {
                    return item.offer.type;
                }
            })
            .filter(function (item) {
                switch (housingPrice.value) {
                    case "low" :
                        return item.offer.price <= middlePrice;
                    case "middle" :
                        return item.offer.price >= middlePrice && item.offer.price <= maxPrice;
                    case "high" :
                        return item.offer.price >= maxPrice;
                    case "any" :
                        return item.offer.price;
                }
            })
            .filter(function (item) {
                if (housingRooms.value) {
                    return housingRooms.value === "any" ? true : housingRooms.value === item.offer.rooms.toString();
                }
            })
            .filter(function (item) {
                if (housingGuests.value) {
                    return housingGuests.value === "any" ? true : housingGuests.value === item.offer.guests.toString();
                }
            })
            .filter(function (item) {
                var checkedFeaturesItems = housingFeatures.querySelectorAll('input:checked');
                return Array.from(checkedFeaturesItems).every(function (element) {
                    return item.offer.features.includes(element.value);
                });
            }).map(value => value);
        window.debounce(window.AppendOffers(filterData));
    };

    formFilter.addEventListener("change", Filtering);
})();
