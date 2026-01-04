import Button from "@/components/ui/Button";
import ContentWrapper from "../shared/ContentWrapper";

interface ConnectAccountCardProps {
  isConnected: boolean;
  onConnect: () => void;
  onDisconnect?: () => void;
}

const ConnectAccountCard: React.FC<ConnectAccountCardProps> = ({
  isConnected,
  onConnect,
  onDisconnect,
}) => {
  return (
    <ContentWrapper className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 mb-5">
      <div className="w-[60px] h-[60px] bg-gradient-to-br from-indigo-600 to-indigo-400 rounded-sm flex items-center justify-center text-white font-bold text-xl shrink-0">
        S
      </div>
      <div className="flex-1">
        <div className="font-semibold text-base mb-1">Stripe Connect</div>
        <div className="text-xxsmall text-gray-500">
          {isConnected
            ? "Your Stripe account is connected and ready to receive payments"
            : "Connect your Stripe account to start receiving payments"}
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
