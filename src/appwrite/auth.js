import config from "../config/config";
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client(); 
    account;

    constructor() {
        this.client
        .setEndpoint(config.appwrite_url)
        .setProject(config.appwrite_project_id);
        
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        const userAccount = await this.account.create(ID.unique() ,email, password, name);

        if (userAccount) {
            //call another method i.e if user account exists, then login the user
            return this.login({email, password})
        } else {
            return userAccount
        }
    }

    async login({email, password}) {
        return await this.account.createEmailSession(email, password);
    }

    async getCurrentUser() {
        return await this.account.get();
    }

    async logout() {
        return await this.account.deleteSessions()
    }
}

const authService = new AuthService()

export default authService;