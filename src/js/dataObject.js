// Esta función se reutilizará para crear un objeto con información básica para comentarios y respuestas
export function dataObject($textarea){
    const $main     = document.querySelector(".main");
    const $comments = Array.from($main.querySelectorAll(".comment"));
    let   user      = JSON.parse(sessionStorage.getItem("userinfo"));
    let   score     = 0;
    let   date_instance = new Date();
    let   createdAt = `${date_instance.getDate()}/${date_instance.getMonth()+1}/${date_instance.getFullYear()}`;
    let   content   = $textarea.value;
    let   commentID = [];

    for(let comment of $comments){commentID.push(comment.dataset.id)};
    let generateID = Math.max(...commentID)+1;

    return {generateID, score , user, createdAt, content}
}