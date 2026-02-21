import { SessionUser } from "../../interfaces/SessionUser";
import { SignUpData } from "../../interfaces/SignUpData";



export interface UserRepository {

  createUser(user: SignUpData): Promise<{ error: any }>;


  login(email: string, password: string): Promise<{ data?: SessionUser; error?: any }>;

  
  logout(): Promise<{ error?: any }>;

  
  recoverPassword(email: string): Promise<{ error?: any }>;

}