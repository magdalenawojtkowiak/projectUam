/*
 @ngInject
 */
module.exports = function ($resource) {
    this.getOrder = $resource('/order/:id', {id: '@id'})
};
