var ajaxModule = (() => {

    function fallback(error){
        console.log(error.message);
    }

    return {
        get: (params) => {
            $.when(
                $.ajax({
                    type: "GET",
                    url: params.url,
                    contentType: "application/json",
                    dataType: "json"
                })
            ).done(params.callback)
            .fail(function(error){
                fallback(error);
            })
        }
    }
})();