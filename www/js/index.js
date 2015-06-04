function alertCarrier() {
  var succ = function (data) {
    //alert(data['carrierName']);
    //alert(data['countryCode']);
    //alert(data['mcc']);
    //alert(data['mnc']);
  };
  var err = function () {
    alert('Error!');
  };
  window.plugins.carrier.getCarrierInfo(succ, err)
};



var onDeviceReady = function() {
    // find all contacts
    var options = new ContactFindOptions();
    options.filter = "";
    options.multiple = true;
    var fields = ["displayName", "name", "addresses", "emails"];
    navigator.contacts.find(fields, onSuccess, onError, options);
};

// onSuccess: Get a snapshot of the current contacts
//
var onSuccess = function(contacts) {
  ractive_componentes.contacts(contacts);
  ractive_componentes.emails(contacts);
};
// onError: Failed to get the contacts
//
var onError = function(contactError) {
  console.log(contactError);
};

var app = {

  initialize: function() {
    Ajax.initialize();
    network_information.initialize();
    $(document).off('pageshow').on('pageshow', '#main-page', this.bindEvents);
    document.addEventListener("deviceready", onDeviceReady, false);
    document.addEventListener('deviceready', alertCarrier, false);
    $(".back-home").click(function() {
      var tab = $('a[href="index.html#tab1"]');
      tab.trigger("click");
      tab.addClass("ui-btn-active");
    });

    $( "input[name='language']" ).change(Ajax.get.warns);
  },

  hideAllDivs: function() {
      $("#div_email").hide();
  },

  selectChange: function() {

  },

  bindEvents: function() {
     app.hideAllDivs();
     app.selectChange();
     $('.ui-btn-active').click();
  }
};
