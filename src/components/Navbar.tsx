import { NavLink } from "react-router-dom";

export default function Navbar() {
  const navItems = [
    { to: "/home", label: "Home", end: true },
    { to: "/game", label: "Game" },
    { to: "/about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-10 border-b border-[#f99e1a]/60 bg-[#f8fbff]/85 shadow-[0_8px_20px_rgba(34,58,97,0.16)] backdrop-blur">
      <nav
        className="mx-auto flex w-full max-w-7xl items-center gap-5 py-3 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              [
                "rounded-sm border px-3 py-2 text-sm font-semibold uppercase tracking-wide transition-colors duration-200",
                isActive
                  ? "border-[#f99e1a] bg-[#f99e1a] text-[#111827]"
                  : "border-transparent text-slate-700 hover:border-[#f99e1a]/70 hover:bg-[#e4eefc] hover:text-slate-900",
              ].join(" ")
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
