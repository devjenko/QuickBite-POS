export interface SectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

const Section = ({
  title,
  description,
  children,
  className,
}: SectionProps) => {
  return (
    <section className={`p-5 bg-[var(--White)] rounded-sm min-h-96  ${className}`}>
      {title && <h2 className="mb-2">{title}</h2>}
      {description && <p className="mb-6">{description}</p>}
      {children}
    </section>
  );
};
export default Section;