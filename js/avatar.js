"use strict";
/* eslint-disable no-console */
"use strict";

(function () {
    var fileChooser = document.querySelector("input#avatar");
    var preview = document.querySelector(".notice__preview img");
    var FileTypes = ["gif","jpeg","jpg","png"];

    fileChooser.addEventListener("change",function () {
        var file = fileChooser.files[0];
        var fileName = file.name.toLowerCase();

        var matches = FileTypes.some(function (it) {
            return fileName.endsWith(it);
        });

        if (matches) {
            var reader = new FileReader();
            reader.addEventListener("load",function () {
                preview.src = reader.result;
            });
            reader.readAsDataURL(file);
        }
    });
})();