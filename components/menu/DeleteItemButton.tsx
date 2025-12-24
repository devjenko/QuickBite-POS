"use client";
import { Button } from "../ui/Button";
import { Trash2Icon } from "lucide-react";
import prisma from "@/lib/prisma";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DELETE } from "@/app/api/menu-items/route";

const DeleteItemButton = ({
  ItemId,
  ItemName,
}: {
  ItemId: string;
  ItemName: string;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);

    // delete confirmation
    if (!confirm(`Delete ${ItemName}?`)) return;

    setIsDeleting(true);

    try {
      const response = await fetch(`/api/menu-items/${ItemId}`, {
        method: "DELETE",
      });

      router.refresh();
    } catch (error) {}
  };

  return (
    <Button
      className={"w-fit absolute right-0 rounded-sm rounded-r-none shadow-sm"}
      onClick={handleDelete}
    >
      <Trash2Icon />
    </Button>
  );
};

export default DeleteItemButton;
