// Funciones de dependencia
import { modify_comment, getComment } from "../index.js";
import { generic_content } from "../HTMLComment.js";
import { Reply } from "../clases.js";
import { dataObject } from "../dataObject.js";

// Función para agregar respuestas
export function add_reply(event){
    event.preventDefault();
    let $target   = event.target;
    let $textarea = $target.children["reply-comment"];
    
    if($textarea.value != ""){
        // Variables de dependecia
        let $container = $target.parentNode;
        let replyingTo = $target.lastElementChild.dataset.replyingto;
        let {generateID, score, user, createdAt, content} = dataObject($textarea);
        let replyingID;
        const reply = new Reply(generateID, score, user, createdAt, content, replyingTo);
        
        // Deifiniendo REPLYINGID
        $container.classList.contains("comment-and-replies") ? replyingID = parseInt($container.firstElementChild.dataset.id)
        : replyingID = parseInt($container.previousElementSibling.dataset.id);
        
        // Modificando visualmente el DOM
        if($container.querySelector(".replies") == null){
            const $replies = document.createElement("DIV");
                  $replies.classList.add("replies", "r-d-grid");
                  $replies.appendChild(generic_content({generateID, score, user, createdAt, content, isCurrentUser: true, replyingTo}));
                  $container.appendChild($replies);

        }else $container.querySelector(".replies").appendChild(generic_content({generateID, score, user, createdAt, content, isCurrentUser: true, replyingTo}))

        // Modificando DB
        getComment(replyingID).onsuccess = (e)=>{
            let result = e.target.result;
            result.replies.push(reply);
            modify_comment(result);
        }
        
        // Finalmente
        $target.parentNode.removeChild($target);
    }
    else alert("No puedes agregar comentarios vacíos.")
}