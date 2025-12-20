import prisma from "@/lib/prisma";
import SideBarNavLink from "../ui/SidebarNavLink";

const MenuSidebarLinks = async () => {
  // Get categories from menuItem in the db
  const categories = await prisma.menuItem.findMany({
    select: {
      category: true,
    },
    distinct: ["category"],
  });

  const categoryNames = categories.map((item) => item.category);

  return (
    <>
      {categoryNames.map((category, index) => (
        <SideBarNavLink
          key={index}
          name={category.charAt(0).toUpperCase() + category.slice(1)}
          icon={`/icons/${category}.svg`}
          href={`/menu/${category}`}
        />
      ))}
    </>
  );
};

export default MenuSidebarLinks;
