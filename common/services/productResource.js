/**
 * Created by z.gulchak on 8/18/2015.
 */
(function () {
    "use strict";

    angular
        .module("common.services")
        .factory("productResource",
                ["$resource",
                 productResource]);

    function productResource($resource) {
        return $resource("/api/products/:productId");
    }

}());
