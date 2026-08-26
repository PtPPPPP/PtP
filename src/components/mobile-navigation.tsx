import { NavigationLinks } from "@/components/navigation-links";

export function MobileNavigation() {
  return (
    <details className="mobile-nav">
      <summary aria-label="打开导航菜单">
        <span>菜单</span>
        <span className="mobile-nav__icon" aria-hidden="true">
          <i />
          <i />
        </span>
      </summary>
      <nav aria-label="移动端主导航">
        <NavigationLinks numbered />
      </nav>
    </details>
  );
}
