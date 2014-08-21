/**
 * @ngdoc directive
 * @name safe-utils.directive:countdown
 *
 * @description
 *
 * Counts down betweem given dates and gives ability to result by a template.
 *
 * @example
 <example>
     <file name="index.html">
        <div countdown from="10" to-date="321312312321" from-date="321321312312312" on-complete="alert('Time is up!')">
            <div ng-show="countdown.end">Time is up.</div>
            <div ng-hide="countdown.end">{{ countdown.date | date:'mm:ss' }}</div>
        </div>
     </file>
 </example>
 */

angular.module('sahibinden.countdown', [])
    .directive('countdown', ['$timeout', function ($timeout) {
        'use strict';

        return {
            restrict: 'A',
            scope: true,
            link: function ($scope, $element, $attrs) {
                var toDateValue = $attrs.toDate,
                    toDate = toDateValue ? new Date(toDateValue) : new Date(),

                    fromDateValue = $attrs.fromDate,
                    fromDate = fromDateValue ? new Date(fromDateValue) : new Date(),

                    timeValue = $attrs.from,
                    time = timeValue || parseInt((toDate.getTime() - fromDate.getTime()) / 1000),
                    timerId,
                    timerFn = function () {
                        time--;

                        if (time <= 0) {
                            time = 0;
                            $scope.$parent.$eval($attrs.onComplete);
                        }

                        var diff = new Date(time * 1000);

                        $scope.countdown = {
                            end: time === 0,
                            date: diff,
                            seconds: diff.getSeconds(),
                            minutes: diff.getUTCMinutes(),
                            hours: diff.getUTCHours(),
                            days: diff.getUTCDate() - 1,
                            months: diff.getUTCMonth(),
                            years: diff.getUTCFullYear() - 1970
                        };

                        if (time > 0) {
                            timerId = $timeout(timerFn, 1000);
                        }
                    };

                timerFn();

                // timeout object must be cancel on $scope destroy
                $scope.$on('$destroy', function () {
                    $timeout.cancel(timerId);
                });
            }
        }];
    }]);
