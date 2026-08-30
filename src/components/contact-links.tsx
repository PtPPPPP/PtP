import { contactLinks } from "@/data/contact";
import { isPendingValue } from "@/lib/pending";

export function ContactLinks() {
  const availableLinks = contactLinks.filter(
    (item) => !isPendingValue(item.value),
  );

  return (
    <div className="contact-links">
      {availableLinks.map((item, index) => (
        <div className="contact-link" key={item.label}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <div>
            <p>{item.label}</p>
            {item.href ? (
              <a href={item.href}>{item.value}</a>
            ) : (
              <strong>{item.value}</strong>
            )}
            <small>{item.description}</small>
          </div>
        </div>
      ))}
    </div>
  );
}
