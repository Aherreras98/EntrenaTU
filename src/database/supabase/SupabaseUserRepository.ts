import { UserRepository } from "../repositories/UserRepository";
import { SignUpData } from "../../interfaces/SignUpData";
import { supabase } from "./client"; 
import { SessionUser } from "../../interfaces/SessionUser";

export class SupabaseUserRepository implements UserRepository {
    
async createUser(user: SignUpData): Promise<{ error: any; }> {

        // Crear el usuario en Autenticación
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

        if (authError) return { error: authError };

        //Guardar los datos en la tabla pública Profiles
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

            if (dbError) return { error: dbError };
        }

        return { error: null };
    }

    // Inicia sesión (Verificación)
    async login(email: string, password: string): Promise<{ data?: SessionUser; error?: any }> {
        // Autenticación con Supabase
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (authError) return { error: authError };

        if (!authData.user) {
            return { error: { message: 'No se recibió información del usuario' } };
        }

        // Recuperar el perfil de la tabla pública para completar el SessionUser
        const { data: profile, error: profileError } = await supabase
            .from('Profiles')
            .select('*')
            .eq('id', authData.user.id)
            .single();

        if (profileError) {
            // Si el perfil no existe, cerramos la sesión por seguridad
            await this.logout();
            return { error: profileError };
        }

        // Devolvemos el objeto que usará Zustand
        return { 
            data: {
                user: authData.user,
                profile: profile,
         session: authData.session 
        } 
    }
    }


    // Cierra la sesión
    async logout(): Promise<{ error?: any }> {
        const { error } = await supabase.auth.signOut();
        return { error };
    }

    
    // Recuperación de contraseña por Email
    async recoverPassword(email: string): Promise<{ error?: any }> {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            // Redirige al usuario a la página de actualización tras el email
            redirectTo: `${window.location.origin}/update-password`,
        });
        return { error };
    }
}

    
