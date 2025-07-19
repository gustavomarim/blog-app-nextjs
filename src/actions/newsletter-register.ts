"use server";

import { NEWSLETTER_REGISTER } from "@/functions/api";

export default async function newsletterRegister(
  _state: unknown,
  formData: FormData
) {
  const email = formData.get("email") as string | null;

  try {
    if (!email) throw new Error("Email is required");

    const { url } = NEWSLETTER_REGISTER();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) throw new Error("Failed to register newsletter");

    return {
      data: await response.json(),
      ok: true,
      error: "",
    };
  } catch (error: unknown) {
    return {
      data: null,
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to register newsletter",
    };
  }
}
