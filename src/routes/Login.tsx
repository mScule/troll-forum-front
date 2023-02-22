import React, { useState } from "react";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import FormWrapper from "../components/FormWrapper";
import PageWrapper from "../components/PageWrapper";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      setValidated(true);
      try {
        await axios.post("user", {
          username,
          password,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <PageWrapper>
      <FormWrapper>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(event) => setUsername(event.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>

          <Grid container>
            <Grid item>
              <Link
                sx={{ cursor: "pointer" }}
                onClick={() => navigate("/register")}
              >
                Don't have an account? Register new one
              </Link>
            </Grid>
          </Grid>
        </Box>
      </FormWrapper>
    </PageWrapper>
  );
}
