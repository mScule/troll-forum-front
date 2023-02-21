import { SxProps } from "@mui/material";

export const hide: Record<string, SxProps> = {
    mobile: {
        display: ["none", "block"]
    },
    desktop: {
        display: ["block", "none"]
    }
}

export const row: SxProps = {
    display: "flex",
    flexDirection: "row",
    width: "100%",
}

export const centerContent: SxProps = {
    marginLeft: "auto",
    marginRight: "auto"
}

export const rotateChildren = (degrees: number): SxProps =>
    ({ "& > *": { transform: `rotate(${degrees}deg)` } })


export default function many(...styles: SxProps[]): SxProps {
    let sx = {}
    styles.map(style => sx = { ...sx, ...style })
    return sx
}
