import { FC } from "react";
import Link from "../components/Link";
import { Stack } from "@mui/system";
import { Typography } from "@mui/material";
import ContentWrapper from "../components/ContentWrapper";

/**
 * Generic but partly configurable Error message "page" component.
 */

interface Props {
  title: string;
  message: string;
}

const Error: FC<Props> = ({ title, message }) => {
  return (
    <ContentWrapper>
      <Stack gap={2}>
        <Typography variant="h1" fontSize={24}>
          {title}
        </Typography>
        <Typography variant="body1">{message}</Typography>
        <Link to="/">Back to feed</Link>
      </Stack>
    </ContentWrapper>
  );
};

export default Error;
