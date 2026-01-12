import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { AppError, handleApiError } from "@/lib/errors";

// fetch settings (PUT is handled by server action: updateSettings)
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      throw new AppError("Unauthorized", 401, "UNAUTHORIZED");
    }

    // get or create settings for the user
    let settings = await prisma.settings.findUnique({
      where: { userId: session.user.id },
    });

    // if no settings exist, create default settings
    if (!settings) {
      settings = await prisma.settings.create({
        data: {
          userId: session.user.id,
        },
      });
    }
    // remove sensitive fields before sending to client
    const { userId, createdAt, updatedAt, ...settingsData } = settings;

    return NextResponse.json(settingsData);
  } catch (error) {
    return handleApiError(error);
  }
}
