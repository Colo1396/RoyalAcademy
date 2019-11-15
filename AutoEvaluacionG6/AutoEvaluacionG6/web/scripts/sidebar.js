$(document).ready(function () { //una vez que el documento sea cargado


    $(".hamburger").click(function () {
        $(".wrapper2").toggleClass("collapse2");
    });


    $(".submenu").click(function () {
        $(this).children("ul").slideToggle();
    })

    $("ul").click(function (p) {
        p.stopPropagation();
    })

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })

});

