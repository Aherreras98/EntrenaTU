import type { User } from '@supabase/supabase-js'

// src/interfaces/SignUpData.ts
export interface SignUpData {
    username: string;
    email: string;
    age: number | string;
    password: string;
    confirmPassword: string;
}