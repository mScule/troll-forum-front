import Link from "../components/Link";
import { Container, Stack } from "@mui/system";
import { Typography } from "@mui/material";

export default function Error() {
  return (
    <Container sx={{ paddingTop: 4 }}>
      <Stack gap={2}>
        <Typography variant="h1" fontSize={24}>
          Yikes!
        </Typography>
        <Typography variant="body1">
          It seems that the page you were looking for doesn't exist ¯\_(ツ)_/¯
        </Typography>
        <Link to="/">Back to home</Link>
      </Stack>
    </Container>
  );
}
