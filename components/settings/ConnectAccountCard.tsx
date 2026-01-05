import Button from "@/components/ui/Button";
import ContentWrapper from "../shared/ContentWrapper";
import Image from "next/image";

interface ConnectAccountCardProps {
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect?: () => void;
  name: string;
  img: string;
}

const ConnectAccountCard: React.FC<ConnectAccountCardProps> = ({
  isConnected,
  onConnect,
  onDisconnect,
  name,
  img,
}) => {
  return (
    <ContentWrapper className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 mb-5">
      <div className=" flex items-center justify-center shrink-0">
        <Image
          width={60}
          height={60}
          src={img}
          alt={`${name} bank account logo`}
          unoptimized
          className="rounded-sm"
        />
      </div>
      <div className="flex-1">
        <div className="font-semibold text-base mb-1">{name} Connect</div>
        <div className="text-xxsmall text-gray-500">
          {isConnected
            ? `Your ${name} account is connected and ready to receive payments`
            : `Connect your ${name} bank account to start receiving payments`}
        </div>
        <span
          className={`
          inline-block px-2.5 py-1 rounded-sm text-xxxsmall font-medium mt-1.5
          ${
            isConnected
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }
        `}
        >
          {isConnected ? "Connected" : "Not Connected"}
        </span>
      </div>
      <Button
        onClick={isConnected && onDisconnect ? onDisconnect : onConnect}
        variant={isConnected ? "grey" : "dark"}
      >
        {isConnected ? "Disconnect" : "Connect"}
      </Button>
    </ContentWrapper>
  );
};

export default ConnectAccountCard;
