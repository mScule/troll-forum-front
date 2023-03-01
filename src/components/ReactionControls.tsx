import { FC } from "react";
import {
  Card,
  IconButton,
  Stack,
  SxProps,
  CircularProgress,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";

interface Props {
  handleClick: (type: "dull" | "spam" | "troll") => Promise<void>;
  selected?: "dull" | "spam" | "troll";
  pending?: boolean;
}

const ReactionControls: FC<Props> = ({ handleClick, selected, pending }) => {
  const dullIcon = "😴";
  const spamIcon = "🥫";
  const trollIcon = "🧌";

  const iconStyle: SxProps = { transform: "translateY(-1px)" };
  const selectedStyle: SxProps = { border: "solid", color: grey[500] };

  return (
    <Card
      sx={{ borderRadius: 100, height: "fit-content", width: "fit-content" }}
    >
      <Stack direction="row" alignItems="center" gap={1}>
        {pending ? (
          <CircularProgress size={35} sx={{ padding: 1, color: grey[500] }} />
        ) : (
          <IconButton
            size="small"
            {...(selected === "dull" ? { sx: selectedStyle } : null)}
            onClick={() => handleClick("dull")}
          >
            <Box sx={iconStyle}>{dullIcon}</Box>
          </IconButton>
        )}

        {pending ? (
          <CircularProgress size={35} sx={{ padding: 1, color: grey[500] }} />
        ) : (
          <IconButton
            size="small"
            {...(selected === "spam" ? { sx: selectedStyle } : null)}
            onClick={() => handleClick("spam")}
          >
            <Box sx={iconStyle}>{spamIcon}</Box>
          </IconButton>
        )}

        {pending ? (
          <CircularProgress size={35} sx={{ padding: 1, color: grey[500] }} />
        ) : (
          <IconButton
            size="small"
            {...(selected === "troll" ? { sx: selectedStyle } : null)}
            onClick={() => handleClick("troll")}
          >
            <Box sx={iconStyle}>{trollIcon}</Box>
          </IconButton>
        )}
      </Stack>
    </Card>
  );
};

export default ReactionControls;
