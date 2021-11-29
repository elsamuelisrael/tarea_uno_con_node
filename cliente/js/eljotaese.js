/* ************************************************************************* */

// LLAMAR A LA API DE FORMA REMOTA O LOCAL *************************

// REMOTA
var url = "https://cuatroymedio.net:5000";

// LOCAL
// var url = "http://localhost:5000";

/* ************************************************************************* */

var epp = 5;
var totaldepaginas = 0;

function creapaginas(epp, cuantostotal){

    //var cuantostotal = json[0].cuantos;

    var paginas = cuantostotal / epp;
    var resto = cuantostotal % epp;
    totaldepaginas = 0;

    //console.log(parseInt(paginas) + ' - ' + (resto));

    if (resto == 0) {
        totaldepaginas = parseInt(paginas)
    }
    else {
        totaldepaginas = parseInt(paginas) + 1;
    }

    //console.log(totaldepaginas)

    var lacadena = '';

    for (var i = 1; i <= totaldepaginas; i++) {

        var cuantospaginacion = (i - 1) * epp;

        lacadena += `
            <li id="btnpagina${i}" class="page-item">
                <a id="linkpaginacion${i}"
                    onclick="carga_lista_empleados(${cuantospaginacion},${i},false)"
                    data-btnnumero = "${i}"
                    data-nombreid = "#btnpagina${i}"
                    data-cuantos="${cuantospaginacion}" 
                    data-epp="${epp}" 
                    class="page-link" href="javascript:void(0);">
                    ${i}
                </a>
            </li>
        `;

        //console.log(i + ' ' + totaldepaginas);

        if (i == totaldepaginas) {

            $("#paginacion").show();

            $("#listadepaginas").empty();
            $("#listadepaginas").append(lacadena);

            carga_lista_empleados(0,1,false);

            //var elEbtna = `#btnpagina${obj.btnnumero}`;
            //$(elEbtna).addClass('active');

            //$('#elcargador').hide();

        }

    }

}

function llamaDatos(res){

    var json = JSON.parse(res);

    //console.log(json[0].cuantos);

    creapaginas(epp, json[0].cuantos);

}

function cargainicio(){

    $("#campobuscar").val('');
    $('#cuantosresultados').hide();
    $('#cuantosresultados').text(0);

    var link = `${url}/api/v1/empleados/cuentaempleados/hola`; // localhost o localhost

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(link, requestOptions)
        .then(response => response.text())
        .then(result => llamaDatos(result)) // .then(result => console.log(result))
        .catch(error => console.log('error', error));

}

/* function isOdd(num) { 
    return num % 2;
} */

function empleadoRegistrado(res){

    var json = JSON.parse(res);

    console.log(json);

    cargainicio();

    $('#modalNuevo').modal('hide');

    $("#modalNuevo #floatingInputNombreMnuevo").val('');
    $("#modalNuevo #floatingInputAPMnuevo").val('');
    $("#modalNuevo #floatingInputAMMnuevo").val('');
    $("#modalNuevo #floatingInputEmailMnuevo").val('');
    
    $("#mensajeliveToast").text('El Empleado se agrego correctamente!');
    $("#liveToast").toast('show');


}

function validarEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function nuevoEmpleado(){

    var nombre  = $("#floatingInputNombreMnuevo").val();
    var ap      = $("#floatingInputAPMnuevo").val();
    var am      = $("#floatingInputAMMnuevo").val();
    var email   = $("#floatingInputEmailMnuevo").val();
    var puesto  = $("#selectPuestosMnuevo").val();

    if (nombre == null || nombre == "") {

        elmensaje = '<h5 class="text-dark">El nombre esta vacío</h5>';
        muestraModalmensaje(elmensaje, "#floatingInputNombreMnuevo");

        return false;
    }

    if (ap == null || ap == "") {

        elmensaje = '<h5 class="text-dark">El Apellido Paterno esta vacío</h5>';
        muestraModalmensaje(elmensaje, "#floatingInputAPMnuevo");

        return false;
    }

    if (am == null || am == "") {

        elmensaje = '<h5 class="text-dark">El Apellido Materno esta vacío</h5>';
        muestraModalmensaje(elmensaje, "#floatingInputAMMnuevo");

        return false;
    }

    if (email == null || email == "") {

        elmensaje = '<h5 class="text-dark">El Email esta vacío</h5>';
        muestraModalmensaje(elmensaje, "#floatingInputEmailMnuevo");

        return false;

    }

    if (!validarEmail(email)) {

        elmensaje = '<h5 class="text-dark">El Email no es valido</h5>';
        muestraModalmensaje(elmensaje, "#floatingInputEmailMnuevo");

        return false;

    }

    if (puesto == null || puesto == "" || puesto == 0) {

        elmensaje = '<h5 class="text-dark">Debe seleccionar un puesto</h5>';
        muestraModalmensaje(elmensaje, "#selectPuestosMnuevo");

        return false;

    }
    
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("nombre", nombre);
    urlencoded.append("ap", ap);
    urlencoded.append("am", am);
    urlencoded.append("email", email);
    urlencoded.append("puesto", puesto);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    var link = `${url}/api/v1/empleados/`;

    fetch(link, requestOptions)
        .then(response => response.text())
        .then(result => empleadoRegistrado(result))
        .catch(error => console.log('error', error));
}

function muestraModalmensaje(elmensaje, campo) {

    $("#contenidomodalmensaje").html(elmensaje);
    $("#modalmensaje").animate({ opacity: '1' }, 1, function () { });
    $("#modalmensajeheader").removeClass("bg-info text-dark");
    $("#modalmensajeheader").addClass("bg-danger text-white");

    $("#modalNuevo").addClass("blur");
    //$("#paginacion").addClass("blur");
    //$("#formbuscar").addClass("blur");
    

    $("#modalmensaje").modal('show');

    $('#modalmensaje').animate({ opacity: '.9' }, 1500, function () {

        $(this).animate({ opacity: '0' }, 1500, function () {

            $("#modalmensaje").modal('hide');
            $(campo).focus();

            $("#modalNuevo").removeClass("blur");
            //$("#paginacion").removeClass("blur");
            //$("#formbuscar").removeClass("blur");

        })
    })

}

function muestraModalmensajeb(elmensaje) {

    $("#contenidomodalmensaje").html(elmensaje);
    $("#modalmensaje").animate({ opacity: '1' }, 1, function () { });
    $("#modalmensajeheader").removeClass("bg-info text-dark");
    $("#modalmensajeheader").addClass("bg-danger text-white");

    $("#divlalista").addClass("blur");
    $("#paginacion").addClass("blur");

    $("#modalmensaje").modal('show');

    $('#modalmensaje').animate({ opacity: '.9' }, 1500, function () {

        $(this).animate({ opacity: '0' }, 1500, function () {

            $("#modalmensaje").modal('hide');
            $("#campobuscar").focus();

            $("#divlalista").removeClass("blur");
            $("#paginacion").removeClass("blur");

        })
    })

}

function muestraModalmensajec(elmensaje) {

    $("#contenidomodalmensaje").html(elmensaje);
    $("#modalmensaje").animate({ opacity: '1' }, 1, function () { });
    $("#modalmensajeheader").removeClass("bg-info text-dark");
    $("#modalmensajeheader").addClass("bg-danger text-white");

    //$("#divlalista").addClass("blur");
    //$("#paginacion").addClass("blur");

    $("#modalmensaje").modal('show');

    $('#modalmensaje').animate({ opacity: '.9' }, 1500, function () {

        $(this).animate({ opacity: '0' }, 1500, function () {

            $("#modalmensaje").modal('hide');

            cargainicio();

            //$("#campobuscar").focus();

            //$("#divlalista").removeClass("blur");
            //$("#paginacion").removeClass("blur");

        })
    })

}

function empleadoEditado(res,obj){

    var json = JSON.parse(res);

    console.log(json);
    console.log(obj);

    if(obj.buscar == "true"){

        var str = $("#campobuscar").val();
        var elnombre = $("#floatingInputNombre").val() + " " + $("#floatingInputAP").val() + " " + $("#floatingInputAM").val(); 
        var nombreconformato = colorString(elnombre, str);

        var puestoid = $("#selectPuestos").val();
        var puestonombre = $("#selectPuestos option:selected" ).text();

        //$('#btnEditar').attr('data-nombre', elnombre);

        $(`#btneditar_${obj.elindex}`).attr('data-email', $("#floatingInputEmail").val());
        $(`#btneditar_${obj.elindex}`).attr('data-nombre', $("#floatingInputNombre").val());
        $(`#btneditar_${obj.elindex}`).attr('data-ap', $("#floatingInputAP").val());
        $(`#btneditar_${obj.elindex}`).attr('data-am', $("#floatingInputAM").val());
        $(`#btneditar_${obj.elindex}`).attr('data-puestoid', puestoid);
        $(`#btneditar_${obj.elindex}`).attr('data-puestonombre', puestonombre);

        $(`#nombre_${obj.elindex}`).html(nombreconformato);
        $(`#puesto_${obj.elindex}`).html(puestonombre);
        $(`#email_${obj.elindex}`).html($("#floatingInputEmail").val());
    }
    else{

        $("#paginacion").show();
        carga_lista_empleados(obj.paglax,obj.pagelid,obj);

    }

    $('#modalEditar').modal('hide');

    $("#modalNuevo #floatingInputNombre").val('');
    $("#modalNuevo #floatingInputAP").val('');
    $("#modalNuevo #floatingInputAM").val('');
    $("#modalNuevo #floatingInputEmail").val('');

    $("#mensajeliveToast").text('Los datos se editaron correctamente!');
    $("#liveToast").toast('show');

}

function editarEmpleado(obj){

    var nombre  = $("#floatingInputNombre").val();
    var ap      = $("#floatingInputAP").val();
    var am      = $("#floatingInputAM").val();
    var email   = $("#floatingInputEmail").val();
    var puesto  = $("#selectPuestos").val();

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var link = `${url}/api/v1/empleados/${obj.elid}`;

    var urlencoded = new URLSearchParams();
    urlencoded.append("nombre", nombre);
    urlencoded.append("ap", ap);
    urlencoded.append("am", am);
    urlencoded.append("email", email);
    urlencoded.append("puesto", puesto);

    var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch(link, requestOptions)
        .then(response => response.text())
        .then(result => empleadoEditado(result,obj))
        .catch(error => console.log('error', error));

}

function muestradatosEmpleados(res, obj, otroobj){

    var json = JSON.parse(res);

    // console.log(json)

    var cadenab = ``;

    json.forEach(function (item, index) {

        //console.log(item)

        /* var colorbg = `bg-light`;

        if(isOdd(index)){

            colorbg = `bg-success`;

        } */

        var nombre = `${item.nombre} ${item.ap} ${item.am}`;

        cadenab += `

            <div class="accordion-item" id="acordion_${index}">
                <h2 class="accordion-header" id="heading${index}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne${index}" aria-expanded="false" aria-controls="collapseOne${index}">
                        <span">${nombre}</span>
                    </button>
                </h2>
                <div id="collapseOne${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#accordionExample">
                    <div class="accordion-body">

                        <div class="container">
                            
                            <div class="row text-center">

                                <div class="col">
                                    <div style="--bs-bg-opacity: .25;" class="shadow-none p-2 mb-4 bg-primary rounded-4">Puesto</div>
                                </div>

                                <div class="col">
                                    <div style="--bs-bg-opacity: .25;" class="shadow-none p-2 mb-4 bg-primary rounded-4">Email</div>
                                </div>

                                <div class="col">
                                    <div style="--bs-bg-opacity: .25;" class="shadow-none p-2 mb-4 bg-primary rounded-4">Acciones</div>
                                </div>

                            </div>

                            <div class="row text-center">
                                <div class="col">
                                    <span">${item.nombrepuesto}</span>
                                </div>
                                <div class="col">
                                    <span">${item.email}</span>
                                </div>
                                <div class="col">
                                    <div class="btn-group dropstart text-end">
                                        <button style="outline: none; box-shadow: none;" role="button" type="button" class="btn btn-sm btn-outline-dark border-0" data-bs-toggle="dropdown">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-horizontal" viewBox="0 0 16 16">
                                                <path d="M2 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                            </svg>
                                        </button>
                                        <ul class="dropdown-menu">
                                            
                                            <li>
                                                <a 
                                                    data-elid="${item.id}" 
                                                    data-nombre="${item.nombre}"
                                                    data-elindex="${index}"
                                                    data-nombreacordion="acordion_${index}"
                                                    data-ap="${item.ap}"
                                                    data-am="${item.am}"
                                                    data-email="${item.email}"
                                                    data-puestoid="${item.puesto}"
                                                    data-pagx="${obj.lax}"
                                                    data-pagelid="${obj.elid}"
                                                    data-buscar="false"
                                                    class="dropdown-item" data-bs-toggle="modal" 
                                                    data-bs-target="#modalEditar"
                                                >
                                                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar

                                                </a>
                                            </li>

                                            <li>
                                                <a 
                                                    data-elid="${item.id}" 
                                                    data-nombre="${nombre}"
                                                    data-nombreacordion="acordion_${index}"
                                                    class="dropdown-item"
                                                    data-bs-toggle="modal"
                                                    data-bs-target="#modalmensajeeliminar"
                                                    href="#"
                                                >
                                                    <i class="fa fa-ban" aria-hidden="true"></i> Eliminar

                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        `;

        if(index == (json.length-1)){

            $("#divlalistaacordion").empty();
            $("#divlalistaacordion").animate({ opacity: '0.33' }, 1, function () { 

                $("#divlalistaacordion").append(cadenab);

                $("#divlalistaacordion").animate({ opacity: '1' }, 750, function () {
                    
                    $('#elcargador').hide();

                    if(otroobj!=false){

                        console.log(otroobj);

                        var elE = `#${otroobj.acordionorigen}`;

                        $(elE).animate({ opacity: '0.125' }, 500, function () {
                            $(this).animate({ opacity: '1' }, 750, function () { 
                            });
                        });

                    }
                
                });

            });

            //$("#divlalistaacordion").empty();
            //$("#divlalistaacordion").append(cadenab);

        }

    });

}

function carga_lista_empleados(x,id,obj){

    var elobj = {"lax":x, "elid":id}

    $('#elcargador').show();

    var link = `${url}/api/v1/empleados/paginacion/${x}`; // localhost o localhost

    for (var i = 1; i <= totaldepaginas; i++) {

        var elEbtna = `#btnpagina${i}`;
        $(elEbtna).removeClass('active');

    }
    
    elEbtna = `#btnpagina${id}`;
    $(elEbtna).addClass('active');

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(link, requestOptions)
        .then(response => response.text())
        .then(result => muestradatosEmpleados(result,elobj,obj)) // .then(result => console.log(result))
        .catch(error => console.log('error', error));

}

function muestradatosPuestos(res,puestoid){

    var json = JSON.parse(res);

    //console.log(json);

    var cadena = '';
    var cadenaNueva = "<option value='0' selected>Seleccionar Puesto</option>";

    json.forEach(function (item, index) {

        if(puestoid != 0){

            //console.log(item);

            var seleccionado = '';

            //console.log(puestoid + ' ' + item.id);

            if(puestoid == item.id) seleccionado = 'selected';

            cadena += `

                <option value="${item.id}" ${seleccionado}>${item.nombre}</option>

            `;

            if(index == (json.length-1)){

                $('#elcargador').hide();

                $("#selectPuestos").empty();
                $("#selectPuestos").append(cadena);

            }

        }
        else{

            cadenaNueva += `

                <option value="${item.id}">${item.nombre}</option>

            `;

            if(index == (json.length-1)){

                $('#elcargador').hide();

                $("#selectPuestosMnuevo").empty();
                $("#selectPuestosMnuevo").append(cadenaNueva);

            }

        }

    });

}

function carga_lista_puestos(puestoid){

    $('#elcargador').show();

    var link = `${url}/api/v1/puestos/`;

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    fetch(link, requestOptions)
        .then(response => response.text())
        .then(result => muestradatosPuestos(result,puestoid)) 
        .catch(error => console.log('error', error));

}

$('#modalEditar').on('show.bs.modal', function (e) {

    console.log(e.relatedTarget.dataset);

    $("#modalEditar #floatingInputNombre").val(e.relatedTarget.dataset.nombre);
    $("#modalEditar #floatingInputAP").val(e.relatedTarget.dataset.ap);
    $("#modalEditar #floatingInputAM").val(e.relatedTarget.dataset.am);
    $("#modalEditar #floatingInputEmail").val(e.relatedTarget.dataset.email);

    $('#btnEditar').attr('data-elid', e.relatedTarget.dataset.elid);
    $('#btnEditar').attr('data-acordionorigen', e.relatedTarget.dataset.nombreacordion);
    $('#btnEditar').attr('data-paglax', e.relatedTarget.dataset.pagx);
    $('#btnEditar').attr('data-pagelid', e.relatedTarget.dataset.pagelid);
    $('#btnEditar').attr('data-buscar', e.relatedTarget.dataset.buscar);
    $('#btnEditar').attr('data-elindex', e.relatedTarget.dataset.elindex);
    $('#btnEditar').attr('data-puestoid', e.relatedTarget.dataset.puestoid);
    $('#btnEditar').attr('data-puestonombre', e.relatedTarget.dataset.puestonombre);

    carga_lista_puestos(e.relatedTarget.dataset.puestoid);

    $("#divlalista").addClass("blur");
    $("#paginacion").addClass("blur");
    $("#formbuscar").addClass("blur");

    $("#modalEditarcontenido").css({ opacity: 0.90 });
    
});


$('#modalEditar').on('hidden.bs.modal', function (e) {
    $("#divlalista").removeClass("blur");
    $("#paginacion").removeClass("blur");
    $("#formbuscar").removeClass("blur");


    $("#modalEditarcontenido").css({ opacity: 1 });
})

$('#modalNuevo').on('show.bs.modal', function (e) {

    /* console.log(e.relatedTarget.dataset);

    $("#modalEditar #floatingInputNombre").val(e.relatedTarget.dataset.nombre);
    $("#modalEditar #floatingInputAP").val(e.relatedTarget.dataset.ap);
    $("#modalEditar #floatingInputAM").val(e.relatedTarget.dataset.am);
    $("#modalEditar #floatingInputEmail").val(e.relatedTarget.dataset.email); */

    carga_lista_puestos(0);

    $("#divlalista").addClass("blur");
    $("#paginacion").addClass("blur");
    $("#formbuscar").addClass("blur");

    $("#modalNuevocontenido").css({ opacity: 0.90 });
    
});


$('#modalNuevo').on('hidden.bs.modal', function (e) {
    
    $("#divlalista").removeClass("blur");
    $("#paginacion").removeClass("blur");
    $("#formbuscar").removeClass("blur");
    $("#modalNuevocontenido").css({ opacity: 1 });

    $("#modalNuevo #floatingInputNombreMnuevo").val('');
    $("#modalNuevo #floatingInputAPMnuevo").val('');
    $("#modalNuevo #floatingInputAMMnuevo").val('');
    $("#modalNuevo #floatingInputEmailMnuevo").val('');

})

function colorString(str, find) {
    var reg = new RegExp('('+find+')', 'ig');
    return str.replace(reg, "<strong class='text-danger'>$1</strong>");
}

$("#campobuscar").on('keyup', function (e) {
    
    if (e.key === 'Enter' || e.keyCode === 13) {
        
        // console.log(e)

        if(e.target.value == "" || e.target.value == null){

            $(e).focus();
        }
        else{

            cargaBusqueda(e.target.value);
            
        }

    }

});

function cargaBusqueda(str) {

    
    $('#elcargador').show();

        //$("#divlalista").slideUp(250, function () { 

            //$("#paginacion").hide();
            
            /* $(this).slideDown(1250, function () {
            }); */

            //var q = obj.value;

            var settings = {
                "url": `${url}/api/v1/empleados/buscarpornombre/${str}`,
                "method": "GET",
                "timeout": 0,
                "headers": {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                "data": {
                    "x": false            }
            };
      
            $.ajax(settings).done(function (json) {
            
                console.log(json);

                if(json.length>0){

                    $("#divlalista").slideUp(250, function () { 
                        $("#paginacion").hide();
                    });

                    var cadenab = ``

                    json.forEach(function (item, index) {

                        console.log(item);

                        var nombre = `${item.nombre} ${item.ap} ${item.am}`;
                        var nombreconformato = colorString(nombre, str);

                        /* var str = nombre;
                        var nombrecompaniaformato = str.replace(q, "<sam style='color:red;'>" + q + "</sam>"); */

                        cadenab += `

                            <div class="accordion-item" id="acordion_${index}">
                                <h2 class="accordion-header" id="heading${index}">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne${index}" aria-expanded="false" aria-controls="collapseOne${index}">
                                        <span id="nombre_${index}">${nombreconformato}</span>
                                    </button>
                                </h2>
                                <div id="collapseOne${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#accordionExample">
                                    <div class="accordion-body">

                                        <div class="container">
                                            
                                            <div class="row text-center">

                                                <div class="col">
                                                    <div style="--bs-bg-opacity: .25;" class="shadow-none p-2 mb-4 bg-primary rounded-4">Puesto</div>
                                                </div>

                                                <div class="col">
                                                    <div style="--bs-bg-opacity: .25;" class="shadow-none p-2 mb-4 bg-primary rounded-4">Email</div>
                                                </div>

                                                <div class="col">
                                                    <div style="--bs-bg-opacity: .25;" class="shadow-none p-2 mb-4 bg-primary rounded-4">Acciones</div>
                                                </div>

                                            </div>

                                            <div class="row text-center">
                                                <div class="col">
                                                    <span id="puesto_${index}">${item.nombrepuesto}</span>
                                                </div>
                                                <div class="col">
                                                    <span id="email_${index}">${item.email}</span>
                                                </div>
                                                <div class="col">
                                                    <div class="btn-group dropstart text-end">
                                                        <button style="outline: none; box-shadow: none;" role="button" type="button" class="btn btn-sm btn-outline-dark border-0" data-bs-toggle="dropdown">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-horizontal" viewBox="0 0 16 16">
                                                                <path d="M2 8a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                                                            </svg>
                                                        </button>
                                                        <ul class="dropdown-menu">
                                                            
                                                            <li>
                                                                <a 
                                                                    id="btneditar_${index}"
                                                                    data-elindex="${index}"
                                                                    data-elid="${item.id}" 
                                                                    data-nombre="${item.nombre}"
                                                                    data-nombreacordion="acordion_${index}"
                                                                    data-ap="${item.ap}"
                                                                    data-am="${item.am}"
                                                                    data-email="${item.email}"
                                                                    data-puestoid="${item.puesto}"
                                                                    data-puestonombre="${item.nombrepuesto}"
                                                                    data-pagx="${0}"
                                                                    data-pagelid="${0}"
                                                                    data-buscar="true"
                                                                    class="dropdown-item" data-bs-toggle="modal" 
                                                                    data-bs-target="#modalEditar"
                                                                >
                                                                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar
                                                                </a>
                                                            </li>

                                                            <li>
                                                                <a 
                                                                    data-elid="${item.id}" 
                                                                    data-nombre="${nombre}"
                                                                    data-nombreacordion="acordion_${index}"
                                                                    class="dropdown-item"
                                                                    data-bs-toggle="modal"
                                                                    data-bs-target="#modalmensajeeliminar"
                                                                    href="#"
                                                                >
                                                                    <i class="fa fa-ban" aria-hidden="true"></i> Eliminar
                                                                </a>

                                                            </li>

                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        `;

                        if(index == (json.length-1)){

                            $("#divlalistaacordion").empty();
                            $("#divlalistaacordion").animate({ opacity: '0.33' }, 1, function () { 

                                $("#divlalistaacordion").append(cadenab);

                                $('#cuantosresultados').show();
                                $('#cuantosresultados').text(json.length);

                                $("#divlalista").slideDown(250, function () {
                                });

                                $("#divlalistaacordion").animate({ opacity: '1' }, 125, function () {
                                    
                                    $('#elcargador').hide();
                                
                                });

                            });

                            //$("#divlalistaacordion").empty();
                            //$("#divlalistaacordion").append(cadenab);

                        }

                    });

                }
                else{

                    $('#elcargador').hide();

                    elmensaje = '<h5 class="text-dark">No se encontraron resultados</h5>';
                    muestraModalmensajeb(elmensaje);

                }

            });
        //});

    //}
    /* else if(n==0){

        cargainicio();

    } */
}

$('#modalmensajeeliminar').on('show.bs.modal', function (e) {

    // console.log(e.relatedTarget.dataset);

    $("#divlalista").addClass("blur");
    $("#contenidomodalmensajeeliminar").css({ opacity: 0.90 });

    var elmensaje = `<h5 class="text-dark">Esta acción eliminara los datos de <br><strong><span>${e.relatedTarget.dataset.nombre}</span></strong><br> de forma permanente, ¿estás de acuerdo?</h5>`;
    $("#contenidomodalmensajeeliminar").html(elmensaje);

    $('#btnConfirmaeliminar').attr('data-elid', e.relatedTarget.dataset.elid);
    $('#btnConfirmaeliminar').attr('data-index', e.relatedTarget.dataset.index);
    $('#btnConfirmaeliminar').attr('data-nombreacordion', e.relatedTarget.dataset.nombreacordion);
    $('#btnConfirmaeliminar').attr('data-nombre', e.relatedTarget.dataset.nombre);
    
});


$('#modalmensajeeliminar').on('hidden.bs.modal', function (e) {
    
    $("#divlalista").removeClass("blur");
    $("#contenidomodalmensajeeliminar").css({ opacity: 1 });

})

function confirmaEliminar(obj) {

    // console.log(obj)

    var link = `${url}/api/v1/empleados/${obj.elid}`;

    var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
    };

    fetch(link, requestOptions)
        .then(response => response.text())
        .then(result => despuesdeEliminar(result, obj))
        .catch(error => console.log('error', error));

}

function despuesdeEliminar(res, obj){

    //console.log(obj)

    $('#modalmensajeeliminar').modal('hide');

    $(`#${obj.nombreacordion}`).animate({opacity: '0.25'}, 750, function () { 

        $(this).slideUp(750, function () {

            $(this).remove();

            var cuantosquedan = document.getElementById("divlalistaacordion").childElementCount;

            if(cuantosquedan==0){

                elmensaje = '<h5 class="text-dark">No quedan mas elementos para mostrar</h5>';
                muestraModalmensajec(elmensaje);

            }
    
        });

    });

}