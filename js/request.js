$(document).ready(function() {
  $('.subSession').on('click', function() {
    var setSession = $('.newSession').val();
    var data = {
      newSession: setSession
    };
    $.post("http://localhost:3111/new-session", {
      "name": setSession
    }, function(result) {
      console.log(result);
    });
  });


  // $('.subSession').on('click', function() {
  //   var setSession = $('.newSession').val();
  //   $.ajax({
  //     type: "POST",
  //     url: "http://localhost:3111/new-session",
  //     crossDomain: true,
  //     dataType: "json",
  //     data: {
  //       name: setSession
  //     }
  //   }).done(function(data) {
  //     console.log(data);
  //   })
  // });

});