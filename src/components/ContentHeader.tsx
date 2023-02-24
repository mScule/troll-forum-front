import { FC } from "react";
import { Stack, Typography, Chip, Divider } from "@mui/material";

interface Props {
  title: string;
  meta?: string;
}

const ContentHeader: FC<Props> = ({ title, meta }) => (
  <>
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
    <Divider orientation="horizontal" sx={{ marginTop: 2, marginBottom: 2 }} />
  </>
);

export default ContentHeader;
