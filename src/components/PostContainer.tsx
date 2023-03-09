import React, { useEffect } from "react";
import axios from "axios";
import { Box, Card, Typography, IconButton } from "@mui/material";
import { TbExternalLink as LinkIcon } from "react-icons/tb";
import Stack from "@mui/material/Stack";
import Post from "../types/Post";
import { useNavigate } from "react-router-dom";
import ContentWrapper from "./ContentWrapper";
import ContentHeader from "./ContentHeader";
import Top3 from "./Top3";

/*
PostContainer fetches posts from database and displays them on the "front-page".
The fetchPosts() fetches the posts from the database with axios. The posts are then used by React.useState.
useEffect calls the fetchPosts() whenever this class is called.
 */

const PostContainer = () => {
  const [posts, setPost] = React.useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios
      .get("http://localhost:3001/v1/post")
      .then((res) => {
        setPost(res.data.posts);
      })
      .catch((err) => {
        console.log("Error with posts: " + err);
      });
  };

  return (
    <Stack gap={3}>
      <Top3 most="troll" />
      <Top3 most="spam" />
      <Top3 most="dull" />

      <ContentWrapper>
        <ContentHeader title="Posts" />

        <Stack gap={3}>
          {posts.map((post) => (
            <Card key={post.id}>
              <Box padding={2}>
                <ContentHeader title={post.title} meta={`#${post.id}`}>
                  {new Date(post.date).toLocaleString("en-GB")}
                </ContentHeader>
                <Typography
                  style={{ marginLeft: "10px" }}
                  variant="body2"
                  color="text.secondary"
                ></Typography>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="right"
                  gap={1}
                >
                  <Typography>Visit post</Typography>
                  <IconButton
                    size="small"
                    sx={{ width: "fit-content" }}
                    onClick={() => navigate(`/post/${post.id}`)}
                  >
                    <LinkIcon />
                  </IconButton>
                </Stack>
                <Typography style={{ marginLeft: "10px", marginTop: "10px" }}>
                  {post.body}
                </Typography>
              </Box>
            </Card>
          ))}
        </Stack>
      </ContentWrapper>
    </Stack>
  );
};

export default PostContainer;
