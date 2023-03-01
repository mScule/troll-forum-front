import { FC, useState, useEffect } from "react";
import axios from "../setup/axios";
import { Stack, Typography, Chip, Box, Card, IconButton } from "@mui/material";
import UserType from "../types/User";
import LoadingPill from "./LoadingPill";
import { TbExternalLink as LinkIcon } from "react-icons/tb";
import ReactionMeter from "./ReactionMeter";
import CommentType from "../types/Comment";
import { useNavigate } from "react-router-dom";

interface Props {
  comment: CommentType;
  parent?: CommentType;
}

const Comment: FC<Props> = ({ comment, parent }) => {
  const navigate = useNavigate();

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
                <Chip label={`${data.user.username} #${data.user.id}`} />
                <Chip
                  label={
                    comment.postId
                      ? `Comment #${comment.id}`
                      : `Reply #${comment.id}`
                  }
                />
                {parent && (
                  <Chip
                    variant="outlined"
                    label={
                      "to " +
                      (parent.postId
                        ? `Comment #${parent.id}`
                        : `Reply #${parent.id}`)
                    }
                  />
                )}
                <IconButton size="small" onClick={() => navigate(`/comment/${comment.id}`)}>
                  <LinkIcon />
                </IconButton>
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
