import EmptyMenuState from "@/components/menu/EmptyMenuState";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

const page = async () => {
  const session = await auth();

  // Check if user has any menu items
  const categories = await prisma.menuItem.findMany({
    where: {
      userId: session?.user.id,
    },

    select: {
      category: true,
    },

    distinct: ["category"],
  });

  if (categories.length === 0) {
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <EmptyMenuState />
      </div>
    );
  }

  // If there are categories then redirect to the first one
  redirect(`/menu/${categories[0].category}`);
};

export default page;
