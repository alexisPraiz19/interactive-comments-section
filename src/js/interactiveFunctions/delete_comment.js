import { delete_comment, getComment, modify_comment } from "../index.js";

export function delete_(target){
   const $main            = document.querySelector(".main");
   const $remove          = target.closest(".comment"); // Respuesta/Comentario
   const $primary_comment = target.closest(".comment").parentNode.previousElementSibling; // Comentario contenedor de respuestas
   const primary_id       = parseInt($primary_comment.dataset.id); // ID comentario principal

   if($remove.dataset.content == "comment"){
      let commentID = parseInt($remove.dataset.id);
      delete_comment(commentID);
      $main.removeChild($remove.parentNode);

   }else{
      const $replies = $remove.parentNode;
            $replies.removeChild($remove);

            getComment(primary_id).addEventListener("success",(e)=>{
               let result = e.target.result;
               let newRepliesArray = result.replies.filter(reply =>{return reply.id != $remove.dataset.id});

               result.replies = newRepliesArray;
               modify_comment(result);
            })
   }
}