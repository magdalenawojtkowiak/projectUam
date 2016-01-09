/*
 @ngInject
 */
module.exports = function ($resource) {
    this.order = $resource('/order');
};
