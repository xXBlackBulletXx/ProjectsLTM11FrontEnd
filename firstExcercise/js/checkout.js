$(document).ready(() => {
    var cart = JSON.parse(sessionStorage.getItem("cart"));
    var restaurantImagePath = sessionStorage.getItem("restaurantPath");
    console.log(restaurantImagePath)
    $(".restaurantImage").css({
        "background": "url('"+restaurantImagePath+"')"
    })

    fillOrderSummary(cart.items);
    fillPrice(cart.total);

    $(".modify").on("click", () => {
        window.location.href = "/detail.html";
    })
})

/*
    fillOrderSummary
    Riempie la ul della lista delle cose ordinate
*/
function fillOrderSummary(items){
    $.each(items, (key, value) => {
        $("<li/>")
        .addClass("m0w m10h text-grey-darken-1")
        .html("x"+value+" "+key)
        .appendTo("#listaElementi");
    })
}

/*
    fillPrice
    Riempie il campo con il prezzo totale da pagare
*/
function fillPrice(price){
    $(".totalPrice").html("€ "+price.toFixed(2));
}