import Link from "next/link";
import ContentWrapper from "./ContentWrapper";
import Image from "next/image";
interface SideBarNavLinkProps {
  icon: string;
  name: string;
  href: string;
}

const SideBarNavLink = ({ icon, name, href }: SideBarNavLinkProps) => {
  return (
    <ContentWrapper>
      <Link
        href={href}
        className="gap-2 px-4 py-8 flex flex-col justify-center items-center"
      >
        <Image alt="Sidebar Icon" width={20} height={20} src={icon} />
        <span>{name}</span>
      </Link>
    </ContentWrapper>
  );
};

export default SideBarNavLink;
