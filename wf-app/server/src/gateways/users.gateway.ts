import { User } from "../types";

export interface UserGateway{
    findOrCreateUser(githubID: string, githubUserName: string, githubEmail: string): Promise<User> 
}