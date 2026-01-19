
import SideBarNavLink from "../sidebar/SidebarNavLinks"

const MobileMenuButton = ({className}: {className?: string}) => {
  return (
    <SideBarNavLink  icon="/icons/newOrder.svg" href="/menu" className="px-0! py-0! h-10 w-10" wrapperClassName="shadow-none! bg-[var(--LightGrey)]" iconSize={24} />
  )
}

export default MobileMenuButton