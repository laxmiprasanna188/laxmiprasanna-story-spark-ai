import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { isLoggedIn, removeUserInfo } from "../../services/auth.service";
import { useTheme } from "../theme/theme.context";
import NavbarLogo from "./navbar/NavbarLogo";
import NavbarDesktopNav from "./navbar/NavbarDesktopNav";
import NavbarActions from "./navbar/NavbarActions";
import NavbarMobileMenu from "./navbar/NavbarMobileMenu";
import {
  PRIMARY_NAV_ITEMS,
  SECONDARY_NAV_ITEMS,
} from "./navbar/navbar.config";
import { useNavbarScroll } from "./navbar/useNavbarScroll";

const NavListComponent = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const { pathname } = useLocation();
  const { glowEnabled, toggleGlow } = useTheme();
  const scrolled = useNavbarScroll();

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleLogout = () => {
    removeUserInfo();
    setLoggedIn(false);
    closeMenu();
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <div
        className={`absolute inset-0 border-b transition-all duration-300 ${
          scrolled
            ? "border-slate-200/80 bg-white/90 shadow-md shadow-slate-900/5 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/90 dark:shadow-black/30"
            : "border-white/50 bg-white/70 shadow-sm shadow-slate-900/5 backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/70 dark:shadow-black/20"
        }`}
      />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-indigo-500/35 to-transparent" />

      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <NavbarLogo onNavigate={closeMenu} />

        <NavbarDesktopNav
          items={PRIMARY_NAV_ITEMS}
          pathname={pathname}
          showDashboard={loggedIn}
          onNavigate={closeMenu}
        />

        <NavbarActions
          loggedIn={loggedIn}
          glowEnabled={glowEnabled}
          menuOpen={menuOpen}
          onToggleGlow={toggleGlow}
          onToggleMenu={() => setMenuOpen((prev) => !prev)}
          onLogout={handleLogout}
          onNavigate={closeMenu}
        />
      </div>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <NavbarMobileMenu
            pathname={pathname}
            primaryItems={PRIMARY_NAV_ITEMS}
            secondaryItems={SECONDARY_NAV_ITEMS}
            loggedIn={loggedIn}
            onNavigate={closeMenu}
            onLogout={handleLogout}
          />
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavListComponent;
