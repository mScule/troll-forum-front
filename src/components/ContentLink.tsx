import { FC, ReactNode } from "react";
import { Box, Card, Stack, Typography, Chip, Divider } from "@mui/material";

import { useNavigate } from "react-router-dom";

interface Props {
  to: string;
  title: string;
  meta?: string;
  children?: ReactNode;
}

const ContentLink: FC<Props> = ({ title, meta, to, children }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        cursor: "pointer",
        marginBottom: 1,
        padding: 1,
      }}
      onClick={() => navigate(to)}
    >
      <Stack direction="row" alignContent="left" alignItems="center" justifyContent="space-between">
        <Typography variant="h3" fontSize={20}>
          <b>{title}</b>
        </Typography>
        {meta && <Chip label={meta} />}
      </Stack>
      {children && (
        <>
          <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
          {children}
        </>
      )}
    </Card>
  );
};

export default ContentLink;
