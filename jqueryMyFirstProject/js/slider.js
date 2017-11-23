var sliderWidget = (() => {
    var _slider;
    var _divOverlay;

    function createOverlay(){
        if($(".overlay").length == 0){
            _divOverlay = uiModule.div(configModule.getOverlayOptions(), "");
            $(_divOverlay).addClass("fixed overlay low-layer").appendTo("body");
        }else{
            _divOverlay = $(".overlay")
            .css({
                right: 0
            });
        }
        uiModule.animation("fadeIn", $(_divOverlay));

        $(_divOverlay).on("click", () => {
            sliderWidget.toggle(configModule.getSliderToggleOptions());
            destroyOverlay();
        })
    }

    function destroyOverlay(){        
        uiModule.animation("fadeOut", $(_divOverlay));
        setTimeout(() => {
            $(_divOverlay).css({
                right: "-100%"
            })
        },configModule.getTransitionTime())
    }

    function fillPanel(){
        var _closeBtn = uiModule.iconMaterial("close");
        $(_closeBtn)
        .addClass("p10h p10w closeSlider")
        .appendTo($(_slider));
        
        $(_closeBtn).on("click", () => {
            sliderWidget.toggle(configModule.getSliderToggleOptions());
        })
    }

    return {
        init: (params) => {
            $(params.target).css({
                width: params.coeff,
                height: "100vh",
                top: 0
            })
            .addClass("fixed top-layer");
            if(params.direction == "right"){
                $(params.target).css({
                    right: "-"+params.coeff
                })
            }else{
                $(params.target).css({
                    left: "-"+params.coeff
                })
            }
            _slider = params.target;

            fillPanel();

            return $(params.target);
        },
        toggle: (params) => {
            if($(params.target).attr("data-visible") == "true"){
                setTimeout(() => {
                    if(params.direction == "right"){
                        $(params.target).css({
                            right: "-"+params.coeff
                        })
                    }else{
                        $(params.target).css({
                            left: "-"+params.coeff
                        })
                    }
                },configModule.getTransitionTime())
                destroyOverlay();
            }else{
                if(params.direction == "right"){
                    $(params.target).css({
                        right: "0%"
                    })
                }else{
                    $(params.target).css({
                        left: "0%"
                    })
                }
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