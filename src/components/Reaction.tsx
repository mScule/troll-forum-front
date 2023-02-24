import { FC } from "react";
import {
  Box,
  Card,
  Stack,
  Typography,
  SxProps,
  Divider,
  Tooltip,
} from "@mui/material";
import { TbThumbUp as SelectedIcon } from "react-icons/tb";

type ReactionType = "dull" | "spam" | "troll";

interface ReactionIcon {
  path: string;
  size: number;
  y?: number;
  x?: number;
}
const reactionIcon = (icon: ReactionIcon): SxProps => ({
  overflow: "hidden",
  width: "2.5rem",
  height: "2.5rem",
  backgroundImage: `url(${icon.path})`,
  backgroundSize: icon.size + "px",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  filter: "saturation(20)",
});

import TrollGif from "../assets/troll.gif";
import DullGif from "../assets/dull.gif";
import SpamGif from "../assets/spam.gif";
import switchExpression from "../expression/switchExpression";

interface Props {
  type: ReactionType;
  amount?: number;
  selected?: boolean;
}

const Reaction: FC<Props> = ({ type, amount, selected }) => (
  <Tooltip title={`Reaction: ${type}`}>
    <Card variant="outlined" sx={{ width: "min-content" }}>
      <Stack direction="row">
        <Box
          sx={reactionIcon({
            path: switchExpression(
              type,
              "",
              ["troll", TrollGif],
              ["dull", DullGif],
              ["spam", SpamGif]
            ),
            size: 86,
          })}
        />

        {amount !== undefined && (
          <>
            <Divider orientation="vertical" flexItem />
            <Typography padding={1}>{amount}</Typography>
          </>
        )}
        {selected && (
          <>
            <Divider orientation="vertical" flexItem />

            <Box padding={1} alignItems="center">
              <SelectedIcon />
            </Box>
          </>
        )}
      </Stack>
    </Card>
  </Tooltip>
);
export default Reaction;
