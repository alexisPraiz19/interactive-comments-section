// Clase para crear estructura de comentarios/respuestas
export class CommentConstructor{
    constructor(id, score, user, createdAt, content, isCurrentUser){
        this.id        = id;
        this.score     = score;
        this.user      = user;
        this.createdAt = createdAt;
        this.content   = content;
        this.isCurrentUser = isCurrentUser;
    }
}