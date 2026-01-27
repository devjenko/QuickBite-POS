import prisma from "../prisma";

type Period = 'week' | 'month' | 'year';
type GroupedRevenue = Record<string, Record<string, number>>;

function getStartOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function getWeekOfMonth(date: Date): number {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstDayOfWeek = firstDay.getDay();
  const offsetDate = date.getDate() + firstDayOfWeek - 1;
  return Math.floor(offsetDate / 7) + 1;
}

export async function getUniqueCategories(): Promise<string[]> {
  const categories = await prisma.orderItem.findMany({
    select: {
      category: true,
    },
    distinct: ['category'],
    orderBy: {
      category: 'asc',
    },
  });

  return categories.map(item => item.category);
}

export async function getRevenueByCategoryOverTime(
  period: Period
): Promise<GroupedRevenue> {
  const now = new Date();
  let startDate: Date;

  switch (period) {
    case 'week':
      startDate = getStartOfWeek(now);
      break;
    case 'month':
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      startDate.setHours(0, 0, 0, 0);
      break;
    case 'year':
      startDate = new Date(now.getFullYear(), 0, 1);
      startDate.setHours(0, 0, 0, 0);
      break;
  }

  const items = await prisma.orderItem.findMany({
    where: {
      createdAt: {
        gte: startDate,
        lte: now,
      },
    },
    select: {
      category: true,
      price: true,
      quantity: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });

  const grouped: GroupedRevenue = {};

  items.forEach((item) => {
    const revenue = item.price * item.quantity;
    let timeKey: string;

    if (period === 'week') {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      timeKey = days[item.createdAt.getDay()];
    } else if (period === 'month') {
      const weekNum = getWeekOfMonth(item.createdAt);
      timeKey = `Week ${weekNum}`;
    } else {
      const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];
      timeKey = months[item.createdAt.getMonth()];
    }

    if (!grouped[item.category]) {
      grouped[item.category] = {};
    }

    grouped[item.category][timeKey] = 
      (grouped[item.category][timeKey] || 0) + revenue;
  });

  return grouped;
}