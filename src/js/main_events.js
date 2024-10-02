// Funciones interactivas
import { add_reply } from "./interactiveFunctions/add_reply.js";
import { change_score } from "./interactiveFunctions/change_score.js";
import { reply } from "./interactiveFunctions/reply.js";
import { delete_ } from "./interactiveFunctions/delete_comment.js";

// Función principal de exportación
export let main_events = (function(){
    document.querySelector(".main").addEventListener("click", (e)=>{
        let target    = e.target;
        let classList = target.classList;

        if(classList.contains("btn-reply")) reply(target);
        if(classList.contains("plus") || classList.contains("minus")) change_score(target);
        if(classList.contains("delete")) delete_(target);
    })

    document.querySelector(".main").addEventListener("submit", (e)=>{
        add_reply(e)
    })
}())

// Import dependencies
import { log_comments } from "./index.js";
import { HTMLComment } from "./HTMLComment.js";
import { Comment } from "./interactiveFunctions/clases.js";
import { dataObject } from "./dataObject.js";

export let main_form = (function(){
    document.getElementById("main-form").addEventListener("submit", (e)=>{
        e.preventDefault();
        const $textarea     = e.target.children["add-comment"];

        if($textarea.value != ""){
            let replies = [];
            let {generateID, score, user, date, content} = dataObject($textarea);
            const comment = new Comment(generateID, score, user, date, content, replies);

            HTMLComment(comment);
            log_comments(comment);

        }else alert("No puedes agregar comentarios vacíos.")
    })
}())