import { UserRepository } from "../repositories/UserRepository";
import { SignUpData } from "../../interfaces/SignUpData";
import { supabase } from "./Client"; // Asegúrate de tener este archivo (te lo dejo abajo por si acaso)

export class SupabaseUserRepository implements UserRepository {

    async createUser(user: SignUpData): Promise<{ error: any }> {
        try {
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: user.email,
                password: user.password,
            });

            if (authError) return { error: authError };
            if (!authData.user) return { error: { message: "No se devolvió un usuario" } };

            const { error: profileError } = await supabase
                .from('Profiles')
                .insert([
                    {
                        id: authData.user.id,
                        username: user.username,
                        age: user.age,
                        email: user.email
                    }
                ]);

            if (profileError) {
                return { error: profileError };
            }

            return { error: null };

        } catch (err: any) {
            return { error: err };
        }
    }
}