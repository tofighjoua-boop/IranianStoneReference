"use client";

import React from "react";

export function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="10"
      viewBox="0 0 18 10"
      className={className}
    >
      <g transform="translate(7118 7599)">
        <rect fill="#a18f7a" width="18" height="2" transform="translate(-7118 -7599)" />
        <rect fill="#a18f7a" width="18" height="2" transform="translate(-7118 -7591)" />
      </g>
    </svg>
  );
}

export function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 28 28"
      className={className}
    >
      <path
        fill="currentColor"
        d="M14,0A14,14,0,1,0,28,14,14,14,0,0,0,14,0Zm3.5,9.333H15.925c-.628,0-.758.258-.758.908v1.426H17.5L17.256,14h-2.09v8.167h-3.5V14H9.333V11.667h2.333V8.974c0-2.064,1.086-3.141,3.534-3.141h2.3Z"
      />
    </svg>
  );
}

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 28 28"
      className={className}
    >
      <path
        fill="currentColor"
        d="M17.3,7.352c-.861-.04-1.12-.047-3.3-.047s-2.438.008-3.3.047c-2.216.1-3.247,1.15-3.348,3.348-.038.861-.048,1.119-.048,3.3s.009,2.438.048,3.3c.1,2.193,1.128,3.247,3.348,3.348.86.039,1.119.048,3.3.048s2.44-.009,3.3-.048c2.214-.1,3.246-1.153,3.347-3.348.039-.861.048-1.119.048-3.3s-.009-2.438-.048-3.3C20.546,8.5,19.515,7.454,17.3,7.352ZM14,18.194A4.194,4.194,0,1,1,18.194,14,4.194,4.194,0,0,1,14,18.194Zm4.359-7.573a.98.98,0,1,1,.981-.98A.98.98,0,0,1,18.359,10.621ZM16.723,14A2.722,2.722,0,1,1,14,11.278,2.722,2.722,0,0,1,16.723,14ZM14,0A14,14,0,1,0,28,14,14,14,0,0,0,14,0Zm8.118,17.367c-.134,2.97-1.787,4.614-4.75,4.751-.872.04-1.15.049-3.368.049s-2.5-.009-3.367-.049c-2.968-.137-4.614-1.784-4.751-4.751-.04-.87-.049-1.149-.049-3.367s.009-2.5.049-3.367c.137-2.968,1.784-4.614,4.751-4.749.872-.041,1.149-.05,3.367-.05s2.5.009,3.368.05c2.963.135,4.616,1.778,4.75,4.749.04.87.049,1.149.049,3.367S22.158,16.5,22.118,17.367Z"
      />
    </svg>
  );
}

export function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      className={className}
    >
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
      <line x1="15.5" y1="15.5" x2="23" y2="23" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function ArrowDownIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="8"
      viewBox="0 0 15 8"
      fill="none"
      className={className}
    >
      <path d="M1 1L7.5 7L14 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className={className}
    >
      <line x1="1" y1="1" x2="13" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="13" y1="1" x2="1" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
