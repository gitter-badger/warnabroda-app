angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  },{
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})
.factory('contact_service', ['$q', function($q) {

  var formatContact = function(contact) {
      return {
          "displayName"   : contact.name.formatted || contact.name.givenName + " " + contact.name.familyName || "Mystery Person",
          "emails"        : contact.emails || [],
          "phones"        : contact.phoneNumbers || [],
          "photos"        : contact.photos || []
      };
  };

  var pns = [
    { type: 'work',   value: '212-555-1234', pref: false },
    { type: 'mobile', value: '917-555-5432', pref: true },
    { type: 'home',   value: '203-555-7890', pref: false }
  ];
  var ems = [
    { type: 'work',   value: 'xptavares@gmail.com', pref: false },
    { type: 'mobile', value: 'mobile@teste.com.br', pref: true },
    { type: 'home',   value: 'home@teste.com.br', pref: false }
  ];
  var contacts = [
    {id: 1, displayName: "Alexandre Tavares",  phoneNumbers :pns, emails: ems, face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png' },
    {id: 2, displayName: "teste 2",  phoneNumbers :pns, emails: ems, face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'  }
  ];

  var pickContact = function() {

      var deferred = $q.defer();

      if(navigator && navigator.contacts) {

          navigator.contacts.pickContact(function(contact){

              deferred.resolve( formatContact(contact) );
          });

      } else {
          deferred.reject("Bummer.  No contacts in desktop browser");
      }

      return deferred.promise;
  };

  var onDeviceReady = function() {
    // find all contacts
    var options = new ContactFindOptions();
    options.filter = "";
    options.multiple = true;
    var fields = ["displayName", "name", "addresses", "emails"];
    navigator.contacts.find(fields, onSuccess, onError, options);
  };

  var onError = function(contactError) {
    console.log(contactError);
  };

  var onSuccess = function(contacts) {
    _.each(contacts, function(contact) {
       contacts.push( formatContact(contact) );
    });
  };

  onDeviceReady();

  return {
      pickContact : pickContact,
      all : function() {
        return contacts;
      },
      find : function(contact_id) {
        return _.find(contacts, function(c){ return c.id === parseInt(contact_id) });
      },
      find_by_email: function(email) {
        return _.reject([ _.find(contacts, function(c){ 
          return c.displayName === email }) ], function(num){ return typeof(num) !== "undefined"; });
      }
  };
}])

.factory('WarningService', function ($q, $http) {
	return {
		getMessages : function(language) {
			var deferred = $q.defer();
            $http.get('warnabroda/messages/'+language).success(function(data) {
                deferred.resolve(data);
            }).error(function(data, status, headers, config) {
            	deferred.reject(status);
            });
            return deferred.promise;
		},
		getContactTypes : function() {
			var deferred = $q.defer();
            $http.get('warnabroda/contact_types').success(function(data) {
                deferred.resolve(data);
            }).error(function(data, status, headers, config) {
            	deferred.reject(status);
            });
            return deferred.promise;
		},
		send : function(warn){
			var deferred = $q.defer();
            $http.post('warnabroda/warnings', warn).success(function(data) {
                deferred.resolve(data);
            }).error(function(data, status, headers, config) {
            	deferred.reject(status);
            });
            return deferred.promise;
		}
  }
})

.factory('carrier_service', function($ionicPlatform) {

  var carrierName = null;
  var countryCode = null;
  var mcc = null;
  var mnc = null;
  
  $ionicPlatform.ready(function() {
    var succ = function (data) {
      console.log("carrierName: " + data['carrierName']);
      console.log("countryCode: " + data['countryCode']);
      console.log("mcc: " + data['mcc']);
      console.log("mnc: " + data['mnc']);
      carrierName = data['carrierName'];
      countryCode = data['countryCode'];
      mcc = data['mcc'];
      mnc = data['mnc'];
    }
    var err = function () {
      console.log('Error!');
    }
    window.plugins.carrier.getCarrierInfo(succ, err)
  });

  return {
    carrierName: function() {
      return carrierName;
    },
    countryCode: function() {
      return countryCode;
    },
    mcc: function() {
      return mcc;
    },
    mnc: function() {
      return mnc;
    }
  };
});
