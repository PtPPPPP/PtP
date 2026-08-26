import Link from "next/link";
import { Container } from "@/components/container";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="site-footer__lead">
          <p>Technical Archive</p>
          <h2>继续学习，也继续把想法做成可以验证的东西。</h2>
        </div>
        <div className="site-footer__bottom">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <nav aria-label="页脚导航">
            {navigation.slice(1).map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
