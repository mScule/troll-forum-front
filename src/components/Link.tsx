import { FC } from "react";
import { Link as MUILink } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Props {
  to: string;
  children: string;
}

/**
 * Url link. Uses React router under the hood so the path has to be somewhere in
 * the spa.
 *
 * Attributes:
 *
 * **to** Url to the content.
 */
const Link: FC<Props> = ({ to, children }) => {
  const navigate = useNavigate();

  return (
    <MUILink sx={{ cursor: "pointer" }} onClick={() => navigate(to)}>
      {children}
    </MUILink>
  );
};

export default Link;
