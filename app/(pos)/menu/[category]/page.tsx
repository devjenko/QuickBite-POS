import CategoryPage from "@/components/menu/CategoryPage";

const DynamicCategoryPage = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;
  return <CategoryPage category={category} />;
};

export default DynamicCategoryPage;
