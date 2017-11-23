var utilModule = (() => {
    return {
        init: () => {
            navbarWidget.init(configModule.getHeaderInit());
            var _slider = sliderWidget.init(configModule.getSliderInit());
            var _fab = uiModule.fab(uiModule.iconMaterial("add"), "");
            $(_fab).addClass("all-ease-in-out p0w amber z-depth-2").appendTo(".content");
        }
    }
})();