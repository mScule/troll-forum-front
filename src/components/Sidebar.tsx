import { FC } from "react";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  IconButton,
  ListItemButton,
  SxProps,
  Typography,
  Switch,
} from "@mui/material";
import {
  TbX as CloseIcon,
  TbUserPlus as RegisterIcon,
  TbLockOpen as LoginIcon,
  TbMoon as DarkThemeIcon,
  TbSun as LightThemeIcon,
} from "react-icons/tb";
import Logo from "./Logo";
import { hide } from "../styles";

interface Props {
  open: boolean;
  handleCloseSidebar: () => void;
}

const Sidebar: FC<Props> = ({ open, handleCloseSidebar }) => (
  <Drawer
    PaperProps={{ sx: { width: ["100%", "15rem"] } }}
    anchor="right"
    open={open}
    onClose={handleCloseSidebar}
  >
    <Box sx={hide.desktop}>
      <List disablePadding>
        <ListItem
          disableGutters
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 1,
          }}
        >
          <Logo />
          <IconButton onClick={handleCloseSidebar}>
            <CloseIcon />
          </IconButton>
        </ListItem>
      </List>
      <Divider />
    </Box>
    <List>
      <ListItem>
        <Typography variant="h2" fontSize={20}>
          Login / Register
        </Typography>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton sx={{ gap: "1rem" }}>
          <LoginIcon />
          Login
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding>
        <ListItemButton sx={{ gap: "1rem" }}>
          <RegisterIcon />
          Register
        </ListItemButton>
      </ListItem>
    </List>
    <Divider />
    <List>
      <ListItem>
        <Typography variant="h2" fontSize={20}>
          Theme
        </Typography>
      </ListItem>
      <ListItem>
        <DarkThemeIcon />
        <Switch />
        <LightThemeIcon />
      </ListItem>
    </List>
  </Drawer>
);

export default Sidebar;
