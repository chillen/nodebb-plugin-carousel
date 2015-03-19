/**
 * Created by mani on 14-6-29.
 */
$(document).ready(function() {
    var loadOwl = function () {
        console.log("SHMOZ");
        $(".carousel").each(function(index) {
          console.log("RENDERING: " + index);
          var config = '';
          var carousel = $( this );

          try{
            config = carousel.attr('config').replace(/\'/g, "\"");
            config = jQuery.parseJSON(config);
          }catch(e){
            console.log(e);
          }
          if(config){
              carousel.owlCarousel(config);
          }
          else {
            carousel.owlCarousel();
          }
        });

    }

    $(window).on('action:widgets.loaded', loadOwl);
    $(window).on('action:post.save', loadOwl);
    $(window).on('action:topic.loaded', loadOwl);
});
