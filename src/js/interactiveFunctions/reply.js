// Función para añadir visualmente en el "Document", una caja (formulario) para escribir un Comentario/Respuesta
import { from_commentHTML } from "../HTMLComment";

export function reply(target){
    const main       = target.closest(".main");
    const comment    = target.closest(".comment");
    let   replyingTo = target.dataset.replyingto;
    let   comment_id = target.dataset.id;
    
    if(main.querySelector(".form-comment") == null) comment.parentNode.innerHTML += from_commentHTML(comment_id, replyingTo);
}