interface Comment {
    id: number;
    body: string;
    replyId?: number;
    postId?: number;
    authorId: number;
}

export default Comment;
