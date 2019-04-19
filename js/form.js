"use strict";

(function () {
    var form = document.forms['notice__form'];
    var buttonMapPin = document.querySelector(".map__pin--main");
    var address = document.querySelector("#address");


    //Блокировка формы при загрузке страницы
    function FormDisabled(boolean) {
        var Fieldsets = document.querySelector(".notice__form ").querySelectorAll("fieldset");

        for (let i = 0; i < Fieldsets.length; i++) {
            var disabledFieldset = Fieldsets[i].disabled = boolean;
        }
        return disabledFieldset;
    }

    FormDisabled(true);


    //Активация формы при использование метки
    var formActivated = false;

    function FormActivate() {
        form.classList.remove("notice__form--disabled");
        FormDisabled(false);
        formActivated = true;
        window.backend.load(AppendOffers);
        console.log("FormActivate ()");
    }

    //Установка фокуса на адрес
    function SetFocusOnAddress() {
        address.focus();
        address.value = window.startCoords.x + "," + window.startCoords.y;
    }

    //удаление обработчика активации формы, когда форма уже в активном состояние.
    function RemoveFormActivated() {
        if (formActivated === true) {
            buttonMapPin.removeEventListener("click", FormActivate);
        }
    }


    //изменение цены и типа жилья
    var selectType = form.querySelector("[name='type']");

    function typeChangeHandler() {
        var price = document.getElementById("price");
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
    }


    //изменение времени заезда и выезда
    var selectTimein = form.querySelector("[name='timein']");
    var selectTimeout = form.querySelector("[name='timeout']");

    function timeChangeHandler() {
        switch (this) {
            case selectTimein :
                selectTimeout.value = this.value;
                break;
            case selectTimeout :
                selectTimein.value = this.value;
                break;
        }
        /* if (this === selectTimein){
             selectTimeout.value = this.value;
         } else if (this === selectTimeout){
             selectTimein.value = this.value;
         }*/
    }


    //изменение кол-ва комнат для кол-ва гостей

    var room = form.querySelector("[name='rooms']");
    var capacity = form.querySelector("[name='capacity']");

    function roomsChangeHandler (){
        if (room.value == 1){
            var currentCapaciy = capacity.querySelectorAll(":not([value='1'])");
            console.log(currentCapaciy);
            for (let i = 0; i < currentCapaciy.length; i++) {
                currentCapaciy[i].setAttribute("hidden","true");
            }
        }
    }


    room.addEventListener("change",roomsChangeHandler);

    selectType.addEventListener("change", typeChangeHandler);
    selectTimein.addEventListener("change", timeChangeHandler);
    selectTimeout.addEventListener("change", timeChangeHandler);


    buttonMapPin.addEventListener("click", FormActivate);
    buttonMapPin.addEventListener("mouseup", SetFocusOnAddress);
    buttonMapPin.addEventListener("click", RemoveFormActivated);


    //Отправка формы на сервер AJAX
    form.addEventListener("submit", function (evt) {
        window.backend.save(new FormData(form), function () {
            console.log("форма успешно отпарвлена!");
        });
        evt.preventDefault();
    });
})();

//Найти селекты времени заезда
//при выборе selectTimein.options[i] менять значение selectTimeout.options[i].va