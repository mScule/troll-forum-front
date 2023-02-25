import { FC, useState, useEffect } from "react";
import axios from "../setup/axios";
import { Stack, Typography, Chip, Box, Card } from "@mui/material";
import UserType from "../types/User";
import LoadingPill from "./LoadingPill";
import ReactionType from "../types/Reaction";
import ReactionMeter from "./ReactionMeter";
import CommentType from "../types/Comment";
import { grey } from "@mui/material/colors";

interface Props {
  comment: CommentType;
}

const Comment: FC<Props> = ({ comment }) => {
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
      }}
    >
      <Stack direction="row" gap={2}>
        <Box width="100%">
          {data ? (
            <Stack gap={2}>
              <Stack
                direction="row"
                alignContent="left"
                alignItems="center"
                justifyContent="space-between"
              >
                <Chip label={data.user.username} />
                <ReactionMeter to={`comment/${comment.id}/reaction`} />
              </Stack>

              <Typography variant="body1" fontSize={16}>
                {comment.body}
              </Typography>

              {data.replies.length > 0 &&
                data.replies.map((reply) => (
                  <Comment key={`reply-#${reply.id}`} comment={reply} />
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
