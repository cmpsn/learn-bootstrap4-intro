$(document).ready(function() {
  $('#carousel-pause').click(function() {
    if ($('#carouselButton').children('span').hasClass('fa-pause')) {
      $('#mycarousel').carousel('pause');
      $('#carouselButton').children('span').removeClass('fa-pause');
      $('#carouselButton').children('span').addClass('fa-play');
    } 
    else if ($('#carouselButton').children('span').hasClass('fa-play')) {
      $('#mycarousel').carousel('cycle');
      $('#carouselButton').children('span').removeClass('fa-play');
      $('#carouselButton').children('span').addClass('fa-pause');
    }
  });
});

// Script to control the CAROUSEL Play and Pause BUTTONS
// $(document).ready(function() {
//   $('#carousel-pause').click(function() {
//     $('#mycarousel').carousel('pause');
//   });
//   $('#carousel-play').click(function() {
//     $('#mycarousel').carousel('cycle');
//   });
// });
