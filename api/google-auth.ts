/* eslint-disable */
//@ts-nocheck
"use server";

import { signIn } from "@/api/auth";
import { AuthError } from "next-auth";

export async function googleSignIn() {
  try {
    await signIn("google", { redirectTo: "/dashboard" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
}