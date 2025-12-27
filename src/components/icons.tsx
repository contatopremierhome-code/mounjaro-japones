import type { SVGProps } from 'react';

export function TeaBowlIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 14.5c0 2.48-2.69 4.5-6 4.5s-6-2.02-6-4.5" />
      <path d="M4 14.5V9c0-2.2 1.8-4 4-4h8c2.2 0 4 1.8 4 4v5.5" />
      <path d="M12 19v2" />
      <path d="M8 19v2" />
      <path d="M16 19v2" />
    </svg>
  );
}
