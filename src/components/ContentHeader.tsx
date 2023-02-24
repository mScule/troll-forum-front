import { FC } from "react";
import { Card, Stack, Typography, Chip } from "@mui/material";

interface Props {
  title: string;
  meta?: string;
}

const ContentHeader: FC<Props> = ({ title, meta }) => (
  <Stack
    direction="row"
    alignContent="left"
    alignItems="center"
    justifyContent="space-between"
    marginBottom={4}
  >
    <Typography variant="h3" fontSize={20}>
      <b>{title}</b>
    </Typography>
    {meta && <Chip label={meta} />}
  </Stack>
);

export default ContentHeader;
