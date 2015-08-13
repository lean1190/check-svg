/* globals Promise, document, console */

// Declare the module
var checksvg = checksvg || (function () {
    "use strict";

    var truechecksvg = truechecksvg || {};

    // If the png folder path is not manually set, it takes
    // the svg current path
    truechecksvg.pngFolderPath = "";

    // Sets .png as default image extension replace
    truechecksvg.replaceImageFormat = ".png";

    function getFileExtension(imageSrc) {
        var extension = imageSrc.split(".");

        return extension[extension.length - 1];
    }

    function _doGetFileFullPath(currentImageSrc, pngFolderPath) {
        currentImageSrc = currentImageSrc.replace(".svg", truechecksvg.replaceImageFormat);
        var splitResult = currentImageSrc.split("/");
        var imageFileName = splitResult[splitResult.length - 1];

        // If an specific folder is set, make and return the full path url
        if(pngFolderPath !== "") {
            return pngFolderPath + imageFileName;
        }

        // If not set, just return the current svg path with changed extension
        return currentImageSrc;

    }

    function _doSupportsSvg() {
        return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1");
    }

    function _doReplaceSvgWithPng() {
        return new Promise(function (resolve, reject) {
            var documentImages = document.getElementsByTagName("img");
            var pngFolderPath = truechecksvg.pngFolderPath || "";

            for (var i = 0; i < documentImages.length; i++) {
                var currentImage = documentImages[i];
                var currentImageSrc = currentImage.getAttribute("src");
                if (getFileExtension(currentImageSrc) === "svg") {
                    currentImage.setAttribute("src", _doGetFileFullPath(currentImageSrc, pngFolderPath));
                }
            }
        });
    }

    function _doCheckAndReplace() {
        if (!_doSupportsSvg()) {
            return _doReplaceSvgWithPng();
        }
    }

    truechecksvg.supportsSvg = function () {
        return _doSupportsSvg();
    };

    truechecksvg.replaceSvgWithPng = function () {
        return _doReplaceSvgWithPng();
    };

    truechecksvg.checkAndReplace = function () {
        return _doCheckAndReplace();
    };

    // The full folder path from the root of the project
    truechecksvg.setPngFolderPath = function (folderPath) {
        this.pngFolderPath = folderPath;
    };

    // .jpg, .gif, .png or whatever
    truechecksvg.setReplaceImageFormat = function (imageFormat) {
        this.replaceImageFormat = imageFormat;
    };

    return truechecksvg;

}());
