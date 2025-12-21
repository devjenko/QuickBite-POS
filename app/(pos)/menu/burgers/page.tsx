import CenterContentContainer from "@/components/ui/CenterContentContainer";
import MenuItemCard from "@/components/ui/MenuItemCard";
import prisma from "@/lib/prisma";

const BurgersPage = async () => {
  const burgers = await prisma.menuItem.findMany({
    where: {
      category: "burgers",
    },
  });

  console.log("Burgers found:", burgers.length);
  console.log("First burger:", burgers[0]);

  return (
    <CenterContentContainer className="grid grid-cols-6 grid-rows-6 gap-11">
      {burgers.map((burger) => (
        <MenuItemCard
          name={burger.name}
          key={burger.id}
          price={burger.price}
          description={burger.description}
          image={
            burger.image ||
            "https://res.cloudinary.com/dope0htm4/image/upload/v1766293302/menu-items/sp1qz1g6mlj4igw7ov8v.png"
          }
        />
      ))}
    </CenterContentContainer>
  );
};

export default BurgersPage;
