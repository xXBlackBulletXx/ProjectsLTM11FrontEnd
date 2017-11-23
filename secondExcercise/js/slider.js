var sliderWidget = (() => {
    var _slider;

    function createOverlay(){
        var _divOverlay;
        if($(".overlay").length == 0){
            _divOverlay = uiModule.div({
                top: 0,
                right: 0,
                height: "100vh",
                width: "100%",
                background: "rgba(255,255,255,.6)"
            }, "");
            $(_divOverlay).addClass("fixed overlay").appendTo("body");
        }else{
            _divOverlay = $(".overlay")
            .css({
                right: 0
            });
        }
        uiModule.animation("fadeIn", $(_divOverlay));

        $(_divOverlay).on("click", () => {
            sliderWidget.toggle({
                target: _slider,
                coeff: "80%",
                animationIn: "slideInRight",
                animationOut: "slideOutRight"
            });

            uiModule.animation("fadeOut", $(_divOverlay));
            $(_divOverlay).css({
                right: "-100%"
            })
        })
    }

    return {
        init: (params) => {
            $(params.target).css({
                width: params.coeff,
                height: "100vh",
                top: 0,
                right: "-"+params.coeff
            })
            .addClass("fixed top-layer");
            _slider = params.target;            

            return $(params.target);
        },
        toggle: (params) => {
            if($(params.target).attr("data-visible") == "true"){
                setTimeout(() => {
                    $(params.target).css({
                        right: "-"+params.coeff
                    })
                },300)
            }else{
                $(params.target).css({
                    right: "0%"
                })
                createOverlay();                
            }
            $(params.target).attr({
                "data-visible": $(params.target).attr("data-visible") == "true" ? "false" : "true"
            });
            uiModule.animation(($(params.target).attr("data-visible") == "true" ? params.animationIn : params.animationOut), $(params.target));
            return $(params.target);
        }
    }
})();