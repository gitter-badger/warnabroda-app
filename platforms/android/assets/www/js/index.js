function onDeviceReady() {
    // find all contacts
    var options = new ContactFindOptions();
    options.filter = "";
    options.multiple = true;
    var fields = ["displayName", "name", "addresses", "emails"];
    navigator.contacts.find(fields, onSuccess, onError, options);
}

// onSuccess: Get a snapshot of the current contacts
//
function onSuccess(contacts) {
    // display the address information for all contacts
    for (var i = 0; i < contacts.length; i++) {
        var html = ("Formatted: "    + contacts[i].name.formatted       + "</br>" +
                    "------------------------------------------------------</br>" +);
        $( "#con" ).append( html );
    }
};
// onError: Failed to get the contacts
//
function onError(contactError) {
    $( "#con" ).append( contactError + "</br>" );
}


var app = {

  initialize: function() {
      $(document).off('pageshow').on('pageshow', '#main-page', this.bindEvents);
      //$(document).delegate('#page_name', 'pageshow', function () {
      //    var the_height = ($(window).height() - $(this).find('[data-role="header"]').height() - $(this).find('[data-role="footer"]').height());
      //    $(this).height($(window).height()).find('[data-role="content"]').height(the_height);
      //});

      // Wait for device API libraries to load
      //
      document.addEventListener("deviceready", onDeviceReady, false);
      // device APIs are available
      //
  },

  hideAllDivs: function() {
      $("#div_email").hide();
  },

  selectChange: function() {
      $("input[type='radio']").bind( "change", function(event, ui) {
        if( $('input[name=warn_by]:checked').val() === "0" ) {
            $("#div_email").show();
            $("#div_tel").hide();
        } else {
            $("#div_email").hide();
            $("#div_tel").show();
        }
      });
  },

  bindEvents: function() {
     app.hideAllDivs();
     app.selectChange();
  }
};
