import { FC } from "react";
import { Divider, Typography, Stack, Box } from "@mui/material";

import ContentWrapper from "./ContentWrapper";
import ContentHeader from "./ContentHeader";
import Link from "./Link";

import Post from "../types/Post";
import ContentLink from "./ContentLink";
import ReactionMeter from "./ReactionMeter";
import ReactionType from "../types/Reaction";
import Comment from "../types/Comment";
import { grey } from "@mui/material/colors";
import Reaction from "./Reaction";
import switchExpression from "../expression/switchExpression";

interface Props {
  visitable?: boolean;
  username: string;
  id: number;
  posts: Post[];
  comments: Comment[];
  reactions: ReactionType[];
}

const UserProfile: FC<Props> = ({
  visitable,
  username,
  id,
  posts,
  comments,
  reactions,
}) => {
  const postLinks =
    posts.length > 0 ? (
      posts.map((post) => (
        <ContentLink
          key={`post-${post.id}`}
          to={`/post/${post.id}`}
          title={post.title}
          meta={`Post #${post.id}`}
        >
          <ReactionMeter to={`post/${post.id}/reaction`} />
        </ContentLink>
      ))
    ) : (
      <Typography variant="body1" fontSize={12} color={grey[500]}>
        No posts
      </Typography>
    );

  const commentLinks =
    comments.length > 0 ? (
      comments.map((comment) => (
        <ContentLink
          key={`comment-${comment.id}`}
          to={`/comment/${comment.id}`}
          title={
            comment.postId
              ? `Comment to post #${comment.postId}`
              : `Reply to comment #${comment.replyId}`
          }
          meta={`Comment #${comment.id}`}
        >
          <Stack direction="column" gap={1}>
            <Typography fontStyle="italic">"{comment.body}"</Typography>
            <ReactionMeter to={`comment/${comment.id}/reaction`} />
          </Stack>
        </ContentLink>
      ))
    ) : (
      <Typography variant="body1" fontSize={12} color={grey[500]}>
        No comments
      </Typography>
    );

  const reactionLinks =
    reactions.length > 0 ? (
      reactions.map((reaction) => (
        <ContentLink
          oneliner
          key={`reaction-${reaction.id}`}
          to={
            reaction.postId
              ? `/post/${reaction.postId}`
              : `/comment/${reaction.commentId}`
          }
          title={
            reaction.postId
              ? `Reaction to post #${reaction.postId}`
              : `Reaction to comment #${reaction.commentId}`
          }
          meta={`Reaction #${reaction.id}`}
        >
          <Reaction
            type={switchExpression(
              reaction.type,
              "dull",
              ["DULL", "dull"],
              ["SPAM", "spam"],
              ["TROLL", "troll"]
            )}
          />
        </ContentLink>
      ))
    ) : (
      <Typography variant="body1" fontSize={12} color={grey[500]}>
        No reactions
      </Typography>
    );

  return (
    <ContentWrapper>
      <ContentHeader title={username} meta={`User #${id}`} />
      {visitable && <Link to={`/user/${id}`}>Visit</Link>}

      <Stack direction="column" gap={4}>
        <Stack gap={1}>
          <Typography variant="h4" fontSize={18} fontWeight="bold">
            Posts
          </Typography>
          {postLinks}
        </Stack>

        <Stack gap={1}>
          <Typography variant="h4" fontSize={18} fontWeight="bold">
            Comments
          </Typography>
          {commentLinks}
        </Stack>

        <Stack gap={1}>
          <Typography variant="h4" fontSize={18} fontWeight="bold">
            Reactions
          </Typography>
          {reactionLinks}
        </Stack>
      </Stack>
    </ContentWrapper>
  );
};

export default UserProfile;
