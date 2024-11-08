import { GalaChainProvider, GalaChainProviderOptions } from "../GalaChainClient";
/**
 * Use this provider when you simply want to forward presigned requests, or requests that do not require a signature
 */
export declare class PresignedClient extends GalaChainProvider {
    constructor(options?: GalaChainProviderOptions);
    sign<U extends object>(_method: string, payload: U & {
        signature: string;
        prefix?: string;
    }): Promise<U & {
        signature: string;
        prefix?: string | undefined;
    }>;
}