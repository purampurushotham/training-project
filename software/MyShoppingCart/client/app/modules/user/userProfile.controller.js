/**
 * Created by purushotham on 7/3/17.
 */
(function(){
    'use strict';
    angular.module('MSC.user')
        .controller("profileCtrl",profileCtrl);
    profileCtrl.$inject=['$localStorage','userService','$uibModal','NgTableParams']
    function profileCtrl($localStorage,userService,uibModal,NgTableParams){
        var vm=this;
        vm.tableExists=false;
        vm.id=$localStorage.userDetails.id;
         vm.profile={}
        userService.getProfile(vm.id).then(
            function success(response) {
                vm.profile = response.data.profile;
                vm.tableExists=true;
                loadTable();
                vm.tableParams.reload();
            },
            function failed(error) {
                /*console.log(error);
                console.log("**************************Failed");*/
            }
        );

        function loadTable() {
            vm.tableParams = new NgTableParams({}, {
                getData: function (params) {
                    // ajax request to api
                    return userService.getAddress(vm.id).then(function (response) {
                        //params.total(data.inlineCount); // recal. page nav controls
                        var data=response.data;
                        return data;
                    });
                }
            });



        }

        vm.addRows = function () {
            var modalInstance = uibModal.open({
                animation: vm.animationsEnabled,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'app/partials/address.html',
                controller: 'tableCtrl',
                controllerAs: 'tc',
                resolve: {
                    id: function (){
                        return vm.id;
                    }
                }
            });
            modalInstance.result.then(function (id) {
                vm.id=id;
                console.log(vm.id)
                loadTable();

            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

    }
}());