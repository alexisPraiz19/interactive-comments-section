import { modify_comment, getComment } from "../index.js";
import { generic_content } from "../HTMLComment.js";
import { CommentConstructor } from "./clases.js";

class Reply extends CommentConstructor{
    constructor(id, score, user, createdAt, content, isCurrentUser, replyingTo){
        super(id, score, user, createdAt, content, isCurrentUser);
        this.replyingTo = replyingTo;
    }
}

// Función para agregar comentarios/respuestas
export function add_comment(btn){
    let target = btn.target;

    btn.preventDefault();
    const $add_comment_to = target.parentNode.parentNode; // Contenedor "comment-and-replies" o contenedor de las respuestas ("replies")
    let   classList       = $add_comment_to.classList;    
    let   text_content    = target.previousElementSibling.value;

    // Obteniendo datos de la fecha en la que se escribe el comentario
    let   date_instance  = new Date();
    let   date           = `${date_instance.getDate()}/${date_instance.getMonth()+1}/${date_instance.getFullYear()}`;

    if(text_content != ""){
        let all_id_comments = []; // Variable que contiene todos los "ID" de los comentarios/respuestas
        getComment().addEventListener("success", (dbComments)=>{
            dbComments.target.result.map(comment =>{
                all_id_comments.push(comment.id);
                if(comment.replies.length > 0) for(let reply of comment.replies) all_id_comments.push(reply.id);
            });

            let   dataset = target.dataset;
            let   comment = dbComments.target.result.find(comment =>{return comment.id == dataset.id}); // Varible que contiene el comentario de DB al que se le va responder (puede ser cambiado)

            // Creando objeto para pushear/ modificar comentario de DB
            let   user       = JSON.parse(sessionStorage.getItem("userinfo"));
            const generateID = Math.max(...all_id_comments)+1;
            const reply      = new Reply(generateID, 0, user, date, text_content, true, dataset.replyingto);

            if(classList.contains("comment-and-replies") && $add_comment_to.querySelector(".replies") == null){
                // Agregando contenido HTML para ver respuestas
                const $replies = document.createElement("DIV");
                      $replies.classList.add("replies", "r-d-grid");
                      $replies.appendChild(generic_content(reply));
                      $add_comment_to.appendChild($replies);
            }else{
                if(classList.contains("comment-and-replies")){$add_comment_to.querySelector(".replies").appendChild(generic_content(reply))}
                else{
                    $add_comment_to.appendChild(generic_content(reply));
                    comment = dbComments.target.result.find(comment =>{
                        return comment.replies.some(comment =>{return comment.id == dataset.id})
                    });
                }
            }
            // Pusheando "reply" en "replies" del comentario al que se le va a responder y agregando el cambio en la DB
            comment.replies.push(reply);
            modify_comment(comment.id ,comment);
        });
        
        // Eliminando formulario del Document
        const from = $add_comment_to.querySelector(".form-comment");
        $add_comment_to.removeChild(from);

    }else alert("No puedes agregar un comentario vacío.");
}