import CenterContentContainer from "@/components/shared/CenterContentContainer";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import CategoryPageContent from "./CategoryPageContent";

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
    <CenterContentContainer className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6 auto-rows-max ">
      <CategoryPageContent items={items} />
    </CenterContentContainer>
  );
};

export default CategoryPage;
