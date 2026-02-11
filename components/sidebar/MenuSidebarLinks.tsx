import prisma from "@/lib/prisma";
import SideBarNavLink from "@/components/sidebar/SidebarNavLinks";
import { Session } from "next-auth";
import { cn } from "@/lib/utils";

interface MenuSidebarLinksProps {
  session: Session | null;
  className?: string;
  linksClassName?: string;
}

const categoryMap: Record<string, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  starters: "Starters",
  maincourses: "Main Courses",
  deserts: "Deserts",
  sides: "Sides",
  burgers: "Burgers",
  sandwiches: "Sandwiches",
  soupsandsalads: "Soups & Salads",
  pizzas: "Pizzas",
  hotdrinks: "Hot Drinks",
  colddrinks: "Cold Drinks",
  alcoholicdrinks: "Alcoholic Drinks",
  coffee: "Coffee",
};

const MenuSidebarLinks = async ({ session, className, linksClassName }: MenuSidebarLinksProps) => {
  if (!session?.user?.id) {
    return null;
  }

  // Get categories from menuItem - using userId from session
  const categories = await prisma.menuItem.findMany({
    where: {
      userId: session.user.id,
    },
    select: {
      category: true,
    },
    distinct: ["category"],
  });

  const categoryNames = categories.map((item) => item.category);

  return (
    <div className={cn("gap-4 flex flex-col", className)}>
      {categoryNames.map((category, index) => (
        <SideBarNavLink
          key={index}
          name={categoryMap[category] || category.charAt(0).toUpperCase() + category.slice(1)}
          icon={`/icons/${category}.svg`}
          href={`/menu/${category}`}
          className={linksClassName}
        />
      ))}
    </div>
  );
};

export default MenuSidebarLinks;
