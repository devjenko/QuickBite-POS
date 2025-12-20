import BaseSidebar from "./BaseSidebar";

const CartSidebar = () => {
  return (
    <BaseSidebar
      style={{ right: "max(0px, calc((100vw - 3000px) / 2))" }}
      className="top-0  bg-[var(--White)] min-w-77.5 right-[max(0px, calc((100vw - 3000px) / 2))]"
    >
      Cart Sidebar
    </BaseSidebar>
  );
};

export default CartSidebar;
