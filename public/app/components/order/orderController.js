/*
 @ngInject
 */
module.exports = function ($stateParams, $state, orderService) {
    this.basket= $stateParams.basket;
    this.totalPrice = $stateParams.totalPrice;
    this.phone = '';
    this.street = '';
    this.remarks = '';
    this.error = false;
    this.back = function () {
        $state.go('root.main', {
            order: $stateParams.order,
            totalPrice: $stateParams.totalPrice,
            basket: $stateParams.basket
        })
    };
    this.order = function(){

        orderService.order.save($stateParams.order, function (data) {
            $state.go('root.status', {statusId: data.id});
        }, function(){
            this.error = true;
        }.bind(this));
    }
};