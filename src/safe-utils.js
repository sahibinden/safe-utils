/*
 * safe-utils container module
 *
 * You can inject "safe-utils" module to inject all safe-utils directives and utilities
 *
 * @example
 *
 * angular.module('your-app', ['safe-utils']);
 *
 * Or you can inject specific module(s):
 *
 * angular.module('your-app', ['sahibinden.countdown']);
 */
angular.module('safe-utils', ['sahibinden.clickIf', 'sahibinden.countdown', 'sahibinden.pageTitle']);
