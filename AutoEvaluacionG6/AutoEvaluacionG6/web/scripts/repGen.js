

var global_tituloChart = "";

window.onload = function () {
    $('#anio').on('change', function (e) {

       // var optionSelected = $("option:selected", this);
        var anioSelecionado = this.value;
       
        if (anioSelecionado != 0){
            global_tituloChart = "Año " + anioSelecionado;
            inicioCharts();
        }
       
    });
}

function inicioCharts() {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);

}
function drawChart() {
      //   EJEMPLO
    /*
    var arrayDatos = [
        ['Carrera', 'Aprobados', 'Desaprobados'],
        ['Lic. Sistemas', 50, 300],
        ['Ing. Electrica', 145, 266],
        ['Lic. Adm. Empresas', 70, 150]
    ];
    */

    arrayDatos = crearArrayDobleDinamico();

    var data = google.visualization.arrayToDataTable(arrayDatos);

    var options = {
        title: global_tituloChart,
        curveType: 'function',
        legend: { position: 'bottom' }
    };

    var chart = new google.visualization.BarChart(document.getElementById('chart_gen'));

    chart.draw(data, options);
}


function crearArrayDobleDinamico() {
    var arraDinamico = [];
    var arrEncabezados = ['Carrera', 'Aprobados', 'Desaprobados'];

    var arrayNombres = 
    arraDinamico.push(arrEncabezados);


    var arrayNombesAuxiliares = ["Lic. Sistemas", "Ing. Electrica","Lic. Adm. Empresas"]
    for (var i = 0; i < arrayNombesAuxiliares.length;i++){
        var arrayDatos = [
            arrayNombesAuxiliares[i],
            Math.floor((Math.random() * 100) + 23),
        Math.floor((Math.random() * 100) + 100)

        ];
        arraDinamico.push(arrayDatos);
    }
    return arraDinamico;
}
