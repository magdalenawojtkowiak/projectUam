/*
 @ngInject
 */
module.exports = function (menu, ingredients, extras, $state, $stateParams) {
    this.ingredients = ingredients;
    this.menu = menu;
    this.extras = extras;
    angular.forEach(this.menu, function(pizza, pizzaKey){
      angular.forEach(pizza.ingredients, function(ingredient, ingredientKey){
        var evens = _.filter(this.ingredients, function(ingr){ return ingr.id === ingredient; });
        var obj = evens[0];
        this.menu[pizzaKey].ingredients[ingredientKey] = obj;
      }.bind(this))
    }.bind(this));

    this.basket = [];
    this.extrasBasket = [];
    if ($stateParams.basket !== null) {
        this.basket = $stateParams.basket;
        this.extrasBasket = $stateParams.extrasBasket;
        this.totalPrice = $stateParams.totalPrice;
    }
    this.buy = function (arr, extras) {
        $state.go('root.order', {order: arr, extras: extras, totalPrice: this.totalPrice, basket: this.basket, extrasBasket: this.extrasBasket})
    };
    this.order = function () {
        var arr = [];
        var extras = [];
        angular.forEach(this.basket, function (value) {
            arr.push({id: value.pizza.id, quantity: value.quantity, price: value.pizza.price, name: value.pizza.name})
        }.bind(this));
        angular.forEach(this.extrasBasket, function (value) {
            extras.push({id: value.extra.id, quantity: value.quantity, price: value.extra.price, name: value.extra.label})
        }.bind(this));
        this.buy(arr, extras)
    };
    this.buyDirectly = function (pizza) {
        var arr = [{id: pizza.id, quantity: 1, price: pizza.price, name: pizza.name}];
        var extras = [];
        this.addToBasket(pizza.id)
        this.buy(arr, extras)
    };
    this.checkTotalPrice = function () {
        this.totalPrice = 0;
        angular.forEach(this.basket, function (basketValue) {
            this.totalPrice += basketValue.quantity * basketValue.pizza.price;
        }.bind(this));
        angular.forEach(this.extrasBasket, function (basketValue) {
            this.totalPrice += basketValue.quantity * basketValue.extra.price;
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

    this.addToExtrasBasket = function (id) {
        angular.forEach(this.extras, function (value) {
            if (value.id === id) {
                var existInBasket = false;
                angular.forEach(this.extrasBasket, function (basketValue, basketKey) {
                    if (value === basketValue.extra) {
                        existInBasket = true;
                        this.extrasBasket[basketKey].quantity += 1;
                    }
                }.bind(this));
                if (!existInBasket) {
                    this.extrasBasket.push({extra: value, quantity: 1})
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
