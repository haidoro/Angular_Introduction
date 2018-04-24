angular.
  module('phoneList').
  component('phoneList', {
    templateUrl: 'phone-list/phone-list.template.html',
    controller: ['$http',
      function PhoneListController($http) {
        this.orderProp = 'age';

        $http.get('phones/phones.json').then((response)=>{
          this.phones = response.data;
        });
      }
    ]
  });