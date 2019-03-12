"use strict";

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
}

function SetFocusOnAddress(){
    address.focus();
}

buttonMapPin.addEventListener("mouseup",FormActivate);



buttonMapPin.addEventListener("mouseup",function (evt) {
    SetFocusOnAddress();
    address.value = evt.pageX + "," + evt.pageY;
});



