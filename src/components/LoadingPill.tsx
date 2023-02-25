import { FC } from "react";
import { Card, Stack, CircularProgress, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

interface Props {
  message: string;
}

const LoadingPill: FC<Props> = ({ message }) => (
  <Card
    variant="outlined"
    sx={{
      background: "transparent",
      color: grey[500],
      borderRadius: "32px",
      paddingLeft: 0.5,
      paddingRight: 0.5,
    }}
  >
    <Stack direction="row" padding={1} gap={2} alignItems="center">
      <CircularProgress size={16} sx={{ color: grey[500] }} />
      <Typography variant="body2">{message}...</Typography>
    </Stack>
  </Card>
);

export default LoadingPill;
