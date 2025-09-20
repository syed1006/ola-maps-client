import { FetchClientConfig } from "src/types";
import { HttpMethods } from "src/types/common";
import { v4 as uuidv4 } from "uuid";

export class FetchClient {
    private baseURL: string;
    private defaultHeaders: Record<string, string>;

    constructor(config: FetchClientConfig) {
        this.baseURL = config.baseURL.replace(/\/$/, "");
        this.defaultHeaders = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            ...config.headers,
        };
    }

    private buildQueryString(params: Record<string, any>): string {
        const filteredParams = Object.entries(params).filter(
            ([_, value]) => value !== undefined && value !== null
        );

        if (filteredParams.length === 0) {
            return "";
        }

        const searchParams = new URLSearchParams();
        filteredParams.forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((item) => searchParams.append(key, String(item)));
            } else {
                searchParams.append(key, String(value));
            }
        });

        return `?${searchParams.toString()}`;
    }

    private async request<T = any>(
        endpoint: string,
        options: RequestInit = {},
        queryParams?: Record<string, any>
    ): Promise<T> {
        let url = `${this.baseURL}${endpoint.startsWith("/") ? endpoint : "/" + endpoint}`;

        if (queryParams) {
            url += this.buildQueryString(queryParams);
        }

        const config: RequestInit = {
            ...options,
            headers: {
                "X-Request-Id": uuidv4(),
                "X-Correlation-Id": uuidv4(),
                ...this.defaultHeaders,
                ...options.headers,
            },
        };

        const response = await fetch(url, config);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const contentType = response.headers.get("content-type");
        if (contentType?.includes("application/json")) {
            return response.json() as T;
        }

        return response.text() as T;
    }

    get<T = any>(
        endpoint: string,
        options?: {
            headers?: Record<string, string>;
            params?: Record<string, any>;
        }
    ): Promise<T> {
        return this.request<T>(
            endpoint,
            { method: HttpMethods.GET, headers: options?.headers },
            options?.params
        );
    }

    post<T = any>(
        endpoint: string,
        data?: any,
        options?: {
            headers?: Record<string, string>;
            params?: Record<string, any>;
        }
    ): Promise<T> {
        return this.request<T>(
            endpoint,
            {
                method: HttpMethods.POST,
                body: data ? JSON.stringify(data) : undefined,
                headers: options?.headers,
            },
            options?.params
        );
    }

    put<T = any>(
        endpoint: string,
        data?: any,
        options?: {
            headers?: Record<string, string>;
            params?: Record<string, any>;
        }
    ): Promise<T> {
        return this.request<T>(
            endpoint,
            {
                method: HttpMethods.PUT,
                body: data ? JSON.stringify(data) : undefined,
                headers: options?.headers,
            },
            options?.params
        );
    }

    delete<T = any>(
        endpoint: string,
        options?: {
            headers?: Record<string, string>;
            params?: Record<string, any>;
        }
    ): Promise<T> {
        return this.request<T>(
            endpoint,
            { method: HttpMethods.DELETE, headers: options?.headers },
            options?.params
        );
    }
}
