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
  const { postId } = args.params;
  const post = (await axios.get(`post/${postId}`)).data.post as Post;
  const comments = (await axios.get(`post/${postId}/comment`)).data.comments;
  const user = (await axios.get(`user/${post.authorId}`)).data.user;
  return { user, post, comments };
}

export default function PostId() {
  const data = useLoaderData() as {
    user: User;
    post: Post;
    comments: CommentType[];
  };

  const revalidator = useRevalidator();
  const user = useContext(UserContext);

  const commentSection =
    data.comments.length > 0 ? (
      <Stack direction="column" gap={2}>
        {data.comments.map((comment) => (
          <Comment key={`comment-#${comment.id}`} comment={comment} />
        ))}
      </Stack>
    ) : (
      <Typography variant="body1" fontSize={12} color={grey[500]}>
        No comments
      </Typography>
    );

  return (
    <Stack direction="column" gap={2} id={`post-${data.post.id}`}>
      <ContentWrapper>
        <Stack gap={1}>
          <ContentHeader
            title={data.post.title}
            meta={`${data.user.username} #${data.user.id}`}
          >
            <Typography color={grey[500]} variant="body1">
              {new Date(data.post.date).toLocaleString("en-GB")}
            </Typography>
          </ContentHeader>
          <ReactionMeter controls to={`/post/${data.post.id}/reaction`} />
          <Typography variant="body1">{data.post.body}</Typography>

          <Divider sx={{ marginBottom: 1, marginTop: 1 }} />

          <Stack gap={1}>
            <Typography variant="h4" fontSize={18} fontWeight="bold">
              Comments
            </Typography>
            {commentSection}
          </Stack>
        </Stack>
      </ContentWrapper>
      {user.getLoginStatus() && (
        <Box width="100%">
          <ValidatedForm
            formName="Write a comment"
            formSchema={{ comment: { type: "text", rows: 4 } }}
            submitWarning="Like with posts. You can't delete your comments, so think twice what you write 💀"
            submitLabel="Create"
            handleSubmit={async ({ comment }) => {
              await axios.post(`post/${data.post.id}/comment`, {
                body: comment,
              });
              revalidator.revalidate();
            }}
          />
        </Box>
      )}
    </Stack>
  );
}
