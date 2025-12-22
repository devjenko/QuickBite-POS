import CategoryPage from "@/components/ui/CategoryPage";

const DynamicCategoryPage = async ({
  params,
}: {
  params: Promise<{ category: string }>;
}) => {
  const { category } = await params;
  return <CategoryPage category={category} />;
};

export default DynamicCategoryPage;
