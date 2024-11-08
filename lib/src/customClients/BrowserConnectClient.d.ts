import { Eip1193Provider } from "ethers";
import { GalaChainProviderOptions, WebSigner } from "../GalaChainClient";
import { ExtendedEip1193Provider } from "../helpers";
import { SigningType } from "../types";
declare global {
    interface Window {
        ethereum?: ExtendedEip1193Provider;
    }
}
export declare class BrowserConnectClient extends WebSigner {
    protected isInitialized: boolean;
    constructor(provider?: Eip1193Provider, options?: GalaChainProviderOptions);
    /**
     * Initializes the listeners to watch for events from the provider. Not all providers may support every event
     */
    protected initializeListeners(): void;
    protected onAccountsChanged(accounts: string[]): void;
    connect(): Promise<string>;
    disconnect(): void;
    sign<T extends object>(method: string, payload: T, signingType?: SigningType): Promise<T & {
        signature: string;
        prefix: string;
    }>;
}
