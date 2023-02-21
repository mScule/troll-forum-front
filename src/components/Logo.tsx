import { TbMinimize as AppIcon } from "react-icons/tb";
import { red } from "@mui/material/colors";
import { Typography, Stack } from "@mui/material";

import { hide, rotateChildren } from "../styles";

export default function Logo() {
  return (
    <Stack direction="row" alignItems="center">
      <Stack padding={1} sx={rotateChildren(45)}>
        <AppIcon size={32} color={red[500]} />
      </Stack>
      <Typography
        noWrap
        variant={"h1"}
        fontSize={20}
        sx={hide.mobile}
        fontWeight="bold"
      >
        Trolf
      </Typography>
    </Stack>
  );
}
