import { FC, useState, useEffect } from "react";
import axios from "../setup/axios";
import { Stack, Typography, Chip, Box, Card } from "@mui/material";
import UserType from "../types/User";
import LoadingPill from "./LoadingPill";
import ReactionType from "../types/Reaction";
import ReactionMeter from "./ReactionMeter";
import CommentType from "../types/Comment";
import { grey } from "@mui/material/colors";
import Link from "./Link";
import HashLink from "./HashLink";

interface Props {
  comment: CommentType;
  parent?: CommentType;
}

const Comment: FC<Props> = ({ comment, parent }) => {
  const [data, setData] = useState<null | {
    user: UserType;
    replies: CommentType[];
  }>(null);

  useEffect(() => {
    (async () => {
      const user = (await axios.get(`user/${comment.authorId}`)).data.user;
      const replies = (await axios.get(`comment/${comment.id}/comment`)).data
        .replies as CommentType[];

      setData({
        user,
        replies,
      });
    })();
  }, []);

  return (
    <Card
      variant="outlined"
      sx={{
        paddingLeft: 2,
        paddingTop: 2,
        paddingBottom: 2,
        borderRight: "none",
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
        ...(comment.replyId
          ? {
              borderTop: "none",
              borderTopLeftRadius: 0,
            }
          : null),
      }}
      id={
        parent
          ? parent.postId
            ? `comment-${parent.id}`
            : `reply-${parent.id}`
          : `post-${comment.postId}`
      }
    >
      <Stack direction="row" gap={2}>
        <Box width="100%">
          {data ? (
            <Stack gap={2}>
              <Stack
                direction="row"
                alignContent="left"
                alignItems="center"
                gap={2}
              >
                <Chip label={data.user.username} />
                <Chip
                  label={
                    comment.postId
                      ? `Comment #${comment.id}`
                      : `Reply #${comment.id}`
                  }
                />
                <HashLink
                  offset={-200}
                  to={
                    parent
                      ? parent.postId
                        ? `#comment-${parent.id}`
                        : `#reply-${parent.id}`
                      : `#post-${comment.postId}`
                  }
                >
                  {"to " +
                    (parent
                      ? parent.postId
                        ? `Comment #${parent.id}`
                        : `Reply #${parent.id}`
                      : `Post #${comment.postId}`)}
                </HashLink>
              </Stack>
              <ReactionMeter controls to={`comment/${comment.id}/reaction`} />

              <Typography variant="body1" fontSize={16}>
                {comment.body}
              </Typography>

              {data.replies.length > 0 &&
                data.replies.map((reply) => (
                  <Comment
                    key={`reply-#${reply.id}`}
                    parent={comment}
                    comment={reply}
                  />
                ))}
            </Stack>
          ) : (
            <LoadingPill message="Loading comment" />
          )}
        </Box>
      </Stack>
    </Card>
  );
};

export default Comment;
