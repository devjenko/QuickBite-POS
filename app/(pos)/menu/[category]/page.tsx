import CategoryPage from "@/components/menu/category-page";

const DynamicCategoryPage = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;
  return <CategoryPage category={category} />;
};

export default DynamicCategoryPage;
