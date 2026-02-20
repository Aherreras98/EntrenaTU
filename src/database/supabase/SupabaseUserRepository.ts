import { UserRepository } from "../repositories/UserRepository";
import { SignUpData } from "../../interfaces/SignUpData";
import { supabase } from "./client"; 

export class SupabaseUserRepository implements UserRepository {
    async register(user: SignUpData): Promise<string | null> {
        const { data, error } = await supabase.auth.signUp({
            email: user.email,
            password: user.password,
            options: {
                data: {
                    username: user.username,
                    age: user.age
                }
            }
        });

        if (error) throw new Error(error.message);
        return data.user?.id || null;
    }
}