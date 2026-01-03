import CategoryPage from "@/components/menu/CategoryPage";

// Cache for 60 seconds
export const revalidate = 60;

const DynamicCategoryPage = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;
  return <CategoryPage category={category} />;
};

export default DynamicCategoryPage;
