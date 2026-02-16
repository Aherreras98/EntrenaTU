import { SignUpData } from "../../interfaces/SignUpData";

export interface UserRepository {
    createUser(user: SignUpData): Promise<{ error: any }>;


}