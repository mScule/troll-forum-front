import { SxProps } from "@mui/material";

export const hide: Record<string, SxProps> = {
    mobile: {
        display: ["none", "block"]
    }
}

export default function use(...styles: SxProps[]): SxProps {
    let sx = {}
    styles.map(style => sx = { ...sx, ...style })
    return sx
}
