import { FC, useState, useEffect, useContext } from "react";
import axios from "../setup/axios";

import { Stack, Typography } from "@mui/material";

import Reaction from "./Reaction";
import { grey } from "@mui/material/colors";
import LoadingPill from "./LoadingPill";
import ReactionType from "../types/Reaction";
import ReactionControls from "./ReactionControls";
import { UserContext } from "../contexts/User";

interface Props {
  to: string;
  controls?: boolean;
}

const ReactionMeter: FC<Props> = ({ to, controls }) => {
  const [reactionCounter, setReactionCounter] = useState<null | {
    dull: number;
    spam: number;
    troll: number;
  }>(null);

  const user = useContext(UserContext);

  async function updateMeter() {}

  useEffect(() => {
    (async () => {
      try {
        const reactions = (await axios.get(to)).data
          .reactions as ReactionType[];

        const updated = {
          dull: 0,
          spam: 0,
          troll: 0,
        };

        reactions.forEach((reaction) => {
          switch (reaction.type) {
            case "DULL":
              updated.dull++;
              break;
            case "SPAM":
              updated.spam++;
              break;
            case "TROLL":
              updated.troll++;
              break;
          }
        });

        setReactionCounter(updated);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <Stack direction="column" gap={1} color={grey[500]}>
      <Typography variant="h4" fontSize={14}>
        Reactions:
      </Typography>
      <Stack direction={["column", "row"]} gap={2} alignItems="center">
        {reactionCounter ? (
          <>
            {reactionCounter.dull !== 0 && (
              <Reaction type="dull" amount={reactionCounter.dull} />
            )}
            {reactionCounter.spam !== 0 && (
              <Reaction type="spam" amount={reactionCounter.spam} />
            )}
            {reactionCounter.troll !== 0 && (
              <Reaction type="troll" amount={reactionCounter.troll} />
            )}
            {reactionCounter.dull === 0 &&
              reactionCounter.spam === 0 &&
              reactionCounter.troll === 0 && (
                <Typography variant="body1" fontSize={12}>
                  No reactions
                </Typography>
              )}
          </>
        ) : (
          <LoadingPill message="Loading" />
        )}

        {user.isLoggedIn && controls && (
          <ReactionControls handleClick={async () => {}} />
        )}
      </Stack>
    </Stack>
  );
};

export default ReactionMeter;
