import Image from "next/image";

const EmptyMenuState = () => {
  return (
    <div className="text-center flex justify-center flex-col items-center">
      <Image
        draggable
        width={300}
        height={300}
        src={"/images/empty-menu.svg"}
        alt="An empty plate with a fork and knife"
      />
      <h1 className="text-3xl mb-3">Your menu is empty.</h1>
      <p>Click &quot;+ Menu Item&quot; to start adding some delicious items!</p>
    </div>
  );
};

export default EmptyMenuState;
