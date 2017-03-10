/**
 * Created by purushotham on 7/3/17.
 */
(function(){
    'use strict';
    angular.module('MSC.user')
        .controller("profileCtrl",profileCtrl);
    profileCtrl.$inject=['$localStorage','userService','$uibModal','$state','NgTableParams','$scope']
    function profileCtrl($localStorage,userService,uibModal,$state,NgTableParams,$scope){
        console.log("in use profile");
        var vm=this;
        vm.tableExists=false;
        vm.id=$localStorage.userDetails.id;
         vm.profile={}
        userService.getProfile(vm.id).then(
            function success(response) {
                console.log(response);
                vm.profile = response.data.profile;
                console.log(vm.profile);
                vm.tableExists=true;
                loadTable();
                console.log("**************************success");
            },
            function failed(error) {
                console.log("invalid userid or password");
                console.log("**************************Failed");
            }
        );

        function loadTable() {
            vm.tableParams = new NgTableParams({}, {
                getData: function (params) {
                    // ajax request to api
                    return userService.getAddress(vm.id).then(function (response) {
                        //params.total(data.inlineCount); // recal. page nav controls
                        console.log("********************* in user service*******************************8")
                        console.log(response.data);
                        var data=response.data;
                        return data;
                    });
                }
            });
            $scope.$watch("data", function () {
                vm.tableParams.reload();
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
                //$state.go('profile');
                //console.log(vm.fullName)
                loadTable();

            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        console.log("after user service");

    }
}());