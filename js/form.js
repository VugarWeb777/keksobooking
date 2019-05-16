"use strict";

(function () {
    var form = document.forms['notice__form'];
    var map = document.querySelector(".map");
    var map__pins = document.querySelector(".map__pins");
    var map__filters = document.querySelector(".map__filters");
    var buttonMapPin = document.querySelector(".map__pin--main");
    var address = document.querySelector("#address");

    var formActivated = false;

//Активация Формы
    var Form = {

        FormDisabledFieldests: function (boolean) {
            var Fieldsets = document.querySelector(".notice__form ").querySelectorAll("fieldset");
            for (let i = 0; i < Fieldsets.length; i++) {
                var disabledFieldset = Fieldsets[i].disabled = boolean;
            }
        },
        FormRemove: function () {
            formActivated = false;
            form.classList.add("notice__form--disabled");
            map.classList.add("map--faded");
            map__filters.style.opacity = "0";
            document.querySelector(".map__pins").childNodes.forEach(value => value.remove());
            document.querySelectorAll(".map__card").forEach(value => value.remove());
            Form.FormDisabledFieldests(true);
        },
        FormActivate: function () {
            formActivated = true;
            form.classList.remove("notice__form--disabled");
            map.classList.remove("map--faded");
            map__filters.style.opacity = "1";
            Form.FormDisabledFieldests(false);
            window.backend.load(window.GetOffers, FormSend.errorHandler);
        },

        SetFocusOnAddress: function () {
            address.focus();
            address.value = window.startCoords.x + "," + window.startCoords.y;
        },

        RemoveFormActivated: function () {
            if (formActivated === true) {
                buttonMapPin.removeEventListener("click", Form.FormActivate);
            }
            buttonMapPin.addEventListener("click", Form.FormActivate);
        },
    };

    //Блокировка формы при загрузке страницы
    window.addEventListener("load", function () {
        Form.FormDisabledFieldests(true);
    });

    //Обработчики кнопки MapPin
    buttonMapPin.addEventListener("click", Form.FormActivate);
    buttonMapPin.addEventListener("mouseup", Form.SetFocusOnAddress);
    buttonMapPin.addEventListener("click", Form.RemoveFormActivated);


//Изменение формы
    var selectType = form.querySelector("[name='type']");
    var selectTimein = form["timein"];
    var selectTimeout = form["timeout"];
    var selectRoom = form["rooms"];
    var selectCapacity = form["capacity"];


    var FormChange = {

        typeChangeHandler: function (evt) {
            var price = document.getElementById("price");
            price.placeholder = offerTypes[evt.target.value].price;
        },
        timeChangeHandler: function () {
            switch (this) {
                case selectTimein :
                    selectTimeout.value = this.value;
                    break;
                case selectTimeout :
                    selectTimein.value = this.value;
                    break;
            }
        },
        roomsChangeHandler: function () {
            var capacityFor1Room = selectCapacity.querySelectorAll(":not([value='1'])");
            var capacityFor2Room = selectCapacity.querySelectorAll(":not([value='1']):not([value='2'])");
            var capacityFor3Room = selectCapacity.querySelectorAll(":not([value='1']):not([value='2']):not([value='3'])");
            var capacityNotForGuest = selectCapacity.querySelectorAll(":not([value='0'])");

            for (let i = 0; i < selectCapacity.options.length; i++) {
                selectCapacity.options[i].disabled = false;
            }

            if (this === selectRoom) {
                selectCapacity.value = this.value;
                switch (selectRoom.value) {
                    case "1" :
                        capacityFor1Room.forEach(value => value.disabled = true);
                        break;
                    case "2" :
                        capacityFor2Room.forEach(value => value.disabled = true);
                        break;
                    case "3" :
                        capacityFor3Room.forEach(value => value.disabled = true);
                        break;
                    default :
                        capacityNotForGuest.forEach(value => value.disabled = true);
                        selectCapacity.value = "0";
                        break;
                }
            }
        },
    };

    //Обработчики селектов
    selectRoom.addEventListener("change", FormChange.roomsChangeHandler);
    selectType.addEventListener("change", FormChange.typeChangeHandler);
    selectTimein.addEventListener("change", FormChange.timeChangeHandler);
    selectTimeout.addEventListener("change", FormChange.timeChangeHandler);


//Отправка формы на сервер
    form.addEventListener("submit", function (evt) {
        window.backend.save(new FormData(form), FormSend.SuccessSend, FormSend.errorHandler);
        evt.preventDefault();
    });

    var FormSend = {
        errorHandler: function (errorMessage) {
            var node = document.createElement("div");
            node.classList.add("error");

            node.textContent = errorMessage;
            document.body.insertAdjacentElement("afterbegin", node);
            setTimeout(function () {
                document.body.removeChild(node);
            }, 5000);
        },
        SuccessSend: function () {
            var node = document.createElement("div");
            node.classList.add("success");

            node.textContent = "Форма успешно отправлена!";
            document.body.insertAdjacentElement("afterbegin", node);
            setTimeout(function () {
                document.body.removeChild(node);
            }, 3000);
            Form.FormRemove();
            map__pins.innerHTML = "<div class='map__pinsoverlay'><h2>И снова Токио!</h2></div>"
        }
    };
})();
