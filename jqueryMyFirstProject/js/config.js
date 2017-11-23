var configModule = (() => {
    var sliderToggleOptions;
    var _initSlider;
    var _initNavbar;
    var overlayOptions;
    var transitionTime;
    var theme = {
        primary: "blue-grey",
        accent: "pink-accent-2",
        activated: false
    }

    function setEnvironment(){
        //Opzioni per la funzione di toggle dello slider
        sliderToggleOptions = {
            target: $(".slider"),
            coeff: "80%",
            animationIn: "slideInLeft",
            animationOut: "slideOutLeft",
            direction: "left"
        }

        //Inizializzatore dello slider        
        _initSlider = {
            target: $(".slider"),
            coeff: "80%",
            direction: "left"
        }

        //Inizializzazione dell'overlay
        overlayOptions = {
            top: 0,
            right: 0,
            height: "100vh",
            width: "100%",
            background: "rgba(0,0,0,.4)"
        }

        //Inizializzatore della navbar        
        _initNavbar = {
            target: $("header")
        }

        //Tempo delle transizioni
        transitionTime = 300;
    }

    return{
        getSliderToggleOptions: () => {
            return sliderToggleOptions;
        },
        getSliderInit: () => {
            return _initSlider;
        },
        getTransitionTime: () => {
            return transitionTime;
        },
        getOverlayOptions: () => {
            return overlayOptions;
        },
        getHeaderInit: () => {
            return _initNavbar;
        },
        getTheme: () => {
            return theme;
        },
        init: () => {
            setEnvironment();
            utilModule.init();
        }
    }
})();

$(document).ready(() => {
    configModule.init();
})