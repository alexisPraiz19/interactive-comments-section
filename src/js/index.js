import "../css/index.css"; // Estilos CSS para toda la página

import { main_events } from "./main_events.js";
import { HTMLComment } from "./HTMLComment.js"; // Dinamic HTML

// Función para recuperar los datos del JSON y "logearlos" en database
async function set_data(){
    const request  = await fetch("data.json");
    const response = await request.json();
    for(let comment of response.comments){ log_comments(comment) }
}

// Esta función se llama asímisma para que se ejecute apenas se corra el programa sin necesidad de llamarla.
// Establece los datos del "currentUser" en el SessionStorage para que podamos hacer uso de esa información luego.
(function setCurrentUser(){
    fetch("data.json")
     .then(res => res.json()
      .then(res => sessionStorage.setItem("userinfo", JSON.stringify(res.currentUser))));
}());

// Creación/apertura de la base de datos "comments"
const IDBRequest =  indexedDB.open("comments", 1);

// Creación de un almacen de datos/tabla para la base
IDBRequest.addEventListener("upgradeneeded", ()=>{
    const database = IDBRequest.result;
    database.createObjectStore("comment", { keyPath: "id" });

    IDBRequest.addEventListener("success", ()=>{
        set_data();
        read_database();
    }) // Este código "logea" y "lee" los comentarios en la database una vez creada
});

IDBRequest.addEventListener("success", ()=>{read_database()});

// Función que permite abrir una "transación" en la database
function open_transaction(format){
    const database         = IDBRequest.result;
    const IDBtransaction   = database.transaction("comment", format);
    const trans_permission = IDBtransaction.objectStore("comment");

    return trans_permission;
}

// Función para "leer" datos del "almacen de datos/tabla" (comment)
export function read_database(){
    const cursor = open_transaction("readonly").openCursor();
    
    cursor.addEventListener("success", ()=>{
        if(cursor.result){
            HTMLComment(cursor.result.value);
            cursor.result.continue();
        }else{
            console.log("todos los datos fueron leídos")
        }
    });
}

// Agregando comentario en DB (formato Object)
export function log_comments(comment){open_transaction("readwrite").add(comment)}

// Función para modidicar un comentario de DB
export function modify_comment(comment){open_transaction("readwrite").put(comment)}

// Función para obtener comentarios de la DB
export function getComment(key){
    if (key != undefined) return open_transaction("readonly").get(key);
    else return open_transaction("readonly").getAll();
}

// Función para eliminar commentarios
export function delete_comment(key){open_transaction("readwrite").delete(key)}