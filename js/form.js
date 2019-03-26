"use strict";

(function () {
    var form = document.querySelector(".notice__form");
    var map = document.querySelector(".map");
    var buttonMapPin = document.querySelector(".map__pin--main");
    var address = document.querySelector("#address");



    function FormDisabled(boolean) {
        var Fieldsets = document.querySelector(".notice__form ").querySelectorAll("fieldset");

        for (let i = 0; i < Fieldsets.length; i++) {
            var disabledFieldset = Fieldsets[i].disabled = boolean;
        }
        return disabledFieldset;
    }

    FormDisabled(true);

    function FormActivate() {
        form.classList.remove("notice__form--disabled");
        FormDisabled(false);
        AppendPins();
        AppendOffers();
        console.log("FormActivate ()");
    }

    function SetFocusOnAddress(){
        address.focus();
        address.value = window.startCoords.x + "," + window.startCoords.y;
    }

    buttonMapPin.addEventListener("mouseup",FormActivate);



    buttonMapPin.addEventListener("mouseup",function () {
        SetFocusOnAddress();
    });


    var selectType = document.getElementById("type");
    var price = document.getElementById("price");
    selectType.addEventListener("change", function () {
        for (var i = 0; i < selectType.options.length; i++) {
            var option = selectType.options[i];
            if (option.value === "bungalo" && option.selected) {
                price.setAttribute("min", "0");
                price.placeholder = "0";
            }
            if (option.value === "flat" && option.selected) {
                price.setAttribute("min", "1000");
                price.placeholder = "1000";
            }
            if (option.value === "palace" && option.selected) {
                price.setAttribute("min", "10000");
                price.placeholder = "10000";
            }
            if (option.value === "house" && option.selected) {
                price.setAttribute("min", "5000");
                price.placeholder = "5000";
            }
        }
    });
})();