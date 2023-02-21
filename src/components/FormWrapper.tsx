import { Box } from "@mui/material";
import { FC } from "react";

interface Props {
  children: React.ReactNode;
}

const FormWrapper: FC<Props> = ({ children }) => (
  <Box sx={{ maxWidth: "30rem", marginRight: "auto", marginLeft: "auto" }}>
    {children}
  </Box>
);

export default FormWrapper;
