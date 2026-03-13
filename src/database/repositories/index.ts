import { SupabaseUserRepository } from "../supabase/SupabaseUserRepository";
import { UserRepository } from "./UserRepository";

const userRepository: UserRepository = new SupabaseUserRepository();

export { userRepository };