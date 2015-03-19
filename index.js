(function(module) {
    var Carousel = {};

    // Searches for the regex [carousel] ... [/carousel]
    var carRegex = /\[carousel[\s]*\{([\s\S]*?)\}\]([\s\S]*)\[\/carousel\]/;

    // Searches for the regex [item] ... [/item]
    var itemRegex = /\[item (.*)\]/mg;

    var imgRegex = /\[item img-src="(.*)"\]/;

    // This is the regex, if markdown plugin renders it as a link
    var imgRegexMarkdown = /\[item img-src=\&quot;<a href="(.*)".*\&quot;\]/;



    var generateCarousel = function( content ) {
      var matched = carRegex.exec(content)
        , config  = matched[1]
        , content = matched[2]
        , items   = itemRegex.exec(content)
        , config  = config.replace(/&quot;/g, "'")
        , str     = "<div class='owl-carousel owl-theme carousel' " + (config? "config={"+config+"}" : "") + ">"
        ;

        // Items should be incoming as a JSON object
        while(items) {
          try {
            str += "<div class='item'>";

            // Prepare the JSON. Replace &quot; with quotes, remove any
            // extra <a href>'s
            var json = items[1].replace(/&quot;/g, "\"");
            json = json.replace(/<a href=[\s\S]*?>(.*?)<\/a>/g, "$1");

            json = JSON.parse(json);

            if (json.href) {
              str += "<a href=" + json.href + ">";
            }
            if (json.imgsrc) {
              str += "<div class='carousel-img'><img class='carousel-img' src='"+json.imgsrc+"' /></div>";
            }
            if (json.caption) {
              str += "<div class='carousel-caption'>"+json.caption+"</div>";
            }
            if (json.href) {
              str += "</a>";
            }

            str += "</div>";
            items = itemRegex.exec(content);
          }
          catch (e) {
            console.error("ERROR PROCESSING ITEM JSON: Did you format the item parameters correctly?\n", e);
            break;
          }
        }

        str += "</div>";

        return str;
    }

    Carousel.parse = function(data, callback) {
        console.log("Parsing: ", data);
        if (!data || !data.postData || !data.postData.content) {
          return callback(null, data);
        }

        if (data.postData.content.match(carRegex)) {
          data.postData.content =
            data.postData.content.replace(carRegex, generateCarousel(data.postData.content));
        }

        callback(null, data);
    };

    Carousel.parseRaw = function(data, callback) {
      Carousel.parse( { "postData": { "content": data } }, function (err, data) {
        callback(err, data.postData.content);
      } );
    }

    module.exports = Carousel;
}(module));
