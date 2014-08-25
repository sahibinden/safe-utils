/**
 * @ngdoc directive
 * @name safe.directive:scroll-bottom
 *
 * @element ANY
 * @param {string} scrollBottom Verilen obje değişiklikleri takip edilir
 *
 * @description
 *
 * `scroll-bottom` attribute'una verilen değer değiştiğinde, bu attribute'un
 * verildiği elementin scroll değeri alta doğru kaydırılır. Yüksekliği sabit
 * bir elemente bir içerik eklendiğinde scroll'un daima altta kalmasını
 * sağlamak için kullanılır.
 *
 * @example
 <example>
    <file name="script.js">
        function Ctrl($scope) {
            $scope.messages = [
                'Murat: Naber?',
                'Fatih: Iyidir, senden naber?'
            ];

            $scope.addMessage = function () {
                $scope.messages.push($scope.message);
            };
        }
    </file>

    <file name="index.html">
        <div ng-controller="Ctrl">
            <ul scroll-bottom="messages">
                <li ng-repeat="message in messages"></li>
            </ul>

            <form ng-submit="addMessage()">
                <input type="text" ng-model="message" required>
                <button type="submit">Cevapla</button>
            </form>
        </div>
    </file>

    <file name="style.css">
        ul {
            max-height: 50px;
            overflow: auto;
        }
    </file>
 </example>
 *
 */
angular.module('sahibinden.scroll', [])
    .directive('scrollBottom', ['$timeout', function ($timeout) {
        'use strict';

        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                attrs.$observe('scrollBottom', function () {
                    var domEl = element[0];

                    // DOM rendering icin 200ms sure veriyoruz
                    $timeout(function () {
                        domEl.scrollTop = 10000;
                    }, 200);
                });
            }
        };
    }])
    .directive('scrollTop', ['$timeout', function ($timeout) {
        'use strict';

        return {
            restrict: 'A',
            link: function (scope, element, attrs) {

                attrs.$observe('scrollTop', function () {
                    if (attrs.innerScroll) {
                        var domEl = element[0];

                        // DOM rendering icin 200ms sure veriyoruz
                        $timeout(function () {
                            domEl.scrollTop = 0;
                        }, 200);
                    } else {
                        window.scrollTo(0, 0);
                    }

                });
            }
        };
    }])
    .directive('scrollLeft', ['$timeout', function ($timeout) {
        'use strict';

        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                attrs.$observe('scrollLeft', function () {
                    var domEl = element[0];

                    // DOM rendering icin 300ms sure veriyoruz
                    $timeout(function () {
                        domEl.scrollLeft = 10000;
                    }, 700);
                });
            }
        };
    }])
    .directive('scrollError', ['$timeout', function () { // Formlarda hataya scroll etmek için
        'use strict';

        return {
            restrict: 'A',
            link: function (scope, elem) {
                // form elemanın submitine bağla
                elem.on('submit', function () {
                    // ilk hatalı elelmanı bul
                    var firstInvalid = angular.element(
                        elem[0].querySelector('.form-error:not(.ng-hide)'))[0];

                    // Bulduğun ilk eleman odaklan
                    if (firstInvalid) {
                        firstInvalid.focus();
                    }
                });

            }
        };
    }])
    .directive('sticky', ['$timeout', function () { // FIX ME: bunu daha progrmatik yapalım
        'use strict';

        return {
            restrict: 'A',
            link: function (scope, element, attrs) {

                // görünür alan kontrolü
                function inViewport(el) {

                    var rect,
                        html;

                    if (!el || 1 !== el.nodeType) {
                        return false;
                    }

                    html = document.documentElement;
                    rect = el.getBoundingClientRect();

                    return (!!rect && rect.bottom >= 0 && rect.right >= 0 && rect.top <= html.clientHeight && rect.left <= html.clientWidth);
                }

                attrs.$observe('sticky', function (value) {

                    element.removeClass('sticky-static-position');

                    var scroll = function () {
                            var footer = document.getElementsByTagName('footer')[0];

                            if (inViewport(footer)) {
                                element.addClass('sticky-static-position');
                            } else {
                                element.removeClass('sticky-static-position');
                            }
                        };

                    scroll();

                    if (value) {
                        window.onscroll = scroll;
                    }
                });
            }
        };
    }]);
