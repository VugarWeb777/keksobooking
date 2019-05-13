"use strict";

(function () {
    var form = document.forms['notice__form'];
    var map__filters = document.querySelector(".map__filters");
    var buttonMapPin = document.querySelector(".map__pin--main");


//Активация Формы
    window.Form = function () {
        var address = document.querySelector("#address");
        var formActivated = false;

        function FormDisabled(boolean) {
            var Fieldsets = document.querySelector(".notice__form ").querySelectorAll("fieldset");

            for (let i = 0; i < Fieldsets.length; i++) {
                var disabledFieldset = Fieldsets[i].disabled = boolean;
            }
            return disabledFieldset;
        }

        function FormActivate() {
            form.classList.remove("notice__form--disabled");
            map__filters.style.opacity = "1";
            FormDisabled(false);
            formActivated = true;
            window.backend.load(window.GetOffers, errorHandler);
            console.log("form activate");
        }

        function SetFocusOnAddress() {
            address.focus();
            address.value = window.startCoords.x + "," + window.startCoords.y;
        }

        function RemoveFormActivated() {
            if (formActivated === true) {
                buttonMapPin.removeEventListener("click", FormActivate);
            }
        }

        //Блокировка формы при загрузке страницы
        window.addEventListener("load", function () {
            FormDisabled(true);
        });

        //Обработчики кнопки MapPin
        buttonMapPin.addEventListener("click", FormActivate);
        buttonMapPin.addEventListener("mouseup", SetFocusOnAddress);
        buttonMapPin.addEventListener("click", RemoveFormActivated);
    };

    window.Form();


//Изменение формы
    window.ChangeForm = function () {
        var selectType = form.querySelector("[name='type']");
        var selectTimein = form["timein"];
        var selectTimeout = form["timeout"];
        var selectRoom = form["rooms"];
        var selectCapacity = form["capacity"];

        //изменение цены и типа жилья
        function typeChangeHandler(evt) {
            var price = document.getElementById("price");
            price.placeholder = offerTypes[evt.target.value].price;
        }

        //изменение времени заезда и выезда
        function timeChangeHandler() {
            switch (this) {
                case selectTimein :
                    selectTimeout.value = this.value;
                    break;
                case selectTimeout :
                    selectTimein.value = this.value;
                    break;
            }
        }

        //изменение кол-ва комнат для кол-ва гостей
        function roomsChangeHandler() {
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
        }

        //Обработчики селектов
        selectRoom.addEventListener("change", roomsChangeHandler);
        selectType.addEventListener("change", typeChangeHandler);
        selectTimein.addEventListener("change", timeChangeHandler);
        selectTimeout.addEventListener("change", timeChangeHandler);
    };

    window.ChangeForm();


//Отправка формы на сервер
    form.addEventListener("submit", function (evt) {
        window.backend.save(new FormData(form), SuccessSend, errorHandler);
        evt.preventDefault();
    });

    function errorHandler(errorMessage) {
        var node = document.createElement("div");
        node.classList.add("error");

        node.textContent = errorMessage;
        document.body.insertAdjacentElement("afterbegin", node);
        setTimeout(function () {
            document.body.removeChild(node);
        }, 5000);
    }

    function SuccessSend() {
        var node = document.createElement("div");
        node.classList.add("success");

        node.textContent = "Форма успешно отправлена!";
        document.body.insertAdjacentElement("afterbegin", node);
        setTimeout(function () {
            document.body.removeChild(node);
        }, 3000);
    }
})();
