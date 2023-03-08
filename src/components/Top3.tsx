import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import {
  Stack,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import { FC, useState, useEffect } from "react";
import switchExpression from "../expression/switchExpression";
import axios from "../setup/axios";
import Comment from "../types/Comment";
import Post from "../types/Post";
import ContentHeader from "./ContentHeader";
import ContentLink from "./ContentLink";
import ContentWrapper from "./ContentWrapper";
import LoadingPill from "./LoadingPill";
import Reaction from "./Reaction";
import { TbChevronDown as ExpandIcon } from "react-icons/all";

interface Props {
  most: "dull" | "spam" | "troll";
}

const Top3: FC<Props> = ({ most }) => {
  const [top3, setTop3] = useState<{
    posts: ({ reactionCount: number } & Post)[];
    comments: ({ reactionCount: number } & Comment)[];
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

  const places = ["🥇", "🥈", "🥉"];

  const postLinks =
    top3 && top3.posts.length > 0 ? (
      top3.posts.map((post, place) => (
        <ContentLink
          oneliner
          buffer
          key={`top3-${most}-${place}-post`}
          to={`/post/${post.id}`}
          title={post.title}
          meta={`Post #${post.id}`}
        >
          <Stack
            direction="row"
            justifyContent="left"
            alignItems="center"
            gap={1}
          >
            <Typography fontSize={32}>{places[place]}</Typography>
            <Reaction type={most} amount={post.reactionCount} />
          </Stack>
        </ContentLink>
      ))
    ) : (
      <Typography variant="body1" fontSize={12} color={grey[500]}>
        No posts
      </Typography>
    );

  const commentLinks =
    top3 && top3.comments.length > 0 ? (
      top3.comments.map((comment, place) => (
        <ContentLink
          oneliner
          buffer
          key={`top3-${most}-${place}-comment`}
          to={`/post/${comment.id}`}
          title={
            comment.body.length > 25
              ? comment.body.substring(0, 24) + "..."
              : comment.body
          }
          meta={`Post #${comment.id}`}
        >
          <Stack
            direction="row"
            justifyContent="left"
            alignItems="center"
            gap={1}
          >
            <Typography fontSize={32}>{places[place]}</Typography>
            <Reaction type={most} amount={comment.reactionCount} />
          </Stack>
        </ContentLink>
      ))
    ) : (
      <Typography variant="body1" fontSize={12} color={grey[500]}>
        No comments
      </Typography>
    );

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
        <Stack gap={1}>
          <Typography variant="h3" fontSize={22} marginBottom={1}>
            <b>📜 Posts</b>
          </Typography>
          <Stack>{postLinks}</Stack>

          <Typography variant="h3" fontSize={22} marginBottom={1}>
            <b>🗯️ Comment</b>
          </Typography>
          <Stack>{commentLinks}</Stack>
        </Stack>
      ) : (
        <LoadingPill message="😴 🥫 🧌..." />
      )}
    </ContentWrapper>
  );
};

export default Top3;
