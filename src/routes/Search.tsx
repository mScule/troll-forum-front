import axios from "../setup/axios";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import User from "../types/User";
import Post from "../types/Post";
import CommentType from "../types/Comment";
import ContentWrapper from "../components/ContentWrapper";
import ContentHeader from "../components/ContentHeader";
import { Typography, Stack } from "@mui/material";
import { grey } from "@mui/material/colors";
import ContentLink from "../components/ContentLink";

/**
 * Component that shows the search results made with searchbar.
 */

export async function loader(args: LoaderFunctionArgs) {
  const { searchValue } = args.params;
  const { users, posts, comments } = (
    await axios.get(`search?value=${searchValue}`)
  ).data;
  return { searchValue, users, posts, comments };
}

export default function Search() {
  const { searchValue, users, posts, comments } = useLoaderData() as {
    searchValue: string;
    users: User[];
    posts: Post[];
    comments: CommentType[];
  };

  const userLinks =
    users.length > 0 ? (
      users.map((user) => (
        <ContentLink
          key={`user-link-${user.id}`}
          to={`/user/${user.id}`}
          title={user.username}
          meta={`User #${user.id}`}
        />
      ))
    ) : (
      <Typography variant="body1" fontSize={12} color={grey[500]}>
        No users
      </Typography>
    );

  const postLinks =
    posts.length > 0 ? (
      posts.map((post) => (
        <ContentLink
          key={`post-link-${post.id}`}
          to={`/post/${post.id}`}
          title={post.title}
          meta={`Post #${post.id}`}
        />
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
          key={`comment-link-${comment.id}`}
          to={`/comment/${comment.id}`}
          title={
            comment.body.length > 15
              ? comment.body.substring(0, 14) + "..."
              : comment.body
          }
          meta={`Comment / Reply #${comment.id}`}
        />
      ))
    ) : (
      <Typography variant="body1" fontSize={12} color={grey[500]}>
        No comments
      </Typography>
    );

  return (
    <ContentWrapper>
      <ContentHeader
        title={`Results for "${searchValue}"`}
        meta={`Hits: ${users.length + posts.length + comments.length}`}
      />

      <Stack direction="column" gap={4}>
        <Stack gap={1}>
          <Typography variant="h4" fontSize={18} fontWeight="bold">
            Users
          </Typography>
          {userLinks}
        </Stack>

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
      </Stack>
    </ContentWrapper>
  );
}
