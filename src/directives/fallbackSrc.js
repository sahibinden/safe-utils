/**
 * @ngdoc directive
 * @name safe-utils.directive:fallbacked-src
 *
 * @element img
 *
 * @description
 *
 * Verilen resim kaynağı boşsa veya resim yüklenemediyse
 * img etiketini silip yerine `noimage` class'lı boş bir
 * div ekleyen directive
 *
 * @example
 <example>
     <file name="index.html">
        <img fallbacked-src="/resim-yuklenemedi.jpg">
     </file>
 </example>
 */
angular.module('sahibinden.image', [])
    .directive('fallbackedSrc', function () {
        'use strict';

        return {
            restrict: 'A',
            require: '?img',
            link: function (scope, element, attrs) {
                var placeholder = angular.element(document.createElement('span')).addClass('noImage ng-hide');
                element.after(placeholder);

                element.bind('error', function () {
                    element.addClass('ng-hide');
                    placeholder.removeClass('ng-hide');
                });

                attrs.$observe('fallbackedSrc', function (value) {
                    if (value !== '') {
                        element.attr('src', value).removeClass('ng-hide');
                        placeholder.addClass('ng-hide');
                    } else {
                        element.addClass('ng-hide');
                        placeholder.removeClass('ng-hide');
                    }
                });
            }
        };
    });
