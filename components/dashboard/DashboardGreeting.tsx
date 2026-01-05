import { auth } from "@/auth";

export default async function DashboardGreeting() {
  const session = await auth();

  function extractBusinessName(businessId: string) {
    const namePart = businessId.split("@")[0];
    const nameWithoutNums = namePart.replace(/\d+$/g, "");

    // Split camelCase or PascalCase into separate words
    const words = nameWithoutNums.split(/(?=[A-Z])|(?<=\d)(?=[A-Za-z])/);

    // Capitalize each word and join with spaces
    const formattedName = words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

    return formattedName;
  }
  return (
    <h2>
      Welcome,{" "}
      <strong>
        {extractBusinessName(session?.user?.businessId ?? "Guest")}.
      </strong>
    </h2>
  );
}
