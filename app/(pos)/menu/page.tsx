import EmptyMenuState from "@/components/menu/EmptyMenuState";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

// Cache for 60 seconds
export const revalidate = 60;

const page = async () => {
  const session = await auth();

  //  get the first user category
  const firstMenuItem = await prisma.menuItem.findFirst({
    where: {
      userId: session?.user.id,
    },
    select: {
      category: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  if (!firstMenuItem) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <EmptyMenuState />
      </div>
    );
  }

  // Redirect to the first category
  redirect(`/menu/${firstMenuItem.category}`);
};

export default page;
