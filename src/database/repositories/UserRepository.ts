import { SignUpData } from "../../interfaces/SignUpData";

export interface UserRepository {
    register(user: SignUpData): Promise<string | null>;

    
}