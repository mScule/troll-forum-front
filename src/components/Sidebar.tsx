import { FC } from "react";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  IconButton,
  SxProps,
} from "@mui/material";
import { Link } from "@mui/material";
import { TbX as CloseIcon } from "react-icons/tb";
import { hide } from "../styles";

interface Props {
  open: boolean;
  handleCloseSidebar: () => void;
}

const contentToRight: SxProps = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "right",
};

const Sidebar: FC<Props> = ({ open, handleCloseSidebar }) => (
  <Drawer
    PaperProps={{ sx: { width: ["100%", "15rem"] } }}
    anchor="right"
    open={open}
    onClose={handleCloseSidebar}
  >
    <Box sx={hide.desktop}>
      <List>
        <ListItem sx={contentToRight}>
          <IconButton onClick={handleCloseSidebar}>
            <CloseIcon />
          </IconButton>
        </ListItem>
      </List>
      <Divider />
    </Box>
    <List>
      <ListItem sx={contentToRight}>
        <Link href="login">Login</Link>
      </ListItem>
      <ListItem sx={contentToRight}>
        <Link href="register">Register</Link>
      </ListItem>
    </List>
  </Drawer>
);

export default Sidebar;
