import { FC, useContext } from "react";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  IconButton,
  ListItemButton,
  Typography,
  Switch,
} from "@mui/material";
import {
  TbX as CloseIcon,
  TbUserPlus as RegisterIcon,
  TbLogin as LoginIcon,
  TbMoon as DarkThemeIcon,
  TbSun as LightThemeIcon,
  TbUser as UserIcon,
  TbLogout as LogoutIcon,
} from "react-icons/tb";
import Logo from "./Logo";
import { hide } from "../styles";
import ThemeSelectorContext from "../contexts/ThemeSelector";
import light from "../themes/light";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/User";

interface Props {
  open: boolean;
  handleCloseSidebar: () => void;
}

const Sidebar: FC<Props> = ({ open, handleCloseSidebar }) => {
  const { theme, setTheme } = useContext(ThemeSelectorContext);
  const user = useContext(UserContext);

  const navigate = useNavigate();

  return (
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
      <Box sx={hide.mobile}>
        <List>
          <ListItem>
            <Typography variant="h2" fontSize={20}>
              Menu
            </Typography>
          </ListItem>
        </List>
      </Box>
      {user.isLoggedIn ? (
        <List>
          <ListItem>
            <Typography variant="h3" fontSize={15}>
              User
            </Typography>
          </ListItem>
          <ListItem>
            <ListItemButton sx={{ gap: "1rem" }}>
              <UserIcon />
              User page
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              sx={{ gap: "1rem" }}
              onClick={() => {
                localStorage.removeItem("authorization");
                user.setId(0);
                user.setIsLoggedIn(false);
              }}
            >
              <LogoutIcon />
              Logout
            </ListItemButton>
          </ListItem>
        </List>
      ) : (
        <List>
          <ListItem>
            <Typography variant="h3" fontSize={15}>
              Login / Register
            </Typography>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              sx={{ gap: "1rem" }}
              onClick={() => navigate("/login")}
            >
              <LoginIcon />
              Login
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              sx={{ gap: "1rem" }}
              onClick={() => navigate("/register")}
            >
              <RegisterIcon />
              Register
            </ListItemButton>
          </ListItem>
        </List>
      )}

      <Divider />
      <List>
        <ListItem>
          <Typography variant="h3" fontSize={15}>
            Theme
          </Typography>
        </ListItem>
        <ListItem>
          <DarkThemeIcon />
          <Switch
            checked={theme === light ? true : false}
            onChange={() => setTheme(theme === light ? "dark" : "light")}
          />
          <LightThemeIcon />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
