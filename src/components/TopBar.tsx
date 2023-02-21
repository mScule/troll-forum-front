import { FC, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Logo from "./Logo";
import Search from "./Search";
import { TbMenu2 as UserIcon } from "react-icons/tb";

import { centerContent } from "../styles";

interface Props {
  handleMenuButtonClick: () => void;
}

const TopBar: FC<Props> = ({ handleMenuButtonClick }) => {
  return (
    <AppBar position="sticky">
      <Stack
        padding={1}
        direction="row"
        alignItems="center"
        gap={2}
        justifyContent="space-between"
        width="100%"
        maxWidth="60rem"
        sx={centerContent}
      >
        <Logo />
        <Search />
        <IconButton
          sx={{ border: "solid", margin: 1 }}
          size="small"
          onClick={handleMenuButtonClick}
        >
          <UserIcon />
        </IconButton>
      </Stack>
    </AppBar>
  );
};

export default TopBar;
