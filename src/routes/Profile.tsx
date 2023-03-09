import axios from "../setup/axios";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import UserProfile from "../components/UserProfile";
import User from "../types/User";
import Post from "../types/Post";
import Reaction from "../types/Reaction";
import Comment from "../types/Comment";

/**
 * Component for showing users at dynamic /:user-id path.
 */

export async function loader(args: LoaderFunctionArgs) {
  const { userId } = args.params;

  const user = (await axios.get(`user/${userId}`)).data.user;
  const posts = (await axios.get(`user/${userId}/post`)).data.posts;
  const comments = (await axios.get(`user/${userId}/comment`)).data.comments;
  const reactions = (await axios.get(`user/${userId}/reaction`)).data.reactions;

  return { user, posts, comments, reactions };
}

export default function Profile() {
  const data = useLoaderData() as {
    user: User;
    posts: Post[];
    comments: Comment[];
    reactions: Reaction[];
  };

  return (
    <UserProfile
      username={data.user.username}
      id={data.user.id}
      posts={data.posts}
      comments={data.comments}
      reactions={data.reactions}
    />
  );
}
