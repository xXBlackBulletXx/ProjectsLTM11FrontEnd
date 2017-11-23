var utlisModule = (() => {
    //Inizializzo la variabile _slider affinche sia visibile in tutto il modulo
    var _slider;

    var api_key = "9239183129312931283131"; //VARIABILE PRIVATA

    function getRistoranteMenu(){
        ajaxModule.get({
            url: "https://api.myjson.com/bins/18vx1r",
            callback: (response) => {
                utlisModule.notify(response);
            }
        });
    }

    //Creo l'icona di google per aprire e chiudere il pannello _slider
    function setupIcon(){
        //var _icon = uiModule.iconAwesome("google", "2x")
        var _icon = uiModule.iconMaterial("menu")
        .addClass("p20w p20h float-right over-top-layer");
        $("#container").append(_icon);
        $(_icon).addClass("text-grey-darken-1");
        $(_icon).on("click", (event) => {
            sliderWidget.toggle({
                target: _slider,
                coeff: "80%",
                animationIn: "slideInRight",
                animationOut: "slideOutRight"
            })
        })
    }

    return {
        notify: (msg) => {
            console.log(msg)
        },
        init: () => {
            getRistoranteMenu();
            setupIcon();
            _slider = sliderWidget.init({
                target: $("#slider"),
                coeff: "80%"
            })
            .css({
                background: "#4285f4"
            });
        }
    }
})();

$(document).ready(() => {
    
    utlisModule.init();

})