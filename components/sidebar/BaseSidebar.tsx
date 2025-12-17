import SideBarNavLink from "../ui/SidebarNavLink";

const BaseSidebar = () => {
  const SidebarNavLinks = [
    {
      name: "",
      iconPath: "",
      href: "",
    },
    {
      name: "",
      iconPath: "",
      href: "",
    },

    {
      name: "",
      iconPath: "",
      href: "",
    },
    {
      name: "",
      iconPath: "",
      href: "",
    },
  ];

  return (
    <aside className="bg-[var(--LightGrey)] h-screen hidden md:flex items-center justify-center p-10">
      <ul className="flex flex-col gap-5 ">
        {SidebarNavLinks.map((link, index) => (
          <li key={index}>
            <SideBarNavLink
              name={link.name}
              icon={link.iconPath}
              href={link.href}
            />
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default BaseSidebar;
