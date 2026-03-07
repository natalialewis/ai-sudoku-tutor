import type { User } from "@supabase/supabase-js";
import { createSupabaseClient } from "@/lib/supabase/server";

/**
 * Get the currently authenticated user on the server (Server Components, route handlers, server actions).
 * Returns null if not authenticated. Does not redirect; use requireUser() or redirect when you need protection.
 */
export async function getUser(): Promise<User | null> {
  const supabase = await createSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}
