import { Box, Card } from "@mui/material";
import { FC } from "react";

interface Props {
  fitContent?: boolean;
  children: React.ReactNode;
}

const ContentWrapper: FC<Props> = ({ fitContent, children }) => (
  <Box
    sx={{
      width: fitContent ? "fit-content" : "100%",
      maxWidth: "45rem",
      marginRight: "auto",
      marginLeft: "auto",
    }}
  >
    <Card sx={{ padding: 3 }}>
      {children}
    </Card>
  </Box>
);

export default ContentWrapper;
