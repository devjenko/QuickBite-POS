import DashboardGreeting from "@/components/dashboard/DashboardGreeting";
import DateDisplay from "@/components/dashboard/DateDisplay";
import DashboardLayout from "@/components/layout/DashboardLayout";
import Image from "next/image";
import MobileMenuButton from "@/components/dashboard/MobileMenuButton";
import StatCard from "@/components/dashboard/StatCard";
import { statCardContent, getStats } from "@/consts/stats";
import Section from "@/components/shared/Section";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import StatsContent from "@/components/dashboard/StatsContent";

export default async function DashboardPage() {
  const session = await auth();
  const stats = await getStats();

  const orderedItems = await prisma.orderItem.findMany({
    where: {
      order: {
        merchantId: session?.user?.id,
        paymentStatus: "completed",
      },
    },
    include: {
      menuItem: {
        select: {
          id: true,
          name: true,
          price: true,
        },
      },
    },
  });

  // Aggregate items by menuItemId
  const aggregatedItems = orderedItems.reduce((acc, item) => {
    const menuItemId = item.menuItemId || item.name;
    const existing = acc.get(menuItemId);

    if (existing) {
      existing.totalQuantity += item.quantity;
      existing.totalRevenue += item.price * item.quantity;
    } else {
      acc.set(menuItemId, {
        id: menuItemId,
        name: item.menuItem?.name || item.name,
        price: item.menuItem?.price || item.price,
        totalQuantity: item.quantity,
        totalRevenue: item.price * item.quantity,
      });
    }
    return acc;
  }, new Map<string, { id: string; name: string; price: number; totalQuantity: number; totalRevenue: number }>());

  const groupedItems = Array.from(aggregatedItems.values());

  return (
    <DashboardLayout>
      <header className="flex md:justify-between w-full items-center justify-between">
        <DashboardGreeting className="hidden md:block" />
        <Image
          src="/logos/quickbite-logo.webp"
          alt="QuickBite logo"
          width={60}
          height={60}
          className="rounded-sm md:hidden"
          unoptimized
          loading="eager"
        />
        <DateDisplay />
        <MobileMenuButton />
      </header>

      <main>
        <Section>
          <div className="flex gap-3 items-center justify-between">
            {statCardContent.map((stat) => (
              <StatCard
                key={stat.name}
                icon={stat.icon}
                name={stat.name}
                value={Math.floor(stats[stat.key])}
              />
            ))}
          </div>
        </Section>

        <Section title="Ordered Items">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>PPU</TableHead>
                <TableHead className="!text-right">Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groupedItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.totalQuantity}</TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">${item.totalRevenue.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Section>

        <Section title="Overall Statistics">
          <StatsContent />
        </Section>
      </main>
    </DashboardLayout>
  );
}
