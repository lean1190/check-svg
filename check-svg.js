/* globals Promise, document, console */

// Declare the module
var checksvg = checksvg || (function () {
    'use strict';

    var truechecksvg = truechecksvg || {};

    function getFileExtension(imageSrc) {
        var extension = imageSrc.split('.');

        return extension[extension.length - 1];
    }

    function _doSupportsSvg() {
        return !document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1");
    }

    function _doReplaceSvgWithPng() {
        return new Promise(function (resolve, reject) {
            var documentImages = document.getElementsByTagName('img');

            for (var i = 0; i < documentImages.length; i++) {
                var currentImage = documentImages[i];
                var currentImageSrc = currentImage.getAttribute('src');
                if (getFileExtension(currentImageSrc) === "svg") {
                    var replacedSrc = currentImageSrc.replace('.svg', '.' + 'png');
                    currentImage.setAttribute('src', replacedSrc);
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

    return truechecksvg;

}());
