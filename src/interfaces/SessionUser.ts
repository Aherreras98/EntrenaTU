import { Session, User } from "@supabase/supabase-js";

export interface SessionUser {
  [x: string]: any;
  user: User | null;
  session: Session | null;
}