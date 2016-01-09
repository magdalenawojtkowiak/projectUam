/*
 @ngInject
 */
module.exports = function ($resource) {
    this.menu = $resource('/menu');
};
