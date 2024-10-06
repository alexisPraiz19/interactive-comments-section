import { getComment, modify_comment } from "../index.js";

export function change_score(target){
    const $container     = target.parentNode.parentNode.parentNode; // Contenedor "comment-and-replies" o contenedor de las respuestas ("replies")
    const $current_score = target.parentNode.querySelector(".current-score");
    let   score          = parseInt($current_score.textContent);
    let   data_id; // ID del comentario principal
    
    if(target.classList.contains("plus") && score  >= 0) score++;
    else if(target.classList.contains("minus") && score > 0) score--;

    if($container.className == "comment-and-replies"){ 
        data_id = parseInt(target.closest(".comment").dataset.id);

        getComment(data_id).onsuccess = (dbComment) =>{
            let result = dbComment.target.result;
                result.score = score;
                modify_comment(result);
        };
        
    }else if($container.classList.contains("replies")){
        data_id = parseInt(target.closest(".comment-and-replies").firstElementChild.dataset.id) // Esta varible se repite necesariamente 2 veces ya que obtiene el ID del comentario principal de maneras diferentes

        getComment(data_id).onsuccess= (dbComment) =>{
            let result  = dbComment.target.result;
            let comment = result.replies.find(comment =>{return comment.id == target.closest(".comment").dataset.id});
            let index   = result.replies.indexOf(comment);

            comment.score = score;
            result.replies.splice(index, 1, comment);
            modify_comment(result);
            // Este código se ejecuta en caso de cambiar puntos a las "respuestas". Pero primero obtenemos el 
            // comentario principal de la DB, luego localizamos la "respuesta" y cambiamos su "score". Por último modificamos
            // el comentario principal (result) y lo pusheamos en la DB.
        }
    }
    
    // Finalmente
    $current_score.textContent = score;
}