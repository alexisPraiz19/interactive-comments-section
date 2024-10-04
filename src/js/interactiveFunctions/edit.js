// Funciones de dependecia
import { getComment, modify_comment } from "../index.js";

// Función principal de exportación
export function edit($target){
    let $content = $target.closest(".info").nextElementSibling;

    if($content.innerText != ""){
        $target.classList.toggle("save");
        $content.classList.remove("content-error");

        if($target.classList.contains("save")){
            // Modificando visualmente el DOM
            $content.setAttribute("contenteditable", "true");
            $content.classList.add("editable");
            $target.innerText = "Save";
        }
        else{
            $content.setAttribute("contenteditable", "false");
            $content.classList.remove("editable");
            $target.innerText = "Edit";
    
            // Modificando DB
            let $comment   = $target.closest(".comment");
            let newContent; 
            let commentID;

            if($comment.dataset.content == "comment"){
                newContent = $content.innerText;
                commentID  = parseInt($comment.dataset.id);
                    
                getComment(commentID).onsuccess = (e)=>{
                    let result = e.target.result;
                        result.content = newContent;
                        modify_comment(result);
                }
            }
            else{
                let removeAt   = $content.querySelector(".replying-to") != null ? $content.querySelector(".replying-to").innerText.length-1 : "";
                    newContent = removeAt != "" ? $content.textContent.slice(removeAt) : $content.textContent;
                    commentID  = parseInt($comment.parentNode.previousElementSibling.dataset.id);
        
                getComment(commentID).onsuccess = (e)=>{
                    let result   = e.target.result;
                    let toModify = result.replies.find(reply => reply.id == $comment.dataset.id);
                        toModify.content = newContent;
                        modify_comment(result);
                }
            } 
        }

    }else{
        alert("No puedes dejar el campo sin texto.");
        $content.classList.add("content-error");
        
        $content.addEventListener("keyup", (e)=>{
            e.target.textContent ? $content.classList.remove("content-error")
            :$content.classList.add("content-error");
        });
    }
}