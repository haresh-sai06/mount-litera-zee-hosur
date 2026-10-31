import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { paper:"#FBF7F0", paper2:"#F3ECDF", ink:"#14213D", inksoft:"#4A5573", peak:"#1F4FD8", sun:"#FF6B2C", sunshine:"#FFC83D", leaf:"#2FB67C", sky:"#DCE8FF", peach:"#FFE3D3", line:"#E6DCCB" },
    fontFamily: { display:["var(--f-display)"], kid:["var(--f-kid)"], sans:["var(--f-body)"], hand:["var(--f-hand)"] },
    boxShadow: { soft:"0 1px 2px #14213D0F, 0 12px 32px #14213D14", lift:"0 2px 4px #14213D14, 0 24px 48px #14213D1F" },
    borderRadius: { card:"28px" },
  } },
} satisfies Config;
