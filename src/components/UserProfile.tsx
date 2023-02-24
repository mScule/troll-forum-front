import { FC } from "react";
import { Divider, Typography, Stack } from "@mui/material";

import ContentWrapper from "./ContentWrapper";
import ContentHeader from "./ContentHeader";
import Link from "./Link";

import Post from "../types/Post";
import ContentLink from "./ContentLink";
import ReactionMeter from "./ReactionMeter";

interface Props {
  visitable?: boolean;
  username: string;
  id: number;
  posts: Post[];
}

const UserProfile: FC<Props> = ({ visitable, username, id, posts }) => {
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
      <Typography variant="body1">No posts</Typography>
    );

  return (
    <ContentWrapper>
      <ContentHeader title={username} meta={`User #${id}`} />
      {visitable && <Link to={`/user/${id}`}>Visit</Link>}

      <Stack direction="column" gap={1}>
        <Typography variant="h4" fontSize={18}>
          Posts
        </Typography>
        {postLinks}
        <Divider flexItem orientation="horizontal" />
        <Typography variant="h4" fontSize={18}>
          Comments
        </Typography>
        <Divider flexItem orientation="horizontal" />
        <Typography variant="h4" fontSize={18}>
          Reactions
        </Typography>
      </Stack>
    </ContentWrapper>
  );
};

export default UserProfile;
