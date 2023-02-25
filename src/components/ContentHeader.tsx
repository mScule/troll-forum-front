import { FC, ReactNode } from "react";
import { Stack, Typography, Chip, Divider } from "@mui/material";

interface Props {
  title: string;
  meta?: string;
  children?: ReactNode;
}

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
