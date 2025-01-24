import type { SVGProps } from "react";

export function Hyperlink(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      height="18"
      width="18"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g fill="currentColor">
        <path
          d="M12.188,16.484c-1.097,0-2.192-.417-3.026-1.252l-2.175-2.175c-1.671-1.671-1.671-4.39,0-6.061,.356-.356,.753-.637,1.19-.846,.371-.18,.82-.021,1,.354,.179,.374,.021,.821-.354,1-.283,.135-.541,.318-.766,.543-1.096,1.096-1.096,2.863-.01,3.95l2.175,2.175c1.086,1.085,2.853,1.086,3.939,0,1.096-1.096,1.096-2.863,.01-3.949l-.931-.931c-.293-.293-.293-.768,0-1.061s.768-.293,1.061,0l.931,.931c1.671,1.671,1.671,4.389,0,6.06-.842,.842-1.944,1.262-3.044,1.262Z"
          fill="currentColor"
        />
        <path
          d="M9.501,11.923c-.28,0-.548-.157-.677-.427-.179-.374-.021-.821,.354-1,.283-.135,.541-.318,.766-.543,1.096-1.096,1.096-2.863,.01-3.95l-2.175-2.175c-1.085-1.085-2.853-1.086-3.939,0-1.096,1.096-1.096,2.863-.01,3.949l.931,.931c.293,.293,.293,.768,0,1.061s-.768,.293-1.061,0l-.931-.931c-1.671-1.671-1.671-4.389,0-6.06,1.682-1.681,4.4-1.682,6.07-.01l2.175,2.175c1.671,1.671,1.671,4.39,0,6.061-.356,.356-.753,.637-1.19,.846-.104,.05-.214,.073-.323,.073Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
