import React, {useEffect} from "react";
import axios from "axios";
import {Box, Typography} from "@mui/material";
import Stack from "@mui/material/Stack";

const PostContainer = () => {

    const [posts, setPost] = React.useState([]);

    useEffect(() => {
        fetchPosts()
    }, [])

    const fetchPosts = () => {
        axios.get('http://localhost:3001/v1/post')
            .then((res) => {
                setPost(res.data.posts)
            })
            .catch((err) => {
                console.log("Error with posts:" + err)
            })
    }

    const commonStyles = {
        borderRadius: 2
    }

    return (
        <Box className="postContainer"
             sx={{display: "flex", justifyContent: "space-around", margin: "auto"}}>
            <Stack spacing={3}>
                {posts.map((post) => (
                    <Box sx={{...commonStyles, backgroundColor: "#333333", minWidth: "550px", minHeight: "250px"}}
                         key={post.id}>
                        <Typography style={{margin: "10px"}} variant="h4">{post.title}</Typography>
                        <Typography style={{marginLeft: "10px"}} variant="body2"
                                    color="text.secondary">#{post.authorId}</Typography>
                        <Typography style={{marginLeft: "10px"}} variant="body2"
                                    color="text.secondary">{post.date}</Typography>
                        <Typography style={{marginLeft: "10px", marginTop: "10px"}}>{post.body}</Typography>
                    </Box>
                ))}
            </Stack>
        </Box>
    )


}

export default PostContainer;