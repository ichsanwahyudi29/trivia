$(document).ready(function () {
  // $('body').addClass('lock');
  // $('.overlay').addClass('overlay--show');
  // $('.dialog').addClass('dialog--show');
})

$(function handleDialog() {
  $('#js_show-dialog').on({
    click: function() {
      $('body').addClass('lock');
      $('.overlay').addClass('overlay--show');
      $('.dialog').addClass('dialog--show');
    },
  });

  $('#js_close-dialog').on({
    click: function () {
      $('.dialog').addClass('dialog--close');
      setTimeout(() => {
        $('body').removeClass('lock');
      $('.overlay').removeClass('overlay--show');
        $('.dialog').removeClass('dialog--show');
        $('.dialog').removeClass('dialog--close');
      }, 300);
    }
  });
});
