
$( document ).ready(function() {
    crearBDBiblio();
    
     $("#botonguardar").click(function(){
        ejecutarTransacion(1);
    });
    $("#botonlistar").click(function(){
        ejecutarTransacion(2);
    });
});


function crearBDBiblio(){
    Mibiblio = openDatabase("BdBiblio3","1.0","Mibiblioteca",2*1024);
        //function onDeviceReady(){
        if(Mibiblio != null){
            //alert("La biblioteca se creo correctamente.");
            Mibiblio.transaction(crearLibros, errorCrearLibros);
            
        }else{
            alert("La biblioteca no ha sido creada. Revise el proceso");
        }
    
}//Fin function crearBDBiblio

function crearLibros(txt){
    txt.executeSql("CREATE TABLE IF NOT EXISTS Libros (autor TEXT NOT NULL, titulo TEXT NOT NULL, resumen TEXT)");
}

function errorCrearLibros(err){
    alert("Error al ejecutar la sentencia de crear libro " + err.code);
}

function ejecutarTransacion(numero){
    switch(numero){
        case 1:
            Mibiblio.transaction(guardaLibro, errorCrearLibros);
        break;
        case 2:
            Mibiblio.transaction(listaLibro, errorCrearLibros);
        break;
        case 3:
            Mibiblio.transaction(borraLibro, errorCrearLibros);
        break;
    }
}//Fin ejecutarTransacion

function guardaLibro(txt){
    var Miautor = $('#Autor').val();
    var Mititulo = $('#Titulo').val();
    var Miresumen = $('#Resumen').val();
    txt.executeSql("INSERT INTO Libros (autor, titulo, resumen) values(?,?,?)",[Miautor, Mititulo, Miresumen]);
    alert("He guardado el libro");
}//Fin guardar libro

function listaLibro(txt){
    txt.executeSql("Select autor, titulo, resumen from Libros",[],function(txt,resultado){
        var nlibros = resultado.rows.length;
        $("#listaLibros").listview();
        for(var i=0;i<nlibros;i++){
            var libro = resultado.rows.item(i);
            $("#listaLibros").append("<li><a><p>"+libro["Titulo"]+"</p><br/><label>"+libro["Autor"]+"</label></a></li>");
        }
        $("#listaLibros").listview("refresh");
    });
}//Fin function listaLibro
