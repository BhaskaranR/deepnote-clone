import type { SVGProps } from "react";

export function Flag2(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="currentColor">
        <path
          d="M3.75,3.25H13.25c.552,0,1,.448,1,1v5c0,.552-.448,1-1,1H3.75"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
        <line
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          x1="3.75"
          x2="3.75"
          y1="1.75"
          y2="16.25"
        />
      </g>
    </svg>
  );
}
