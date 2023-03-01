import { useNavigate } from "react-router-dom";
import { Typography, Stack } from "@mui/material";

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
        <Typography fontSize={24} sx={{ transform: "translateY(1px)" }}>
          💢
        </Typography>
      </Stack>
      <Typography noWrap variant={"h1"} fontSize={20} fontWeight="bold">
        Trolf
      </Typography>
    </Stack>
  );
}
