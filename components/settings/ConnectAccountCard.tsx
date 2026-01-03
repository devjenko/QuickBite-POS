import Button from "@/components/ui/Button";

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
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 bg-gray-50 border border-gray-200 rounded-xl mb-5">
      <div className="w-[60px] h-[60px] bg-gradient-to-br from-indigo-600 to-indigo-400 rounded-xl flex items-center justify-center text-white font-bold text-xl shrink-0">
        S
      </div>
      <div className="flex-1">
        <div className="font-semibold text-base mb-1">Stripe Connect</div>
        <div className="text-[13px] text-gray-500">
          {isConnected
            ? "Your Stripe account is connected and ready to receive payments"
            : "Connect your Stripe account to start receiving payments"}
        </div>
        <span
          className={`
          inline-block px-2.5 py-1 rounded-xl text-xs font-medium mt-1.5
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
        variant={isConnected ? "default" : "dark"}
      >
        {isConnected ? "Disconnect" : "Connect"}
      </Button>
    </div>
  );
};

export default ConnectAccountCard;
