import { FC, ReactNode } from "react";
import { Card, Stack, Typography, Chip, Divider } from "@mui/material";

import { useNavigate } from "react-router-dom";

interface Props {
  to: string;
  title: string;
  meta?: string;
  children?: ReactNode;
  oneliner?: boolean;
  slim?: boolean;
  buffer?: boolean;
}

/**
 * Link to some content.
 *
 * Attributes:
 * 
 * **to**       Url to the content.\
 * **title**    The title that the link will have.\
 * **meta**     Some meta info about the content. (optional)\
 * **oneliner** Makes the link appear smaller by jamming everything in one line. (optional)\
 * **slim**     Makes title smaller by limiting it to 7 characters long. (optional)\
 * **buffer**   Spaces links content evenly when it's a oneliner. (optional)
 */
const ContentLink: FC<Props> = ({
  title,
  meta,
  to,
  children,
  oneliner,
  slim,
  buffer,
}) => {
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
      <Stack
        direction={oneliner ? "row" : "column"}
        gap={oneliner ? 1 : 0}
        justifyContent={buffer ? "space-between" : "left"}
      >
        <Stack
          direction="row"
          alignContent="left"
          alignItems="center"
          justifyContent="space-between"
          gap={oneliner ? 1 : 0}
        >
          <Typography variant="h3" fontSize={16}>
            <b>
              {slim && title.length > 7 ? title.substring(0, 6) + "..." : title}
            </b>
          </Typography>
          {meta && <Chip label={meta} />}
        </Stack>
        {children && (
          <Stack direction="row" gap={1}>
            <Divider
              sx={{ marginTop: 1, marginBottom: 1 }}
              flexItem
              orientation={oneliner ? "vertical" : "horizontal"}
            />
            {children}
          </Stack>
        )}
      </Stack>
    </Card>
  );
};

export default ContentLink;
