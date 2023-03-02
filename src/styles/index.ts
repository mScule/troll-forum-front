import { SxProps } from "@mui/material";

export const hide: Record<string, SxProps> = {
    mobile: {
        display: ["none", "block"]
    },
    desktop: {
        display: ["block", "none"]
    }
}

export const centerContent: SxProps = {
    marginLeft: "auto",
    marginRight: "auto"
}

export const rotateChildren = (degrees: number): SxProps =>
    ({ "& > *": { transform: `rotate(${degrees}deg)` } })
