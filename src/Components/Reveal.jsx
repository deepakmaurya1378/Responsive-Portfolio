/* eslint-disable react/prop-types */
import { useRef } from "react";
import useInView from "../hooks/useInView";

export default function Reveal({
  as: Tag = "div",
  anim = "fade-up",
  delay = 0,
  duration = 600,
  show,
  className = "",
  style,
  children,
  ...rest
}) {
  const ref = useRef(null);
  const seen = useInView(ref, { threshold: 0.15 });
  const visible = show ?? seen;
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: visible ? undefined : 0,
        animation:
          style?.animation ?? (visible ? `ds-${anim} ${duration}ms cubic-bezier(.2,.8,.2,1) ${delay}ms both` : "none"),
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
