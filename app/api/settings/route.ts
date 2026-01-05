import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { settingsUpdateSchema } from "@/lib/validations";

// fetch settings
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

// update settings
export async function PUT(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Zod validation
    const parsed = settingsUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", issues: parsed.error },
        { status: 400 }
      );
    }

    const updateData = parsed.data;

    const settings = await prisma.settings.upsert({
      where: { userId: session.user.id },
      update: updateData,
      create: {
        userId: session.user.id,
        ...updateData,
      },
    });

    const { userId, createdAt, updatedAt, ...settingsData } = settings;

    return NextResponse.json(settingsData);
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}
