import * as React from "react";
import Box from "@mui/material/Box";
import { useEffect } from "react";
import axios from "axios";
import { Button, CardActions, Typography } from "@mui/material";

const UserProfile = ({}) => {
/*
  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = () => {
    axios
      .get("http://localhost:3001/v1/user/1")
      .then((res) => {
        console.log(res);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
*/
  const commonStyles = {
    bgcolor: "background.paper",
    border: 2,
  };

  return (
    <div>
      <h1>Profile</h1>
      <Box
        sx={{
          ...commonStyles,
          maxWidth: "350px",
          maxHeight: "350px",
          paddingLeft: "10px",
          borderColor: "darkgrey",
        }}
      >
        <h2>adsf</h2>
        <Typography variant="body2" color="text.secondary">
          #1234
        </Typography>
        <CardActions>
          <Button>Settings</Button>
        </CardActions>
      </Box>
    </div>
  );
};
export default UserProfile;
