import { Card, CardTitle } from "../ui/Card";

const BakongButton = ({
  onClick,
}: {
  onClick: () => void;
}) => {
  return (
    <Card className="w-fit h-fit text-center p-5" onClick={onClick}>
      <CardTitle>Bakong KHQR</CardTitle>
      <div className="w-[100px] h-[100px] flex items-center justify-center rounded-sm bg-gradient-to-br from-blue-500 to-blue-600 text-white text-3xl font-bold">
        ₿
      </div>
    </Card>
  );
};

export default BakongButton;
