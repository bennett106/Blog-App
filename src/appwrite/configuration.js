import config from "../config/config";
import {Client, Databases, Storage, ID, Query} from 'appwrite'

export class databaseServices {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
        .setEndpoint(config.appwrite_url)
        .setProject(config.appwrite_project_id);

        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userID}) {
        try {
            return await this.databases.createDocument(
                config.appwrite_database_id,
                config.appwrite_collection_id,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userID,
                }
            )
        } catch (error) {
            console.log("appwrite services :: createPost :: error ::", error);
        }
    }

    async updatePost(slug ,{title, content, featuredImage, status}) {
        try {
            return await this.databases.updateDocument(
                config.appwrite_database_id,
                config.appwrite_collection_id,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("appwrite services :: updatePost :: error ::", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appwrite_database_id,
                config.appwrite_collection_id,
                slug
            )
            return true
        } catch (error) {
            console.log("appwrite services :: deletePost :: error ::", error);
            return false
        }


    }

    // async getPost(slug) {
    //     try {
    //         return await this.databases.getDocument(slug)
    //     } catch (error) {
    //         console.log("appwrite services :: getPost :: error ::", error);
    //     }
    // }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appwrite_database_id,
                config.appwrite_collection_id,
                slug
            );
        } catch (error) {
            console.log("appwrite services :: getPost :: error ::", error);
        }
    }
    
    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                config.appwrite_database_id,
                config.appwrite_collection_id,
                queries,
                

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }


    async listPost(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.appwrite_database_id,
                config.appwrite_collection_id,
                queries
            )
        } catch (error) {
            console.log("appwrite services :: getPost :: error ::", error);
        }
    }

    async uploadFile(file) {
        try {
            await this.storage.createFile(
                config.appwrite_bucket_id,
                ID.unique(),
                file
            )
            return true
        } catch (error) {
            console.log("appwrite services :: uploadFile :: error ::", error);
            return false
        }
    }

    async deleteFile(fileID) {
        try {
            await this.storage.deleteFile(
                config.appwrite_bucket_id,
                fileID
            )
            return true
        } catch (error) {
            console.log("appwrite services :: deleteFile :: error ::", error);
            return false
        }
    }

    getFilePreview(fileID) {
        try {
            this.storage.getFilePreview(
                config.appwrite_bucket_id,
                fileID
            )
            return true
        } catch (error) {
            console.log("appwrite services :: getFilePreview :: error ::", error);
            return false
        }
    }
}

const service = new databaseServices();
export default service;