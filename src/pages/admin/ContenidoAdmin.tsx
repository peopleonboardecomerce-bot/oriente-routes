import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Save, RefreshCw } from "lucide-react";

interface Setting {
  key: string;
  value: string;
  label: string | null;
}

const GROUPS = [
  {
    title: "Identidad de Marca",
    keys: ["mision", "vision", "why_us"],
  },
  {
    title: "Pasos — Pasajeros",
    keys: ["paso_pasajero_1", "paso_pasajero_2", "paso_pasajero_3"],
  },
  {
    title: "Pasos — Conductores",
    keys: ["paso_conductor_1", "paso_conductor_2", "paso_conductor_3"],
  },
  {
    title: "Configuración del Footer",
    keys: [
      "footer_about_text",
      "footer_contact_email",
      "footer_phone",
      "footer_facebook",
      "footer_instagram",
      "footer_twitter",
    ],
  },
];

export default function ContenidoAdmin() {
  const { toast } = useToast();
  const [settings, setSettings] = useState<Record<string, Setting>>({});
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from("site_settings").select("*");
    if (!error && data) {
      const map: Record<string, Setting> = {};
      const draftMap: Record<string, string> = {};
      (data as Setting[]).forEach((s) => {
        map[s.key] = s;
        draftMap[s.key] = s.value;
      });
      setSettings(map);
      setDraft(draftMap);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleSave = async (key: string) => {
    setSaving(key);
    const { error } = await supabase
      .from("site_settings")
      .update({ value: draft[key], updated_at: new Date().toISOString() })
      .eq("key", key);
    setSaving(null);
    if (error) {
      toast({ title: "Error al guardar", description: error.message, variant: "destructive" });
      return;
    }
    setSettings((prev) => ({ ...prev, [key]: { ...prev[key], value: draft[key] } }));
    toast({ title: "Guardado ✓", description: `"${settings[key]?.label ?? key}" actualizado.` });
  };

  const hasChanged = (key: string) => draft[key] !== settings[key]?.value;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-display">Editor de Contenido Web</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Edita los textos del sitio público sin tocar el código
          </p>
        </div>
        <button
          onClick={fetchSettings}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-slate-100 hover:bg-slate-200 text-foreground font-medium rounded-xl transition"
        >
          <RefreshCw className="w-4 h-4" /> Recargar
        </button>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-20 bg-white border border-border rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        GROUPS.map((group) => (
          <div
            key={group.title}
            className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden"
          >
            <div className="px-6 py-3.5 border-b border-border bg-slate-50">
              <h2 className="text-sm font-semibold text-foreground">{group.title}</h2>
            </div>
            <div className="divide-y divide-border">
              {group.keys.map((key) => {
                const setting = settings[key];
                if (!setting) return null;
                const isLong = draft[key]?.length > 80;
                return (
                  <div key={key} className="px-6 py-4">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide block mb-2">
                      {setting.label ?? key}
                    </label>
                    {isLong ? (
                      <textarea
                        value={draft[key] ?? ""}
                        onChange={(e) => setDraft((d) => ({ ...d, [key]: e.target.value }))}
                        rows={3}
                        className="w-full px-3 py-2 rounded-xl border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                      />
                    ) : (
                      <input
                        type="text"
                        value={draft[key] ?? ""}
                        onChange={(e) => setDraft((d) => ({ ...d, [key]: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl border border-input text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    )}
                    <div className="flex justify-end mt-2">
                      <button
                        onClick={() => handleSave(key)}
                        disabled={!hasChanged(key) || saving === key}
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 text-white font-semibold rounded-lg transition disabled:opacity-40"
                        style={{ backgroundColor: "hsl(var(--brand-navy))" }}
                        onMouseEnter={(e) =>
                          !(!hasChanged(key) || saving === key) &&
                          ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                            "hsl(var(--brand-teal))")
                        }
                        onMouseLeave={(e) =>
                          ((e.currentTarget as HTMLButtonElement).style.backgroundColor =
                            "hsl(var(--brand-navy))")
                        }
                      >
                        {saving === key && (
                          <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        )}
                        <Save className="w-3 h-3" />
                        Guardar
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
