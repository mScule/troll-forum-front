import { Divider, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Stack } from "@mui/system";
import { FC, useState, useEffect } from "react";
import switchExpression from "../expression/switchExpression";
import axios from "../setup/axios";
import Comment from "../types/Comment";
import Post from "../types/Post";
import ContentHeader from "./ContentHeader";
import ContentLink from "./ContentLink";
import ContentWrapper from "./ContentWrapper";
import LoadingPill from "./LoadingPill";
import ReactionMeter from "./ReactionMeter";

interface Props {
  most: "dull" | "spam" | "troll";
}

const Top3: FC<Props> = ({ most }) => {
  const [top3, setTop3] = useState<{
    posts: Post[];
    comments: Comment[];
  } | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setTop3((await axios.get(`most/${most}`)).data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <ContentWrapper>
      <ContentHeader
        title={
          "Top 3 most " +
          switchExpression(
            most,
            "",
            ["dull", "😴"],
            ["spam", "🥫"],
            ["troll", "🧌"]
          )
        }
      />
      {top3 ? (
        <Stack>
          <Stack padding={3}>
            <ContentHeader title="Posts" />
            {top3.posts.length > 0 ? (
              top3.posts.map((post) => (
                <ContentLink
                  to={`/post/${post.id}`}
                  title={post.title}
                  meta={`Post #${post.id}`}
                >
                  <ReactionMeter to={`/post/${post.id}/reaction`} />
                </ContentLink>
              ))
            ) : (
              <Typography variant="body1" fontSize={12} color={grey[500]}>
                No posts
              </Typography>
            )}
          </Stack>
          <Divider />
          <Stack padding={3}>
            <ContentHeader title="Comments" />
            {top3.comments.length > 0 ? (
              top3.comments.map((comment) => (
                <ContentLink
                  to={`/comment/${comment.id}`}
                  title={comment.body}
                  meta={`Post #${comment.id}`}
                >
                  <ReactionMeter to={`/comment/${comment.id}/reaction`} />
                </ContentLink>
              ))
            ) : (
              <Typography variant="body1" fontSize={12} color={grey[500]}>
                No comments
              </Typography>
            )}
          </Stack>
        </Stack>
      ) : (
        <LoadingPill message="😴 🥫 🧌..." />
      )}
    </ContentWrapper>
  );
};

export default Top3;
