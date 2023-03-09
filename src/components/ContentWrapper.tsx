import { Box, Card } from "@mui/material";
import { FC } from "react";

interface Props {
  fitContent?: boolean;
  children: React.ReactNode;
}

/**
 * Wrapper for any type of content.
 *
 * Attributes:
 * 
 * **fitContent** Makes the wrapper only as wide as its content. (optional)
 */
const ContentWrapper: FC<Props> = ({ fitContent, children }) => (
  <Box
    sx={{
      width: fitContent ? "fit-content" : "100%",
      maxWidth: "45rem",
      marginRight: "auto",
      marginLeft: "auto",
    }}
  >
    <Card variant="outlined" sx={{ padding: 3 }}>
      {children}
    </Card>
  </Box>
);

export default ContentWrapper;
