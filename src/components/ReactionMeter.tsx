import { FC, useState, useEffect, useContext } from "react";
import axios from "../setup/axios";

import { Stack, Typography } from "@mui/material";

import Reaction from "./Reaction";
import { grey } from "@mui/material/colors";
import LoadingPill from "./LoadingPill";
import ReactionType from "../types/Reaction";
import ReactionControls from "./ReactionControls";
import { UserContext } from "../contexts/User";
import switchExpression from "../expression/switchExpression";

interface ReactionMeterState {
  dull: number;
  spam: number;
  troll: number;
  reaction?: ReactionType;
}

interface Props {
  to: string;
  controls?: boolean;
}

const ReactionMeter: FC<Props> = ({ to, controls }) => {
  const [reactionCounter, setReactionCounter] =
    useState<null | ReactionMeterState>(null);
  const [reactionPending, setReactionPending] = useState<boolean>(false);

  const user = useContext(UserContext);

  async function updateMeter() {
    try {
      const reactions = (await axios.get(to)).data.reactions as ReactionType[];

      const updated: ReactionMeterState = {
        dull: 0,
        spam: 0,
        troll: 0,
      };

      reactions.forEach((reaction) => {
        if (reaction.userId === user.getId()) {
          updated.reaction = reaction;
        }

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
      console.log(error)
    }
  }

  useEffect(() => {
    (async () => {
      await updateMeter();
    })();
  }, []);

  return (
    <Stack direction="column" gap={1} color={grey[500]}>
      <Typography variant="h4" fontSize={14}>
        Reactions:
      </Typography>
      <Stack
        direction={["column", "row"]}
        gap={2}
        alignItems={["left", "center"]}
      >
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

        {user.getLoginStatus() && controls && (
          <ReactionControls
            selected={switchExpression(
              reactionCounter?.reaction?.type,
              undefined,
              ["DULL", "dull"],
              ["SPAM", "spam"],
              ["TROLL", "troll"]
            )}
            handleClick={async (type) => {
              if (!reactionCounter) {
                return;
              }

              setReactionPending(true);

              if (reactionCounter.reaction) {
                await axios.delete(`/reaction/${reactionCounter.reaction?.id}`);
              }

              await axios.post(to, {
                type: switchExpression(
                  type,
                  "DULL",
                  ["dull", "DULL"],
                  ["spam", "SPAM"],
                  ["troll", "TROLL"]
                ),
              });

              await updateMeter();

              setReactionPending(false);
            }}
            pending={reactionPending}
          />
        )}
      </Stack>
    </Stack>
  );
};

export default ReactionMeter;
