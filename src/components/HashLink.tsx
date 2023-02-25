import { FC } from "react";
import { HashLink as RRHashLink } from "react-router-hash-link";

function scrollWithOffset(element: HTMLElement, offset: number) {
  const y = element.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top: y + offset, behavior: "smooth" });
}

interface Props {
  to: string;
  offset?: number;
  children: string;
}

const HashLink: FC<Props> = ({ to, offset, children }) => (
  <RRHashLink
    to={to}
    smooth
    scroll={(element) => scrollWithOffset(element, offset ? offset : 0)}
  >
    {children}
  </RRHashLink>
);

export default HashLink;
