var ractive_componentes = {
  warns: function(warns){
    var ractive = new Ractive({
      el: "#output_warn",
      template: '#template_warns',
      data: { warns_list: warns }
    });
  },

  contacts:  function() {
    var ractive = new Ractive({
      el: "#output_contacts",
      template: '#template_li_contacts',
      data: { contacts_list: contacts },
      oncomplete: function () {
        $('#con').listview();
      }
    });

    ractive.on( 'activate', function ( event ) {
      $( "#tel" ).val($(event.node).attr("tel"));
      $("[data-role=panel]").panel("close");
      var tab = $('a[href="index.html#tab1"]');
      tab.trigger("click");
      tab.addClass("ui-btn-active");
    });
  }
};
