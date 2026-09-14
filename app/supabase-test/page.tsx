import { createClient } from "@/supabase/server";

export default async function SupabaseTestPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("offices")
    .select("id, name")
    .limit(5);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Supabase Connection Test</h1>

      <pre className="mt-4 rounded-lg border p-4">
        {JSON.stringify(
          {
            data,
            error: error?.message ?? null,
          },
          null,
          2,
        )}
      </pre>
    </main>
  );
}
