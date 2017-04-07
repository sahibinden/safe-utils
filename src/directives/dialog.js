/**
 * @ngdoc directive
 * @name safe-utils.directive:dialog
 *
 * @description
 *
 * Dialog directive
 *
 * @example
 <example>
     <file name="index.html">
        <p><a ng-click="confirmDialogShow=true; something=selectedRow">Remove something</a></p>

        <dialog visible="confirmDialogShow" data-title="Remove something" extra-class="remove-something-dialog">
            <p>Do you really want to delete {{ something.name }}?</p>
            <p class="dialog-buttons">
                <a class="btn btn-alternative btn-form" dialog-closer>No</a>
                <a class="btn btn-form" ng-click="removeSomething(something);" dialog-closer>Yes</a>
            </p>
        </dialog>
     </file>
 </example>
 */

(function (angular) {
    'use strict';

    angular.module('sahibinden.dialog', [])
        .directive('dialog', function () {

            return {
                restrict: 'EA',
                replace: true,
                transclude: true,
                scope: {
                    title: '@',
                    extraClass: '@',
                    visible: '=',
                    onClose: '&',
                    nonClosable: '='
                },
                template: '<div ng-class="{hidden: !visible}">' +
                    '<div class="overlay" dialog-closer></div>' +
                    '<div class="dialog-content {{ extraClass }}" ng-class="{dialogEffect: visible}">' +
                        '<div>' +
                            '<a ng-hide="nonClosable" class="dialog-close" dialog-closer>close</a>' +
                            '<h3 ng-show="title" ng-bind-html="title | maketrusted"></h3>' +
                            '<section ng-transclude></section>' +
                        '</div>' +
                    '</div>' +
                '</div>',

                controller: 'DialogCtrl as dialog'
            };
        })
        .directive('dialogCloser', function () {
            return {
                restrict: 'A',
                require: '^dialog',
                link: function (scope, iElement, iAttrs, dialog) {
                    angular.element(iElement).on('click', function () {
                        dialog.closeDialog();
                    });
                }
            };
        })
        .controller('DialogCtrl', ['$scope', '$document', function ($scope, $document) {
            var escEvent = function (event) {
                    if (event.which == 27 && !$scope.nonClosable) { // ESC key
                        $scope.visible = false;
                        $scope.onClose();
                        $scope.$digest();
                    }
                };

            this.closeDialog = function () {
                if (!$scope.nonClosable) {
                    $scope.visible = false;
                    $scope.onClose();
                }
            };

            $scope.$watch('visible', function (visible) {
                if (visible) {
                    $document.on('keyup', escEvent);
                } else {
                    $document.off('keyup', escEvent);
                }
            });
        }]);

})(angular);
