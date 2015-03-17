/**
 * Created by mani on 14-6-29.
 */
$(document).ready(function() {
    $(window).on('action:topic.loaded', function () {
        var carousel = $(".carousel");
        var config = '';
        console.log(carousel);
        try{
          config = carousel.attr('config').replace(/\'/g, "\"");
          console.log(config);
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
});
