import { contactLinks } from "@/data/contact";

export function ContactLinks() {
  const availableLinks = contactLinks.filter(
    (item): item is (typeof contactLinks)[number] & { href: string } =>
      typeof item.href === "string",
  );

  return (
    <div className="contact-links">
      {availableLinks.map((item, index) => (
        <div className="contact-link" key={item.label}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <div>
            <p>{item.label}</p>
            <a href={item.href}>{item.value}</a>
            <small>{item.description}</small>
          </div>
        </div>
      ))}
    </div>
  );
}
