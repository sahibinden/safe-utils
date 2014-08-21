/**
 * @ngdoc directive
 * @name safe-utils.directive:page-title
 *
 * @element ANY
 * @param {string} pageTitle Given value will be set as page title
 *
 * @description
 *
 * If `page-title` attribute has a value, this will be set as page title(`title` tag content)
 * If `page-title` attribute doesn't have a value, then the element content will be set as page title
 *
 * @example
 <example>
     <file name="index.html">
        <h1 page-title>That will be page title</h1>

        or

        <p page-title="You can set page title like this">No matter what is here</p>
     </file>
 </example>
 *
 */

angular.module('sahibinden.pageTitle', [])
    .directive('pageTitle', function () {
        'use strict';

        return function ($scope, $element, $attrs) {
            $attrs.$observe('pageTitle', function () {
                document.getElementsByTagName('title')[0].innerHTML = $attrs.pageTitle || element.html();
            });
        };
    });
