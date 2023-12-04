import { SecretsEnum, SecretsServiceAdapter } from "@/infra";
import { MongoClient, Collection } from "mongodb";

export class DatabaseNoSQLHelper {
    private client: MongoClient;

    constructor(
		private readonly secrets: SecretsServiceAdapter
    ) { }

    async connect(): Promise<void> {
        this.client = await MongoClient.connect(this.secrets.getRequiredSecret(SecretsEnum.DatabaseNoSQLUrl));
    }

    async disconnect(): Promise<void> {
        await this.client.close();
        this.client = null;
    }

    getCollection(name: string): Collection {
        return this.client.db().collection(name);
    }
}