import BaseSidebar from "@/components/sidebar/BaseSidebar";

const CartSidebar = () => {
  return (
    <BaseSidebar
      style={{ right: "max(0px, calc((100vw - 3000px) / 2))" }}
      className="top-0 bg-[var(--White)] right-[max(0px, calc((100vw - 3000px) / 2))]"
    >
      Cart Sidebar
    </BaseSidebar>
  );
};

export default CartSidebar;
