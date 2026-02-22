import { SessionUser } from "../../interfaces/SessionUser";
import { SignUpData } from "../../interfaces/SignUpData";



export interface UserRepository {

  createUser(user: SignUpData): Promise<{ error: any }>;


  login(email: string, password: string): Promise<{ data?: SessionUser; error?: any }>;

  
  logout(): Promise<{ error?: any }>;

  
  recoverPassword(email: string): Promise<{ error?: any }>;
  
  updateProfile(userId: string, data: { username?: string; email?: string; height?: number | null; weight?: number | null; unit_system?: string }): Promise<{ error?: any }>;

}