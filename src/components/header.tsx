import { Container } from "@/components/container";
import { MobileNavigation } from "@/components/mobile-navigation";
import { NavigationLinks } from "@/components/navigation-links";

export function Header() {
  return (
    <header className="site-header">
      <Container className="site-header__inner">
        <nav className="desktop-nav" aria-label="主导航">
          <NavigationLinks />
        </nav>
        <MobileNavigation />
      </Container>
    </header>
  );
}
