import { FetchClient } from "src/client/fetch-client";

export class Tiles {
    private client: FetchClient;
    private apiKey: string;

    constructor(client: FetchClient, apiKey: string) {
        this.client = client;
        this.apiKey = apiKey;
    }

    async getDataTileJSON(datasetName: string) {
        return await this.client.get(
            `/tiles/vector/v1/data/${encodeURIComponent(datasetName)}.json`,
            {
                params: {
                    api_key: this.apiKey,
                },
            },
        );
    }

    async getStyles() {
        return await this.client.get("/tiles/vector/v1/styles.json", {
            params: {
                api_key: this.apiKey,
            },
        });
    }

    async getStyleByName(styleName: string) {
        return await this.client.get(
            `/tiles/vector/v1/styles/${encodeURIComponent(styleName)}/style.json`,
            {
                params: {
                    api_key: this.apiKey,
                },
            },
        );
    }
}
