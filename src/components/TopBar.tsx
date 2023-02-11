import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton  from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import Logo from "./Logo";
import Search from "./Search";
import { TbUser as UserIcon } from "react-icons/tb";

const TopBar = () => {
  return (
    <AppBar position="sticky">
      <Stack
        padding={1}
        direction="row"
        alignItems="center"
        gap={2}
        justifyContent="space-between"
      >
        <Logo />
        <Search />
        <IconButton sx={{ border: "solid", margin: 1 }} size="small">
          <UserIcon />
        </IconButton>
      </Stack>
    </AppBar>
  );
};

export default TopBar;
