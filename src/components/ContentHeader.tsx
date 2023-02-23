import { FC } from "react";
import { Card, Stack, Typography, Chip } from "@mui/material";

interface Props {
  title: string;
  meta?: string;
}

const ContentHeader: FC<Props> = ({ title, meta }) => (
  <Card
    sx={{ marginBottom: 1, padding: 1, width: "fit-content" }}
    variant="outlined"
  >
    <Stack direction="row" alignContent="left" alignItems="center" gap={5}>
      <Typography variant="h3" fontSize={20}>
        <b>{title}</b>
      </Typography>
      {meta && <Chip label={meta} />}
    </Stack>
  </Card>
);

export default ContentHeader;
