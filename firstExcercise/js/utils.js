/*
    
*/
$(document).on("click", ".fab", function(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(callback, fallback);
    }
});

/*
    fallback
    viene invocata se l'utente accetta la geolocalizzazione
*/
function callback(position){
    console.log(position);
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var key = "AIzaSyDc_-wjPpy3v8eNcUdRuOva8hDaI4JzPY8";
    var path = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+ latitude +","+ longitude +"&radius=500&types=food&key=" + key;
    console.log(path);
    getResults(path);
}

/*
    fallback
    viene invocata se l'utente non accetta la geolocalizzazione
*/
function fallback(error){
    console.log(error.message);
}


function printError(error){
    console.log(error);
}

/*
    populateResults
    itera i risultati da google places
*/
function populateResults(element){
    console.log(element);
    var key = "AIzaSyDc_-wjPpy3v8eNcUdRuOva8hDaI4JzPY8";

    var div = $("<div/>");
    $(div).addClass("box z-depth-3 m20h radius-5px");
    
    var photo = $("<div />").addClass("pic");
    var anchor = $("<a/>");
    if(element.photos && element.photos.length > 0){
        $(anchor).attr({
            href: "/detail.html"
        })
        var path = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&key="+key+"&photoreference="+element.photos[0].photo_reference;    
    }

    var informations = $("<div />");
    $(informations).addClass("informations");

    var name = $("<h3 />");
    $(name).html(element.name);
    var address = $("<h3 />");
    $(address).html(element.vicinity).addClass("small regular text-grey-darken-1");

    var tags = $("<div />").addClass("tags");
    $.each(element.types, function(index, obj){
        if(index < 3){
            var tag = $("<div />");
            $(tag).addClass("tag regular small z-depth-1-half");
            if(index == 0){
                $(tag).addClass("firstTag");
            }
            $(tag).html(obj.toString().replace(/_/g, " "));
            $(tags).append($(tag));
        }
    });

    if(path == undefined){
        $(photo).css({
            background: "#d2d2d2",
        });
    }else{
        $(photo).css({
            background: "url('"+ path +"')",
        });
    }
    
    var rating = $("<span/>");
    if(element.rating){
        $(rating).addClass("rating");
        $(rating).append("<i class='material-icons'>stars</i> "+element.rating);
    }

    $(informations).append($(name), $(address), $(tags), $(rating));
    $(anchor).append($(photo));
    $(div).append($(anchor), $(informations));
    $("#container").append(div);
}

/*
    parseResults
    itera i risultati da google places
*/
function parseResults(response){
    $("#status").html(response.results.length + " risultati trovati");
    $.each(response.results, function(index,element){
        populateResults(element);
    })
}

/*
    getResults
    invoca i servizi di google places
*/
function getResults(path){
    $("#status").html("Caricamento dei risultati...");
    $.when(
        $.ajax({
            type: "GET",
            url: path,
            contentType: "application/json",
            dataType: "json"
        })
    ).done(function(response){
        parseResults(response);
    }).fail(function(error){
        printError(error);
    });
}