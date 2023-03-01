import { useContext } from "react";
import axios from "../setup/axios";
import {
  LoaderFunctionArgs,
  useLoaderData,
  useRevalidator,
} from "react-router-dom";
import User from "../types/User";
import Post from "../types/Post";
import CommentType from "../types/Comment";
import ContentWrapper from "../components/ContentWrapper";
import ContentHeader from "../components/ContentHeader";
import { Typography, Box, Stack, Divider } from "@mui/material";
import ReactionMeter from "../components/ReactionMeter";
import Comment from "../components/Comment";
import { grey } from "@mui/material/colors";
import ValidatedForm from "../components/ValidatedForm";
import { UserContext } from "../contexts/User";

export async function loader(args: LoaderFunctionArgs) {
  const { commentId } = args.params;
  const comment = (await axios.get(`comment/${commentId}`)).data
    .comment as Post;
  const replies = (await axios.get(`comment/${commentId}/comment`)).data
    .replies;
  const user = (await axios.get(`user/${comment.authorId}`)).data.user;
  return { user, comment, replies };
}

export default function CommentId() {
  const data = useLoaderData() as {
    user: User;
    comment: CommentType;
    replies: CommentType[];
  };

  const revalidator = useRevalidator();
  const user = useContext(UserContext);

  const commentSection =
    data.replies.length > 0 ? (
      <Stack direction="column" gap={2}>
        {data.replies.map((comment) => (
          <Comment key={`comment-#${comment.id}`} comment={comment} />
        ))}
      </Stack>
    ) : (
      <Typography variant="body1" fontSize={12} color={grey[500]}>
        No comments
      </Typography>
    );

  return (
    <Stack direction="column" gap={2} id={`post-${data.comment.id}`}>
      <ContentWrapper>
        <Stack gap={1}>
          <ContentHeader
            title={
              data.comment.postId
                ? `Comment to post #${data.comment.postId}`
                : `Reply to comment #${data.comment.replyId}`
            }
            meta={`${data.user.username} #${data.user.id}`}
          >
          </ContentHeader>
          <ReactionMeter controls to={`/comment/${data.comment.id}/reaction`} />
          <Typography variant="body1">{data.comment.body}</Typography>

          <Divider sx={{ marginBottom: 1, marginTop: 1 }} />

          <Stack gap={1}>
            <Typography variant="h4" fontSize={18} fontWeight="bold">
              Comments
            </Typography>
            {commentSection}
          </Stack>
        </Stack>
      </ContentWrapper>
      {user.isLoggedIn && (
        <Box width="100%">
          <ValidatedForm
            formName="Reply to the comment"
            formSchema={{ reply: { type: "text", rows: 4 } }}
            submitWarning="Like with posts. You can't delete your replies, so think twice what you write 💀"
            submitLabel="Create"
            handleSubmit={async ({ reply }) => {
              await axios.post(`comment/${data.comment.id}/comment`, {
                body: reply,
              });
              revalidator.revalidate();
            }}
          />
        </Box>
      )}
    </Stack>
  );
}
