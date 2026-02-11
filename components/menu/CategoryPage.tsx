import CenterContentContainer from "@/components/shared/CenterContentContainer";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import CategoryPageContent from "./CategoryPageContent";
import MenuSidebarLinks from "../sidebar/MenuSidebarLinks";

const CategoryPage = async ({ category }: { category: string }) => {
  const session = await auth();

  // Redirect to login if not authenticated
  if (!session?.user?.id) {
    redirect("/login");
  }

  const items = await prisma.menuItem.findMany({
    where: {
      category: category,
      userId: session.user.id, // Filter by user ID
    },
  });

  return (
    <>
      <div className="overflow-x-auto w-full mb-4 xl:hidden hide-scrollbar">
        <MenuSidebarLinks
          linksClassName="p-4! whitespace-nowrap"
          session={session}
          className="flex-row text-xxxsmall"
        />
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6 auto-rows-max">
        <CategoryPageContent items={items} />
      </div>
    </>
  );
};

export default CategoryPage;
