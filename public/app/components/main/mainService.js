/*
 @ngInject
 */
module.exports = function ($resource) {
    this.menu = $resource('/menu');
    this.ingredients = $resource('/ingredients');
    this.extras = $resource('/extras');
};
