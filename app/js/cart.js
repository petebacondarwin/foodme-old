angular.module('cart',[])

.value('alert', window.alert)

.factory('cart', function Cart(localStorage, customer, $rootScope, $http, alert) {
  var service = {
    add: function(item, restaurant) {
      if (!service.restaurant || !service.restaurant.id) {
        service.restaurant = {
          id: restaurant.id,
          name: restaurant.name,
          description: restaurant.description
        };
      }

      if (service.restaurant.id == restaurant.id) {
        service.items.forEach(function(cartItem) {
          if (item && cartItem.name == item.name) {
            cartItem.qty ++;
            item = null;
          }
        });
        if (item) {
          item = angular.copy(item);
          item.qty = 1;
          service.items.push(item);
        }
      } else {
        alert('Can not mix menu items from different restaurants.');
      }
    },

    remove: function(item) {
      var index = service.items.indexOf(item);
      if (index >= 0) {
        service.items.splice(index, 1);
      }
      if (!service.items.length) {
        service.restaurant = {};
      }
    },

    total: function() {
      return service.items.reduce(function(sum, item) {
        return sum + Number(item.price * item.qty);
      }, 0);
    },

    submitOrder: function() {
      if (service.items.length) {
        return $http.post('/api/order', {
          items: service.items,
          restaurant: service.restaurant,
          payment: service.payment,
          deliverTo: customer
        }).then(function(response) {
          service.reset();
          return response.data.orderId;
        });
      }
    },

    reset: function() {
      service.items = [];
      service.restaurant = {};
    },

    payment: {} // don't keep CC info in localStorage
  };

  createPersistentProperty('items', 'fmCartItems', Array);
  createPersistentProperty('restaurant', 'fmCartRestaurant', Object);

  function createPersistentProperty(localName, storageName, Type) {
    var json = localStorage[storageName];

    service[localName] = json ? JSON.parse(json) : new Type();

    $rootScope.$watch(
        function() { return service[localName]; },
        function(value) {
          if (value) {
            localStorage[storageName] = JSON.stringify(value);
          }
        },
        true);
  }

  return service;
});