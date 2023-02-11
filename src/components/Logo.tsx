import { TbCloudRain as AppIcon } from "react-icons/tb";
import { red } from "@mui/material/colors";
import { Typography, Stack } from "@mui/material";

import use, { hide } from "../styles";

export default function Logo() {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Stack padding={1}>
        <AppIcon size={32} color={red[500]} />
      </Stack>
      <Typography
        noWrap
        variant={"h1"}
        fontSize={20}
        sx={use(hide.mobile)}
        fontWeight="bold"
      >
        Trollf
      </Typography>
    </Stack>
  );
}
