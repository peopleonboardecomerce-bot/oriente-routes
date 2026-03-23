import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Users, FileText, UserCheck, TrendingUp } from "lucide-react";

interface Stats {
  passengers: number;
  drivers: number;
  posts: number;
  publishedPosts: number;
}

function StatCard({
  icon: Icon,
  label,
  value,
  bgStyle,
  loading,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  bgStyle: React.CSSProperties;
  loading: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl border border-border p-6 shadow-sm flex items-center gap-4">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={bgStyle}
      >
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div>
        {loading ? (
          <div className="h-7 w-16 bg-slate-200 animate-pulse rounded-lg mb-1" />
        ) : (
          <p className="text-2xl font-bold text-foreground">{value}</p>
        )}
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ passengers: 0, drivers: 0, posts: 0, publishedPosts: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const [passRes, driverRes, postsRes, publishedRes] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }).eq("role", "user"),
        supabase.from("drivers").select("id", { count: "exact", head: true }),
        supabase.from("posts").select("id", { count: "exact", head: true }),
        supabase.from("posts").select("id", { count: "exact", head: true }).eq("status", "published"),
      ]);
      setStats({
        passengers: passRes.count ?? 0,
        drivers: driverRes.count ?? 0,
        posts: postsRes.count ?? 0,
        publishedPosts: publishedRes.count ?? 0,
      });
      setLoading(false);
    }
    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground font-display">Resumen del Panel</h1>
        <p className="text-sm text-muted-foreground mt-1">Vista general de la plataforma EnLaSalida</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          label="Pasajeros registrados"
          value={stats.passengers}
          bgStyle={{ backgroundColor: "hsl(var(--brand-navy))" }}
          loading={loading}
        />
        <StatCard
          icon={UserCheck}
          label="Conductores"
          value={stats.drivers}
          bgStyle={{ backgroundColor: "hsl(var(--brand-teal))" }}
          loading={loading}
        />
        <StatCard
          icon={FileText}
          label="Posts totales"
          value={stats.posts}
          bgStyle={{ backgroundColor: "hsl(26 80% 55%)" }}
          loading={loading}
        />
        <StatCard
          icon={TrendingUp}
          label="Posts publicados"
          value={stats.publishedPosts}
          bgStyle={{ backgroundColor: "hsl(var(--brand-green))" }}
          loading={loading}
        />
      </div>

      {/* Quick access */}
      <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
        <h2 className="text-base font-semibold text-foreground mb-4">Accesos rápidos</h2>
        <div className="flex flex-wrap gap-3">
          <a
            href="/admin/blog"
            className="inline-flex items-center gap-2 font-semibold px-4 py-2 rounded-xl text-sm transition-all duration-200 text-white shadow-sm"
            style={{ backgroundColor: "hsl(var(--brand-navy))" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "hsl(var(--brand-teal))")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "hsl(var(--brand-navy))")}
          >
            + Nuevo post
          </a>
          <a
            href="/admin/usuarios"
            className="inline-flex items-center gap-2 font-semibold px-4 py-2 rounded-xl text-sm transition-all duration-200 text-white shadow-sm"
            style={{ backgroundColor: "hsl(var(--brand-teal))" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.85")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
          >
            Ver conductores pendientes
          </a>
          <a
            href="/admin/contenido"
            className="bg-slate-100 text-foreground text-sm font-semibold py-2 px-4 rounded-xl hover:bg-slate-200 transition"
          >
            Editar contenido web
          </a>
        </div>
      </div>
    </div>
  );
}
