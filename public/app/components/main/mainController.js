/*
 @ngInject
 */
module.exports = function (menu, $state, $stateParams) {

    this.menu = menu;
    this.basket = [];
    if ($stateParams.basket !== null) {
        this.basket = $stateParams.basket;
        this.totalPrice = $stateParams.totalPrice;
    }
    this.buy = function (arr) {
        $state.go('root.order', {order: arr, totalPrice: this.totalPrice, basket: this.basket})
    };
    this.order = function () {
        var arr = [];
        angular.forEach(this.basket, function (value) {
            arr.push({id: value.pizza.id, quantity: value.quantity, price: value.pizza.price, name: value.pizza.name})
        }.bind(this));
        this.buy(arr)
    };
    this.buyDirectly = function (pizza) {
        var arr = [{id: pizza.id, quantity: 1, price: pizza.price, name: pizza.name}];
        this.buy(arr)
    };
    this.checkTotalPrice = function () {
        this.totalPrice = 0;
        angular.forEach(this.basket, function (basketValue) {
            this.totalPrice += basketValue.quantity * basketValue.pizza.price;
        }.bind(this));
        this.totalPrice = this.totalPrice.toFixed(2)
    };
    this.addToBasket = function (id) {
        angular.forEach(this.menu, function (value) {
            if (value.id === id) {
                var existInBasket = false;
                angular.forEach(this.basket, function (basketValue, basketKey) {
                    if (value === basketValue.pizza) {
                        existInBasket = true;
                        this.basket[basketKey].quantity += 1;
                    }
                }.bind(this));
                if (!existInBasket) {
                    this.basket.push({pizza: value, quantity: 1})
                }
            }
        }.bind(this));
        this.checkTotalPrice();
    };

    this.increase = function (id) {
        var key = this.findInBasket(id);
        this.basket[key].quantity += 1;
        this.checkTotalPrice();
    };

    this.decrease = function (id) {
        var key = this.findInBasket(id);
        if (this.basket[key].quantity === 1) {
            this.basket.splice(key, 1)
        } else {
            this.basket[key].quantity -= 1;
        }
        this.checkTotalPrice();
    };

    this.findInBasket = function (id) {
        var index;
        angular.forEach(this.basket, function (value, key) {
            if (value.pizza.id === id) {
                index = key
            }
        }.bind(this));
        return index;
    }
};