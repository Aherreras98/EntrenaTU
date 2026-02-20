import { UserRepository } from "../repositories/UserRepository";
import { SignUpData } from "../../interfaces/SignUpData";
import { supabase } from "./client"; 

export class SupabaseUserRepository implements UserRepository {
    async createUser(user: SignUpData): Promise<{ error: any; }> {
        // PASO 1: Crear el usuario en Autenticación
        const { data, error: authError } = await supabase.auth.signUp({
            email: user.email,
            password: user.password,
            options: {
                data: {
                    username: user.username,
                    age: user.age
                }
            }
        });

        // Si falla la autenticación, paramos aquí
        if (authError) return { error: authError };

        // PASO 2: Guardar los datos en la tabla pública
        if (data.user) {
            const { error: dbError } = await supabase
                .from('Profiles') 
                .insert([
                    {
                        id: data.user.id, 
                        username: user.username,
                        email: user.email,
                        age: user.age
                    }
                ]);

            // Si falla al guardar en la tabla, devolvemos el error de la base de datos
            if (dbError) return { error: dbError };
        }

        
        return { error: null };
    }
}