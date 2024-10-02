// Clase para crear estructura de comentarios/respuestas
export class Comment{
    constructor(id, score, user, createdAt, content, replies){
        this.id        = id;
        this.score     = score;
        this.user      = user;
        this.createdAt = createdAt;
        this.content   = content;
        this.replies   = replies;
    }
}