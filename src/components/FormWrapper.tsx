import { Stack, Box, Card } from "@mui/material";
import { FC } from "react";

interface Props {
  children: React.ReactNode;
}

/**
 * Wrapper for any type of forms.
 */
const FormWrapper: FC<Props> = ({ children }) => (
  <Box
    sx={{
      maxWidth: "45rem",
      marginRight: "auto",
      marginLeft: "auto",
    }}
  >
    <Card sx={{ padding: 3 }}>
      <Stack gap={3}>{children}</Stack>
    </Card>
  </Box>
);

export default FormWrapper;
