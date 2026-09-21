"use client";
// app/cases/page.tsx — All Cases (same as overview with slightly different framing)

import { redirect } from "next/navigation";

export default function CasesPage() {
  redirect("/overview");
}
