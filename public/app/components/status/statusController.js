/*
 @ngInject
 */
module.exports = function (order, $interval) {
    var miliseconds = Math.abs(new Date(Date.now()) - new Date(order.estimated));
    this.minutes = Math.round((miliseconds / 1000) / 60);
    this.progressPercentage = 0;
    var times = this.minutes;
    $interval(function () {
        this.minutes -= 1;
        this.progressPercentage =  (1 - (this.minutes/times)) * 100;
    }.bind(this), 60*1000, times);
};
