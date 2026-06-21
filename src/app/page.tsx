import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default async function RootPage() {
  const hdrs = await headers();
  const acceptLang = hdrs.get("accept-language") ?? "";
  const prefersFa =
    acceptLang.toLowerCase().includes("fa") ||
    acceptLang.toLowerCase().includes("fa-ir");

  redirect(prefersFa ? "/fa" : "/en");
}
