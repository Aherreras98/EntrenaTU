import { UserRepository } from "../repositories/UserRepository";
import { SignUpData } from "../../interfaces/SignUpData";
import { supabase } from "./Client"; // Asegúrate de tener configurado el cliente de Supabase aquí

export class SupabaseUserRepository implements UserRepository {

    async register(user: SignUpData): Promise<string | null> {
        try {
            const { data, error } = await supabase.auth.signUp({
                email: user.email,
                password: user.password,
                options: {
                    data: {
                        username: user.username,
                        age: user.age,
                    },
                },
            });

            if (error) {
                throw new Error(error.message);
            }

            return data.user?.id || null;

        } catch (error) {
            console.error("Error en el registro:", error);
            throw error;
        }
    }
}