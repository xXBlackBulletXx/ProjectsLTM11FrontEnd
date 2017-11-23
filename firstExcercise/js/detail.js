var cart = sessionStorage.getItem("cart") ? JSON.parse(sessionStorage.getItem("cart")) : {
    "total": 0,
    "items": {}
};

var timeAnimations = 300;

$(document).ready(function(){
    $("#cartTotal").html("€ "+parseFloat(cart.total).toFixed(2));
    refreshCartItems();
    $(".cart").on("click", () => {
        $("#cart")
        .removeClass("slideOutRight")
        .addClass("slideInRight")
        .css({
            "right": 0
        });
        $("#overlay")
        .removeClass("fadeOut")
        .addClass("fadeIn")
        .css({
            "right": 0,
            "background": "rgba(0,0,0,.4)"
        });
    });

    $("#overlay, #close").on("click", () => {
        pullOut();
    })

    function pullOut(){
        $("#cart")
        .removeClass("slideInRight")
        .addClass("slideOutRight");

        $("#overlay")
        .removeClass("fadeIn")
        .addClass("fadeOut");

        setTimeout(()=>{
            $("#cart").css({
                "right": "-80%"
            });
            $("#overlay").css({
                "right": "-100%",
                "background": "rgba(0,0,0,0)"
            });
        },timeAnimations);
    }

    retriveRestaurantInformations();
    $(document).on("click", ".addBtn", function(){
        var item = $(this).attr("data-item");
        var price = $(this).attr("data-price");
        cart.total += parseFloat(price);
        cart.items[item] = (cart.items[item] || 0) + 1;
        $("[data-item-name='"+item+"'] span").html(cart.items[item]+ "x");
        $("#cartTotal").html("€ "+parseFloat(cart.total).toFixed(2));
        refreshCartItems();
    });
    $(document).on("click", ".removeBtn", function(){
        var item = $(this).attr("data-item");
        var price = $(this).attr("data-price");
        if(cart.items[item]){
            cart.total -= parseFloat(price);
            cart.items[item] = (cart.items[item] || 0) - 1;
            if(cart.items[item] != 0){
                $("[data-item-name='"+item+"'] span").html(cart.items[item]+ "x");
            }else{
                $("[data-item-name='"+item+"'] span").html("");
            }
            $("#cartTotal").html("€ "+parseFloat(cart.total).toFixed(2));
        }else{
            alert("Non hai aggiunto questo elemento al carrello");
        }
        refreshCartItems();
    });
})

/*
    refreshCartItems
    E' la funzione che si occupa di mostrare sul pannello laterale le portate che stiamo aggiungendo
*/
function refreshCartItems(){
    $("#cart ul")
    .addClass("p10h")
    .html(" ");
    $.each(cart.items, (key, value)=>{
        if(value != 0){
            var li = $("<li/>")
            .addClass("p5h element")
            .appendTo("#cart ul");

            var p = $("<p/>")
            .addClass("float-left p5h m0h p0w col-8")
            .html(key+": "+"x"+value)
            .appendTo($(li));

            var divBtn = $("<div/>")
            .addClass("float-right col-4 p0w text-right")
            .html("<span class='material-icons addBtn p5w bolder' data-item='"+key+"' data-price='"+$("[data-item-name='"+key+"']").attr("data-price")+"'>add_circle</span>" + "<span class='material-icons removeBtn p5w bolder' data-item='"+key+"' data-price='"+$("[data-item-name='"+key+"']").attr("data-price")+"'>remove</span>")
            .appendTo($(li));
        }
    })

    sessionStorage.setItem("cart", JSON.stringify(cart));
}

/*
    doCheckout
    Funzione che passa alla pagina checkout.html
*/
function doCheckout(){
    window.location.href = "/checkout.html";
}


/*
    retriveRestaurantInformations
    invoca il servizio json e si occupa di fare da dispatcher delle informazioni
*/
function retriveRestaurantInformations(){
    $.when(
        $.ajax({
            type: "GET",
            url: "https://api.myjson.com/bins/18vx1r",
            contentType: "application/json",
            dataType: "json"
        })
    ).done(function(response){
        fillRestaurantInfos(response.restaurant);
        fillRestaurantMenu(response.restaurant.menu);
    }).fail(function(error){
        console.log(error.message);
    })
}
/*
    addCategoryToMenu
    è la funzione che aggiugne ogni categoria e i piatti al menu
*/
function addItemsToCategory(items, divPadre){
    //console.log(items);
    $.each(items, function(index, item){
        var div = $("<div />")
            .addClass("p10w p10h border-bottom");

        var pietanzaContainer = $("<div/>")
            .addClass("pietanzaContainer inline-block");

        var spanEvidence = $("<span/>")
        .addClass("text-red-lighten-1")
        .html(cart.items[item.name] > 0 ? (cart.items[item.name]+"x") : "");
        
        var itemTitle = $("<p/>");
        $(itemTitle).addClass("bold grey-800").html($(spanEvidence)[0].outerHTML + item.name).attr({
            "data-item-name": item.name,
            "data-price": item.price
        });

        $(itemTitle).appendTo($(pietanzaContainer));

        var itemDescription = $("<p/>");
        $(itemDescription).addClass("lighter small text-grey-darken-1").html(item.description);
        $(itemDescription).appendTo($(pietanzaContainer));

        var itemPrice = $("<p/>");
        $(itemPrice).addClass("lighter small text-red-lighten-1").html("€" + item.price);
        $(itemPrice).appendTo($(pietanzaContainer));

        var buttonsContainer = $("<div/>").addClass("buttonsContainer inline-block vertical-middle");

        var addBtn = $("<i/>").addClass("material-icons addBtn").html("add").attr({
            "data-item": item.name,
            "data-price": item.price
        });
        var removeBtn = $("<i/>").addClass("material-icons removeBtn").html("remove").attr({
            "data-item": item.name,
            "data-price": item.price
        });
        
        $(addBtn).appendTo($(buttonsContainer));
        $(removeBtn).appendTo($(buttonsContainer));
    
        $(div).append($(pietanzaContainer), $(buttonsContainer));
        $(div).appendTo($(divPadre));
    })
}


/*
    addCategoryToMenu
    è la funzione che aggiugne ogni categoria e i piatti al menu
*/
function addCategoryToMenu(plate){
    //console.log(plate);
    var div = $("<div/>");
    var h4 = $("<h4/>")
        .addClass("bold big titleMenu p10w p10h")
        .html(plate.category)
        .appendTo($(div));
    $(div)
        .addClass("z-depth-1 divMenu m10h")
        .appendTo(".divMenus");
    addItemsToCategory(plate.items, div);
}

/*
    fillRestaurantMenu
    è la funzione che popola il menu locale
*/
function fillRestaurantMenu(menu){    
    $.each(menu, function(index, category){
        addCategoryToMenu(category);
    })
}


/*
    fillRestaurantInfos
    è la funzione che descrive il locale
*/
function fillRestaurantInfos(restaurant){
    //console.log(restaurant);
    $("#restaurant_categories").html("");
    $(".restaurant_name").html(restaurant.name).eq(0).addClass("animated fadeIn");
    $(".restaurant_address").html(restaurant.vicinity);
    var key = "AIzaSyDc_-wjPpy3v8eNcUdRuOva8hDaI4JzPY8";
    var path = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&key="+key+"&photoreference="+restaurant.photos[0].photo_reference;
    sessionStorage.setItem("restaurantPath", path)
    $("#restaurant_pic").css("background", "url('" + path + "')").addClass("maxW100");
    $("#restaurant_rating").html(restaurant.rating);
    $.each(restaurant.types, function(index,obj){
        var tag = $("<div />");
        $(tag).addClass("tag regular small");
        if(index == 0){
            $(tag).addClass("firstTag");
        }
        $(tag).html(obj.toString().replace(/_/g, " "));
        $("#restaurant_categories").append($(tag));
    });
}