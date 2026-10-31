import type { Metadata } from "next";
import { Bricolage_Grotesque, Fredoka, Nunito_Sans, Caveat } from "next/font/google";
import "./globals.css";
const d = Bricolage_Grotesque({ subsets:["latin"], weight:["700","800"], variable:"--f-display" });
const k = Fredoka({ subsets:["latin"], weight:["600"], variable:"--f-kid" });
const b = Nunito_Sans({ subsets:["latin"], weight:["400","600","700"], variable:"--f-body" });
const h = Caveat({ subsets:["latin"], weight:["600"], variable:"--f-hand" });
export const metadata: Metadata = { title:"Mount Litera Zee School, Hosur · Nursery to Class 5", description:"Nursery to Class 5 school in Hosur, opposite Micro Labs. Book a campus visit.", icons:{ icon:"/images/logo-mlzs.png", apple:"/images/logo-mlzs.png" } };
export default function L({ children }:{children:React.ReactNode}){return <html lang="en" className={`${d.variable} ${k.variable} ${b.variable} ${h.variable}`}><body>{children}</body></html>}
