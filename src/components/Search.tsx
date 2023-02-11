import { FC } from "react";
import { TextField, Box } from "@mui/material";
import { TbSearch as SearchIcon } from "react-icons/tb";

interface Props {
  handleSearch?: (search: string) => void;
}

const Search: FC<Props> = ({ handleSearch }) => {
  return (
    <TextField
      placeholder="Search"
      variant="outlined"
      sx={{ width: "100%", maxWidth: "50rem"}}
      size="small"
      InputProps={{
        startAdornment: (
          <Box marginRight={2} display="flex" alignContent="center">
            <SearchIcon size={16} />
          </Box>
        ),
      }}
    />
  );
};

export default Search;
