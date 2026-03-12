import { Card, CardTitle } from "../ui/Card";
import Image from "next/image";

const ProviderButton = ({
  title,
  image,
  onClick,
}: {
  title: string;
  image: string;
  onClick: () => void;
}) => {
  return (
    <>
      <Card className="w-fit h-fit text-center p-5" onClick={onClick}>
        <CardTitle>{title}</CardTitle>{" "}
        <Image
          className="rounded-sm"
          src={image}
          width={100}
          height={100}
          alt="Payment provider logo"
        />
      </Card>
    </>
  );
};

export default ProviderButton;
