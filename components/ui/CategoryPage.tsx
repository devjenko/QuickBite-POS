import CenterContentContainer from "@/components/ui/CenterContentContainer";
import MenuItemCard from "@/components/ui/MenuItemCard";
import prisma from "@/lib/prisma";

const CategoryPage = async ({ category }: { category: string }) => {
  const items = await prisma.menuItem.findMany({
    where: {
      category: category,
    },
  });
  return (
    <CenterContentContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 grid-rows-6 gap-11">
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
