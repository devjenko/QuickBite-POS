"use client";

import MenuItemCard from "./MenuItemCard";
import prisma from "@/lib/prisma";
import InputSearch from "../ui/InputSearch";
import { useState } from "react";

interface CategoryPageContentProps {
  items: Awaited<ReturnType<typeof prisma.menuItem.findMany>>;
}

const CategoryPageContent = ({ items }: CategoryPageContentProps) => {
  const [search, setSearch] = useState("");

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="col-span-full relative">
        <InputSearch onSearch={(e) => setSearch(e.target.value)} />
      </div>
      {filteredItems.map((item) => (
        <MenuItemCard
          id={item.id}
          name={item.name}
          key={item.name}
          price={item.price}
          description={item.description}
          image={
            item.image ||
            "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeTB5emRxdHViYzU1ZmswcHR2YnU0eHBtMWl1NWNhMDNkcHB3NDY0diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3zhxq2ttgN6rEw8SDx/giphy.gif"
          }
        />
      ))}
    </>
  );
};

export default CategoryPageContent;
