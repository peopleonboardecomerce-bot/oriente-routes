import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, Clock, ExternalLink, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  status: string;
  created_at: string;
}

interface Driver {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  vehicle_make: string | null;
  vehicle_model: string | null;
  vehicle_plate: string | null;
  status: "pending" | "verified" | "rejected";
  cedula_url: string | null;
  licencia_url: string | null;
  circulacion_url: string | null;
  notes: string | null;
  created_at: string;
}

const statusLabel: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: "Pendiente", color: "bg-amber-100 text-amber-700", icon: Clock },
  verified: { label: "Verificado", color: "bg-emerald-100 text-emerald-700", icon: CheckCircle },
  rejected: { label: "Rechazado", color: "bg-red-100 text-red-700", icon: XCircle },
};

function SkeletonRow() {
  return (
    <tr>
      {[...Array(5)].map((_, i) => (
        <td key={i} className="px-5 py-3.5">
          <div className="h-4 bg-slate-100 animate-pulse rounded-lg" />
        </td>
      ))}
    </tr>
  );
}

export default function AdminUsuarios() {
  const { toast } = useToast();
  const [tab, setTab] = useState<"pasajeros" | "conductores">("conductores");
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedDriver, setExpandedDriver] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const [profilesRes, driversRes] = await Promise.all([
      supabase.from("profiles").select("*").eq("role", "user").order("created_at", { ascending: false }),
      supabase.from("drivers").select("*").order("created_at", { ascending: false }),
    ]);
    if (!profilesRes.error) setProfiles(profilesRes.data as Profile[]);
    if (!driversRes.error) setDrivers(driversRes.data as Driver[]);
    setLoading(false);
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const updateDriverStatus = async (id: string, status: "verified" | "rejected" | "pending") => {
    setUpdatingId(id);
    const { error } = await supabase.from("drivers").update({ status }).eq("id", id);
    setUpdatingId(null);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({
      title: status === "verified" ? "Conductor verificado ✓" : status === "rejected" ? "Conductor rechazado" : "Conductor pendiente",
    });
    fetchData();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground font-display">Gestión de Usuarios</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Pasajeros y conductores de la plataforma</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
        {(["conductores", "pasajeros"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "px-4 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize",
              tab === t ? "bg-white shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Conductores table */}
      {tab === "conductores" && (
        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-slate-50 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  <th className="text-left px-5 py-3">Nombre</th>
                  <th className="text-left px-4 py-3 hidden sm:table-cell">Contacto</th>
                  <th className="text-left px-4 py-3 hidden md:table-cell">Vehículo</th>
                  <th className="text-left px-4 py-3">Estado</th>
                  <th className="text-left px-4 py-3">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {loading ? (
                  [...Array(3)].map((_, i) => <SkeletonRow key={i} />)
                ) : drivers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-10 text-center text-muted-foreground text-sm">
                      No hay conductores registrados.
                    </td>
                  </tr>
                ) : (
                  drivers.map((driver) => {
                    const st = statusLabel[driver.status];
                    const StatusIcon = st.icon;
                    const isExpanded = expandedDriver === driver.id;
                    return (
                      <>
                        <tr key={driver.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="px-5 py-3.5 font-medium text-foreground">{driver.full_name}</td>
                          <td className="px-4 py-3.5 hidden sm:table-cell text-muted-foreground">
                            <div>{driver.email}</div>
                            <div className="text-xs">{driver.phone}</div>
                          </td>
                          <td className="px-4 py-3.5 hidden md:table-cell text-muted-foreground">
                            {driver.vehicle_make} {driver.vehicle_model}
                            {driver.vehicle_plate && <span className="block text-xs font-mono">{driver.vehicle_plate}</span>}
                          </td>
                          <td className="px-4 py-3.5">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${st.color}`}>
                              <StatusIcon className="w-3 h-3" /> {st.label}
                            </span>
                          </td>
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => setExpandedDriver(isExpanded ? null : driver.id)}
                                className="flex items-center gap-1 text-xs px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-muted-foreground transition"
                              >
                                Ver <ChevronDown className={cn("w-3 h-3 transition", isExpanded && "rotate-180")} />
                              </button>
                              {driver.status !== "verified" && (
                                <button
                                  onClick={() => updateDriverStatus(driver.id, "verified")}
                                  disabled={updatingId === driver.id}
                                  className="text-xs px-2.5 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 font-semibold rounded-lg transition disabled:opacity-50"
                                >
                                  Verificar
                                </button>
                              )}
                              {driver.status !== "rejected" && (
                                <button
                                  onClick={() => updateDriverStatus(driver.id, "rejected")}
                                  disabled={updatingId === driver.id}
                                  className="text-xs px-2.5 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 font-semibold rounded-lg transition disabled:opacity-50"
                                >
                                  Rechazar
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                        {isExpanded && (
                          <tr key={`${driver.id}-detail`} className="bg-slate-50/50">
                            <td colSpan={5} className="px-5 py-4">
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                {[
                                  { label: "Cédula", url: driver.cedula_url },
                                  { label: "Licencia", url: driver.licencia_url },
                                  { label: "Circulación", url: driver.circulacion_url },
                                ].map(({ label, url }) => (
                                  <div key={label} className="bg-white rounded-xl border border-border p-3 text-sm">
                                    <p className="text-xs font-semibold text-muted-foreground mb-1">{label}</p>
                                    {url ? (
                                      <a href={url} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-brand-blue hover:underline text-xs">
                                        Ver documento <ExternalLink className="w-3 h-3" />
                                      </a>
                                    ) : (
                                      <span className="text-xs text-muted-foreground">No cargado</span>
                                    )}
                                  </div>
                                ))}
                              </div>
                              {driver.notes && (
                                <p className="mt-3 text-xs text-muted-foreground bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                                  <strong>Notas:</strong> {driver.notes}
                                </p>
                              )}
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pasajeros table */}
      {tab === "pasajeros" && (
        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-slate-50 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  <th className="text-left px-5 py-3">Nombre</th>
                  <th className="text-left px-4 py-3">Correo</th>
                  <th className="text-left px-4 py-3 hidden sm:table-cell">Teléfono</th>
                  <th className="text-left px-4 py-3">Estado</th>
                  <th className="text-left px-4 py-3 hidden md:table-cell">Registro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {loading ? (
                  [...Array(3)].map((_, i) => <SkeletonRow key={i} />)
                ) : profiles.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-10 text-center text-muted-foreground text-sm">
                      No hay pasajeros registrados.
                    </td>
                  </tr>
                ) : (
                  profiles.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-foreground">{p.full_name ?? "—"}</td>
                      <td className="px-4 py-3.5 text-muted-foreground">{p.email ?? "—"}</td>
                      <td className="px-4 py-3.5 hidden sm:table-cell text-muted-foreground">{p.phone ?? "—"}</td>
                      <td className="px-4 py-3.5">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                          p.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                        }`}>
                          {p.status === "active" ? "Activo" : "Suspendido"}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 hidden md:table-cell text-muted-foreground whitespace-nowrap">
                        {new Date(p.created_at).toLocaleDateString("es-VE")}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
