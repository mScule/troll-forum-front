import { useNavigate } from "react-router-dom";
import { Typography, Stack } from "@mui/material";
import { ReactComponent as AngerIcon } from "../assets/anger.svg";
import { Box } from "@mui/system";

/**
 * Trolf logo. Works also as link to the feed.
 */
export default function Logo() {
  const navigate = useNavigate();

  return (
    <Stack
      direction="row"
      alignItems="center"
      onClick={() => navigate("/")}
      sx={{ cursor: "pointer" }}
    >
      <Stack padding={1}>
        <Box height={24} width={24}>
          <AngerIcon />
        </Box>
      </Stack>
      <Typography noWrap variant={"h1"} fontSize={20} fontWeight="bold">
        Trolf
      </Typography>
    </Stack>
  );
}
