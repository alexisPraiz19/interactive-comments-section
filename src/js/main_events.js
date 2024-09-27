// Funciones interactivas
import { add_comment } from "./interactiveFunctions/add_comment.js";
import { change_score } from "./interactiveFunctions/change_score.js";
import { reply } from "./interactiveFunctions/reply.js";

// Función principal de exportación
export let $main_events = (function(){
    document.querySelector(".main").addEventListener("click", (e)=>{
        let target    = e.target;
        let classList = target.classList;

        if(classList.contains("btn-reply")) reply(target);
        if(classList.contains("plus") || classList.contains("minus")) change_score(target);
        if(target.type == "submit") add_comment(e);
    })
}())