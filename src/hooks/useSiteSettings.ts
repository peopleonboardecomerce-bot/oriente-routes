import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useSiteSettings(keys: string[]) {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("site_settings")
      .select("key, value")
      .in("key", keys)
      .then(({ data }) => {
        if (data) {
          const map: Record<string, string> = {};
          data.forEach((s) => { map[s.key] = s.value; });
          setSettings(map);
        }
        setLoading(false);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keys.join(",")]);

  return { settings, loading };
}
