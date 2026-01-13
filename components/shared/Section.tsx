export interface SectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

const Section = ({
  title,
  description,
  children,
}: SectionProps) => {
  return <section>
    {title && <h2 className="mb-2">{title}</h2>}
    {description && <p className="mb-6">{description}</p>}
    {children}
  </section>;
};
export default Section;