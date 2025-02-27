"use server";
import { revalidatePath } from "next/cache";

export async function reFetchResource(path: string) {
  revalidatePath(path);
}
