import { getComment, modify_comment } from "../index.js";

export function change_score(target){
    const $container     = target.parentNode.parentNode.parentNode; // Contenedor "comment-and-replies" o contenedor de las respuestas ("replies")
    const $current_score = target.parentNode.querySelector(".current-score");
    let   score          = parseInt($current_score.textContent);
    let   comment; // Varible que contiene el comentario de DB al que se le va a modificar el "score"
    
    if(target.classList.contains("plus") && score  >= 0) score++;
    else if(target.classList.contains("minus") && score > 0) score--;

    if($container.className == "comment-and-replies"){ 
        let data_id = parseInt(target.closest(".comment").dataset.id); // ID del comentario principal
        getComment(data_id).addEventListener("success", (dbComment)=>{
            let result = dbComment.target.result;
                result.score = score;
                modify_comment(result.id, result);
        });
        
    }else if($container.classList.contains("replies")){
        let data_id = parseInt(target.closest(".comment-and-replies").firstElementChild.dataset.id) // Esta varible se repite necesariamente 2 veces ya que obtiene el ID del comentario principal de maneras diferentes

        getComment(data_id).addEventListener("success", (dbComment)=>{
            let result  = dbComment.target.result;
            let comment = result.replies.find(comment =>{return comment.id == target.closest(".comment").dataset.id});
            let index   = result.replies.indexOf(comment);

            comment.score = score;
            result.replies.splice(index, 1, comment);
            modify_comment(result.id, result);
            // Este código se ejecuta en caso de cambiar puntos a las "respuestas". Pero primero obtenemos el 
            // comentario principal de la DB, luego localizamos la "respuesta" y cambiamos su "score". Por último modificamos
            // el comentario principal (result) y lo pusheamos en la DB.
        })
    }

    $current_score.textContent = score;
}