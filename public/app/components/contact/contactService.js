/*
 @ngInject
 */
module.exports = function ($resource) {
    this.contact = $resource('/contact');
};
