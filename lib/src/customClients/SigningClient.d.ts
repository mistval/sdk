import { CustomClient, GalaChainProviderOptions } from "../GalaChainClient";
import { SigningType } from "../types";
export declare class SigningClient extends CustomClient {
    get ethereumAddress(): string;
    get galaChainAddress(): string;
    getPublicKey(): Promise<{
        publicKey: string;
        recoveredAddress: string;
    }>;
    private wallet;
    constructor(privateKey: string, options?: GalaChainProviderOptions);
    sign<U extends object>(method: string, payload: U, signingType?: SigningType): Promise<U & {
        signature: string;
        prefix?: string;
    }>;
}