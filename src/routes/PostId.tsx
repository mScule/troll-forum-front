import axios from "../setup/axios";
import { Stack } from "@mui/system";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import UserProfile from "../components/UserProfile";
import User from "../types/User";
import Post from "../types/Post";
import Reaction from "../types/Reaction";
import Comment from "../types/Comment";
import ContentWrapper from "../components/ContentWrapper";
import ContentHeader from "../components/ContentHeader";
import { Typography } from "@mui/material";
import ReactionMeter from "../components/ReactionMeter";

export async function loader(args: LoaderFunctionArgs) {
  const { postId } = args.params;
  const post = (await axios.get(`post/${postId}`)).data.post as Post;
  const user = (await axios.get(`user/${post.authorId}`)).data.user;
  return { user, post };
}

export default function PostId() {
  const data = useLoaderData() as {
    user: User;
    post: Post;
  };

  return (
    <ContentWrapper>
      <Stack gap={1}>
        <ContentHeader title={data.post.title} meta={data.user.username} />
        <ReactionMeter to={`/post/${data.post.id}/reaction`} />
        <Typography variant="body1">{data.post.body}</Typography>
      </Stack>
    </ContentWrapper>
  );
}
