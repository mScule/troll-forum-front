import { FC } from "react";
import { TextField, Box } from "@mui/material";
import { TbSearch as SearchIcon } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

/**
 * For searching content.
 * Uses react router hard handedly by sending queries to API route `/search/`
 *
 * **API V1 Compatible**
 */
const Search: FC = () => {
  const navigate = useNavigate();

  return (
    <TextField
      placeholder="Search"
      variant="outlined"
      sx={{ width: "100%", maxWidth: "30rem" }}
      size="small"
      onChange={(event) =>
        event.target.value
          ? navigate(`/search/${event.target.value}`)
          : navigate("/")
      }
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
