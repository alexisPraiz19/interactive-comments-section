// Clase para crear estructura de comentarios/respuestas
class Constructor{
    constructor(id, score, user, createdAt, content){
        this.id        = id;
        this.score     = score;
        this.user      = user;
        this.createdAt = createdAt;
        this.content   = content;
    }
}
export class Comment extends Constructor{
    constructor(id, score, user, createdAt, content, replies){
        super(id, score, user, createdAt, content);
        this.replies = replies;
    }
}

export class Reply extends Constructor{
    constructor(id, score, user, createdAt, content, replyingTo){
        super(id, score, user, createdAt, content);
        this.replyingTo = replyingTo;
    }
}