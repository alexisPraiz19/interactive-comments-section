// Funciones interactivas
import { add_comment } from "./interactiveFunctions/add_comment.js";
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
        if(target.type == "submit") add_comment(e);
    })
}())

// Import dependencies
import { log_comments } from "./index.js";
import { HTMLComment } from "./HTMLComment.js";
import { Comment } from "./interactiveFunctions/clases.js";

export let main_form = (function(){
    document.getElementById("main-form").addEventListener("submit", (e)=>{
        e.preventDefault();
        const $textarea     = e.target.children["add-comment"];
        let   date_instance = new Date();

        if($textarea.value != ""){
            const $main     = document.querySelector(".main");
            const $comments = Array.from($main.querySelectorAll(".comment"));
            let   user      = JSON.parse(sessionStorage.getItem("userinfo"));
            let   date      = `${date_instance.getDate()}/${date_instance.getMonth()+1}/${date_instance.getFullYear()}`;
            let   content   = $textarea.value;
            let   replies   = [];
            let   commentID = [];

            for(let comment of $comments){commentID.push(comment.dataset.id)};
            let generateID = Math.max(...commentID)+1;

            const comment = new Comment(generateID, 0, user, date, content, replies);
            HTMLComment(comment);
            log_comments(comment);

        }else alert("No puedes agregar comentarios vacíos.")
    })
}())