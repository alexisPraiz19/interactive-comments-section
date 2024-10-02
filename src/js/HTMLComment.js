// Función para reusar contenido genérico HTML
export function generic_content({id, score, user, createdAt, content, isCurrentUser, replyingTo}){
    const $comment = document.createElement("DIV"); // Contenedor principal
    
    // Aside
    const $score        = document.createElement("ASIDE");
    const $iconPlus     = document.createElement("SPAN");
    const $currentScore = document.createElement("EM");
    const $iconMinus    = document.createElement("SPAN");

    // Contenido principal
    const $content     = document.createElement("DIV");
    const $info        = document.createElement("DIV");
    const $avatar      = document.createElement("IMG");
    const $userName    = document.createElement("SPAN");
    const $createdAt   = document.createElement("TIME");
    const $textComment = document.createElement("P");
    const $buttons     = isCurrentUser ? `
        <div class="delete-and-edit">
            <button type="button" data-id=${id} class="delete r-button">Delete</button>
            <button type="button" data-id=${id} class="edit r-button">Edit</button>
        </div> 
    ` : `<button type="button" data-id=${id} data-replyingto=${user.username} class="btn-reply r-button">Reply</button>`;

    // Agregando CLASES a sus respectivos elementos
    $comment.classList.add("comment");

    $score.classList.add("score");
    $iconPlus.classList.add("plus");
    $currentScore.classList.add("current-score");
    $iconMinus.classList.add("minus");

    $content.classList.add("content");
    $info.classList.add("info");
    $avatar.classList.add("avatar");
    $userName.classList.add("username");
    $createdAt.classList.add("date", "r-text-color");
    $textComment.classList.add("text-comment", "r-text-color");

    // Agregando CONTENIDO a sus respectivos contenedores
    $currentScore.innerText = score;
    $userName.innerText     = user.username;
    $createdAt.innerText    = createdAt;
    $textComment.innerText  = content;
    $avatar.src             = user.image;
    $avatar.alt             = `avatar ${user.username}`;

    // Agregando ATRIBUTOS a sus respectivos elementos
    $comment.setAttribute("data-id", `${id}`);
    
    // Agregando HIJOS a sus respectivos contenedores
    $score.appendChild($iconPlus);
    $score.appendChild($currentScore);
    $score.appendChild($iconMinus);

    $info.appendChild($avatar);
    $info.appendChild($userName);
    $info.appendChild($createdAt);
    $info.innerHTML += $buttons;

    $content.appendChild($info);
    $content.appendChild($textComment);

    // Contenido adicional/dinámico según valores de los parámetros
    if(isCurrentUser){
        const $currentUser = document.createElement("SPAN");
              $currentUser.classList.add("current-user");
              $currentUser.innerText = "you";

              $info.appendChild($currentUser);
    }

    if(replyingTo != undefined){
        const $replyingTo = document.createElement("SPAN");
              $replyingTo.classList.add("replying-to");
              $replyingTo.innerText = `@${replyingTo} `;

              $comment.setAttribute("data-content", "reply");
              $textComment.insertAdjacentElement("afterbegin", $replyingTo);

    }else $comment.setAttribute("data-content", "comment");
    
    // Retorno
    $comment.appendChild($score);
    $comment.appendChild($content);

    return $comment;
}

// Principal exportación
export function HTMLComment({id, score, user, createdAt, content, replies}){
    // Variables necesarias para extraer información del "current user" almacenado en "sessionStorage" 
    // y alterar "isCurrentUser" según esa información ("falso" por defecto)
    let currentUser_storage = JSON.parse(sessionStorage.getItem("userinfo"));
    let isCurrentUser       = false; 
    user.username == currentUser_storage.username ? isCurrentUser = true : isCurrentUser = false;

    // Creando contenedores principales del commentario
    const $comment_and_replies = document.createElement("DIV");
          $comment_and_replies.classList.add("comment-and-replies");
          $comment_and_replies.appendChild(generic_content({id, score, user, createdAt, content, isCurrentUser}));

    // En caso que el comentario tenga respuestas:
    if(replies.length > 0){
        const $replies = document.createElement("DIV");
              $replies.classList.add("replies", "r-d-grid");
              $comment_and_replies.appendChild($replies);

        for(let reply of replies){
            let {id, score, user, createdAt, content, replyingTo} = reply;

            user.username == currentUser_storage.username ? isCurrentUser = true : isCurrentUser = false;
            $replies.appendChild(generic_content({id, score, user, createdAt, content, isCurrentUser, replyingTo}));
        };
    }
    
    // "Retorno"
    const $main = document.querySelector(".main");
          $main.appendChild($comment_and_replies);
}

// HTML para el formulario de comentario/respuesta
export function from_commentHTML(id, replyingTo){
    return `
    <form class="form-comment to-reply r-d-flex">
      <img src="public/avatars/image-juliusomo.webp" alt="currentUser-image" class="current-user">
      <textarea name="reply comment" placeholder="Reply comment to ${replyingTo}..."></textarea>
      <button type="submit" data-id=${id} data-replyingto=${replyingTo}>Reply</button>
    </form>`;
}