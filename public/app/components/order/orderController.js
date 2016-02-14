/*
 @ngInject
 */
module.exports = function ($stateParams, $state, orderService) {
    this.basket= $stateParams.basket;
    this.extrasBasket = $stateParams.extrasBasket;
    this.totalPrice = $stateParams.totalPrice;

    this.phone = '';
    this.street = '';
    this.remarks = '';
    this.error = false;
    this.back = function () {
        $state.go('root.main', {
            order: $stateParams.order,
            extras: $stateParams.extras,
            totalPrice: $stateParams.totalPrice,
            basket: $stateParams.basket,
            extrasBasket: $stateParams.extrasBasket
        })
    };
    this.order = function() {
        var obj = {
          order: $stateParams.order,
          extras: $stateParams.extras,
          orderInfo: {
            phone: this.phone,
            street: this.street,
            remarks: this.remarks
          }
        }
        orderService.order.save(obj, function (data) {
            $state.go('root.status', {statusId: data.id});
        }, function(){
            this.error = true;
        }.bind(this));
    }.bind(this)
};
