interface SettingsSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <section className="mb-11">
      <h2 className="mb-2">{title}</h2>
      <p className="mb-6">{description}</p>
      {children}
    </section>
  );
};

export default SettingsSection;
