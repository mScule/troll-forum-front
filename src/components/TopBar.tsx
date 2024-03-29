import { FC } from "react";
import AppBar from "@mui/material/AppBar";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Logo from "./Logo";
import Search from "./Search";
import { TbMenu2 as UserIcon } from "react-icons/tb";

import { centerContent } from "../styles";

interface Props {
  searchbar?: boolean;
  handleMenuButtonClick: () => void;
}

/**
 * Topbar component containing the Logo, Searchbar and Menubutton.
 *
 * Attributes:
 *
 * **searchbar** Wether to show the searchbar or not. (optional)
 */
const TopBar: FC<Props> = ({ searchbar, handleMenuButtonClick }) => {
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
        {searchbar && <Search />}
        <IconButton size="small" onClick={handleMenuButtonClick}>
          <UserIcon />
        </IconButton>
      </Stack>
    </AppBar>
  );
};

export default TopBar;
