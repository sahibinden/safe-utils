angular.module('sahibinden.iframe', [])
    .directive('iframe', function () {
        'use strict';

        return {
            restrict: 'A',
            replace: true,
            transclude: true,
            scope: true,
            template: '<iframe frameborder="0"></iframe>',
            controller: function ($scope, $element, $attrs, $transclude) {
                $transclude(function () {

                    $element.attr('src', $attrs.iframe).on('load', function () {
                        $element
                            // Yuksekligi azaltmazsak pencere iceriginin yuksekligini alamiyoruz
                            .css('height', 0)
                            // iframe iceriginin yuksekligini ogrenip iframe yuksekligi olarak set ediyoruz
                            .css('height', $element[0].contentDocument.documentElement.scrollHeight + 'px');
                    });
                });
            }
        };
    });
