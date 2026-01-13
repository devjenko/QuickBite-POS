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
    item.name.toLowerCase().includes(search.trim().toLowerCase())
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
            "/gifs/empty-img.gif"
          }
        />
      ))}
    </>
  );
};

export default CategoryPageContent;
