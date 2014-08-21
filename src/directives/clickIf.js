/**
 * @ngdoc directive
 * @name safe-utils.directive:countdown
 *
 * @description
 *
 * click-if directive, triggers click event of given element when given condition parses to true
 *
 * @example
 <example>
     <file name="index.html">
        <form name="testform">
            <p>You will be redirected automatically to written url, when you typed a valid url</p>
            <input type="url" ng-model="urltogo" required>
            <a ng-href="{{ urltogo }}" click-if="{{ testform.urltogo.$valid }}">Go</a>
        </form>
     </file>
 </example>
 */

angular.module('sahibinden.clickIf', [])
    .directive('clickIf', ['$timeout', function ($timeout) {
        'use strict';

        return {
            restrict: 'A',
            controller: function ($scope, $element, $attrs) {
                $attrs.$observe('clickIf', function (condition) {
                    if (condition === 'true' || condition === true) {
                        $timeout(function () {
                            $element.triggerHandler('click');
                        }, 0);
                    }
                });
            }
        };
    }]);
