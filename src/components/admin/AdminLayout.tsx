import { Outlet, NavLink, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { Menu, X, Shield, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const mobileNav = [
  { to: "/admin", label: "Resumen", end: true },
  { to: "/admin/blog", label: "Blog", end: false },
  { to: "/admin/usuarios", label: "Usuarios", end: false },
  { to: "/admin/contenido", label: "Contenido", end: false },
];

export default function AdminLayout() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Desktop sidebar */}
      <AdminSidebar />

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-border sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-brand-blue flex items-center justify-center">
              <Shield className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-sm text-foreground">Admin</span>
          </div>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-1.5 text-muted-foreground hover:text-foreground">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="md:hidden fixed inset-0 z-30 bg-black/40" onClick={() => setMobileOpen(false)}>
            <div
              className="absolute left-0 top-0 h-full w-64 bg-white p-4 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <nav className="space-y-1 mt-4">
                {mobileNav.map(({ to, label, end }) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={end}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                        isActive
                          ? "bg-brand-blue/10 text-brand-blue"
                          : "text-muted-foreground hover:bg-slate-100"
                      )
                    }
                  >
                    {label}
                  </NavLink>
                ))}
              </nav>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 mt-6 w-full px-3 py-2 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Cerrar sesión
              </button>
            </div>
          </div>
        )}

        {/* Page content */}
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
