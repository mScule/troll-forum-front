import { FC, ReactNode } from "react";
import { Stack, Typography, Chip, Divider } from "@mui/material";

interface Props {
  title: string;
  meta?: string;
  children?: ReactNode;
}

/**
 * Header for any type of content that should have a heading.
 *
 * Attributes:
 * 
 * **title** The title that the header will have.\
 * **meta**  Some meta info about the content. (optional)
 */
const ContentHeader: FC<Props> = ({ title, meta, children }) => (
  <Stack direction="column" gap={2} marginBottom={1.5}>
    <Stack
      direction="row"
      alignContent="left"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography variant="h3" fontSize={22}>
        <b>{title}</b>
      </Typography>

      {meta && <Chip label={meta} />}
    </Stack>
    {children && children}
    <Divider orientation="horizontal"/>
  </Stack>
);

export default ContentHeader;
