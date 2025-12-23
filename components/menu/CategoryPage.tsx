import CenterContentContainer from "@/components/shared/CenterContentContainer";
import MenuItemCard from "./MenuItemCard";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

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
    <CenterContentContainer className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6 auto-rows-max">
      {items.map((item) => (
        <MenuItemCard
          name={item.name}
          key={item.id}
          price={item.price}
          description={item.description}
          image={
            item.image ||
            "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeTB5emRxdHViYzU1ZmswcHR2YnU0eHBtMWl1NWNhMDNkcHB3NDY0diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3zhxq2ttgN6rEw8SDx/giphy.gif"
          }
        />
      ))}
    </CenterContentContainer>
  );
};

export default CategoryPage;
