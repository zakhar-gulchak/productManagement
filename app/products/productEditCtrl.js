/**
 * Created by z.gulchak on 8/19/2015.
 */
(function () {
    "use strict";

    angular
        .module("productManagement")
        .controller("ProductEditCtrl",
                    ["product",
                     "$state",
                     "productService",
                     ProductEditCtrl]);


    function ProductEditCtrl(product, $state, productService) {
        var vm = this;

        vm.product = product;
        vm.priceOption = 'percent';

        vm.marginPercent = function () {
            return productService.calculateMarginPercent(vm.product.price,
                                                         vm.product.cost);
        };

        /* Calculate the price based on a markup */
        vm.CalculatePrice = function () {
            if (vm.priceOption == 'percent') {
                vm.product.price = productService.calculatePriceFromPercent(vm.product.cost, vm.markupPercent);
            } else {
                vm.product.price = productService.calculatePriceFromAmount(vm.product.cost, vm.markupAmount);
            }
        };

        if (vm.product && vm.product.productId) {
            vm.title = "Edit: " + vm.product.productName;
        }
        else {
            vm.title = "New Product";
        }

        vm.open = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            vm.opened = !vm.opened;
        };

        vm.submit = function (isValid) {
            if (isValid) {
                vm.product.$save(function (data) {
                    toastr.success("Save Successful");
                });
            } else {
                toastr.error("Invalid form values.");
            }
        };

        vm.cancel = function () {
            $state.go('productList');
        };

        vm.addTags = function (tags) {
            if (tags) {
                var array = tags.split(',');
                vm.product.tags = vm.product.tags ? vm.product.tags.concat(array) : array;
                vm.newTags = "";
            } else {
                alert("Please enter one or more tags separated by commas");
            }
        };

        vm.removeTag = function (idx) {
            vm.product.tags.splice(idx, 1);
        };
    }
}());
