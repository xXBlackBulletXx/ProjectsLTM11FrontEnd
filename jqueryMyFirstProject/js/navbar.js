var navbarWidget = (() => {

    function setIcons(){
        var _iconMenu = uiModule.iconMaterial("menu");
        $(_iconMenu)
        .addClass("p5w p5h all-linear menuBtn ")
        .appendTo("header");
        $(_iconMenu).on("click", (event) => {
            sliderWidget.toggle(configModule.getSliderToggleOptions())
        })
    }

    function setTitle(){
        var _titleMenu = uiModule.span("App", "p5w p10h vertical-middle",{
            fontSize: "1.2em"
        });
        $(_titleMenu).appendTo("header");
    }

    function setTheme(){
        $("header").addClass(configModule.getTheme().primary);
        $("meta[name='theme-color']").attr({
            content: $("header").css("background")
        })
    }

    return{
        init: (params) => {
            if(configModule.getTheme().activated){
                setTheme();
            }
            setIcons();
            setTitle();
        }
    }
})();