"use server";

import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { settingsUpdateSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { SettingsData } from "@/types/settings";

// Update settings action
export async function updateSettings(data: SettingsData) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const parsed = settingsUpdateSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid settings data");
  }

  const settings = await prisma.settings.upsert({
    where: { userId: session.user.id },
    update: parsed.data,
    create: {
      userId: session.user.id,
      ...parsed.data,
    },
  });

  revalidatePath("/settings");
  return settings;
}

