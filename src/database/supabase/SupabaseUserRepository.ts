import { UserRepository } from "../repositories/UserRepository";
import { SignUpData } from "../../interfaces/SignUpData";
import { supabase } from "./client";
import { SessionUser } from "../../interfaces/SessionUser";
import { SupabaseStorageRepository } from "./SupabaseStorageRepository";

export class SupabaseUserRepository implements UserRepository {
    
    // Instanciamos el repositorio de storage
    storageRepository = new SupabaseStorageRepository();

    async createUser(user: SignUpData): Promise<{ error: any; }> {
        const { data, error: authError } = await supabase.auth.signUp({
            email: user.email,
            password: user.password as string,
            options: {
                data: {
                    username: user.username,
                    age: user.age
                }
            }
        });

        if (authError) return { error: authError };

        if (data.user) {
            const { error: dbError } = await supabase
                .from('Profiles')
                .insert([{
                    id: data.user.id,
                    username: user.username,
                    email: user.email,
                    age: user.age
                }]);

            if (dbError) return { error: dbError };
        }

        return { error: null };
    }

    async login(email: string, password: string): Promise<{ data?: SessionUser; error?: any }> {
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (authError) return { error: authError };

        if (!authData.user) {
            return { error: { message: 'No se recibió información del usuario' } };
        }

        const { data: profile, error: profileError } = await supabase
            .from('Profiles')
            .select('*')
            .eq('id', authData.user.id)
            .single();

        if (profileError) {
            await this.logout();
            return { error: profileError };
        }

        return {
            data: {
                user: authData.user,
                profile: profile,
                session: authData.session
            }
        }
    }

    async logout(): Promise<{ error?: any }> {
        const { error } = await supabase.auth.signOut();
        return { error };
    }

    async recoverPassword(email: string): Promise<{ error?: any }> {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        });
        return { error };
    }

    async updatePassword(newPassword: string): Promise<{ error?: any }> {
        const { error } = await supabase.auth.updateUser({
            password: newPassword
        });
        return { error };
    }

    async fetchRole(userId: string): Promise<{ data?: string | null, error?: any }> {
        const { data: dataRole, error: fetchRoleError } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', userId)
            .single();

        if (fetchRoleError) return { data: null, error: fetchRoleError };
        return { data: dataRole?.role || null, error: null };
    }

    // ACTUALIZAMOS EL PERFIL CON EL AVATAR
    async updateProfile(userId: string, data: {
        username?: string;
        email?: string;
        avatar_file?: File; 
        height?: number | null;
        weight?: number | null;
        unit_system?: string;
    }): Promise<{ data?: any, error?: any }> {
        
        let avatar_url = undefined;

        // Si nos pasan una foto, la subimos primero al Storage
        if (data.avatar_file) {
            const fileExt = data.avatar_file.name.split('.').pop();
            const uploadedFilePath = `${userId}/avatar.${fileExt}`;

            const { data: uploadData, error: uploadError } = await this.storageRepository.uploadFile(
                'avatars',
                uploadedFilePath,
                data.avatar_file
            );

            if (uploadError) return { error: uploadError };
            avatar_url = uploadData?.publicUrl; 
        }

        // Preparamos los datos a modificar en la tabla Profiles
        const updateData: any = {};
        if (data.username) updateData.username = data.username;
        if (avatar_url) updateData.avatar_url = avatar_url;

        // Hacemos el UPDATE en la base de datos
        const { error } = await supabase
            .from('Profiles')
            .update(updateData)
            .eq('id', userId);

        if (error) return { error };
        
        // Devolvemos la nueva URL para que la interfaz pueda actualizarse al instante
        return { data: { avatar_url } };
    }
}


