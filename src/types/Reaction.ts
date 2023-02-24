interface Reaction {
    id: number;
    type: "DULL" | "TROLL" | "SPAM";
    userId: number;
    commentId?: number;
    postId?: number;
}

export default Reaction;
