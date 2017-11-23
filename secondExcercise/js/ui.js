var uiModule = (() => {
    return{
        iconMaterial: (html) => {
            var _icon = $("<i/>")
                .addClass("material-icons")
                .html(html);
            return $(_icon);
        },
        iconAwesome: (html, size) => {
            var _icon = $("<i/>")
                .addClass("fa fa-"+html + " fa-" + size);
            return $(_icon);
        },
        animation: (nameAnimation, element) => {
            $(element)
            .addClass("animated " + nameAnimation);
            setTimeout(() => {
                $(element).removeClass(nameAnimation);
            }, 300)
        },
        div: (style, classes) => {
            var _div = $("<div/>")
            .css(style)
            .addClass(classes);
            return $(_div);
        },
        acrylic: () => {
            var _acrylic = $("<div/>")
            .addClass("acrylic");
            return $(_acrylic);
        }
    }
})();