import { cookies } from "next/headers";

export async function setAuthCookies(token: string) {
  const cookieStore = await cookies();
  const maxAge = 60 * 60 * 24 * 7; // 7 days

  cookieStore.set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV! === "production",
    maxAge: maxAge,
    path: "/",
    sameSite: "strict",
  });
}
