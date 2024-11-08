import { ChainCallDTO, ClassConstructor } from "@gala-chain/api";
import { BrowserProvider } from "ethers";
import { Listener, MetaMaskEvents } from "./helpers";
import { GalaChainResponseSuccess, SigningType } from "./types";
import { ConstructorArgs } from "./types/utils";
type NonArrayClassConstructor<T> = T extends Array<unknown> ? ClassConstructor<T[number]> : ClassConstructor<T>;
export interface GalaChainProviderOptions {
    signingType?: SigningType;
    legacyCredentials?: {
        identityLookupKey: string;
        userEncryptionKey: string;
    };
}
export declare abstract class GalaChainProvider {
    protected options?: GalaChainProviderOptions | undefined;
    private legacyCredentials;
    constructor(options?: GalaChainProviderOptions | undefined);
    abstract sign<T extends object>(method: string, dto: T, signingType?: SigningType): Promise<T & {
        signature: string;
        prefix?: string;
    }>;
    submit<T, U extends object>({ url, method, payload, sign, headers, requestConstructor, responseConstructor, signingType }: {
        url: string;
        method: string;
        payload: ConstructorArgs<U>;
        sign?: boolean;
        headers?: Record<string, string>;
        requestConstructor?: ClassConstructor<ChainCallDTO>;
        responseConstructor?: NonArrayClassConstructor<T>;
        signingType?: SigningType;
    }): Promise<GalaChainResponseSuccess<T>>;
}
export declare abstract class CustomClient extends GalaChainProvider {
    constructor(options?: GalaChainProviderOptions);
    abstract getPublicKey(): Promise<{
        publicKey: string;
        recoveredAddress: string;
    }>;
    abstract ethereumAddress: string;
    abstract galaChainAddress: string;
    calculatePersonalSignPrefix(payload: object): string;
}
export declare abstract class WebSigner extends CustomClient {
    protected address: string;
    protected provider: BrowserProvider | undefined;
    constructor(options?: GalaChainProviderOptions);
    abstract connect(): Promise<string>;
    set ethereumAddress(val: string);
    get ethereumAddress(): string;
    get galaChainAddress(): string;
    private eventEmitter;
    on(event: keyof MetaMaskEvents, listener: Listener<string | string[] | null>): this;
    off(event: keyof MetaMaskEvents, listener: Listener<string | string[] | null>): this;
    emit(event: keyof MetaMaskEvents, data: string[] | string | null): boolean;
    getPublicKey(): Promise<{
        publicKey: string;
        recoveredAddress: string;
    }>;
    signMessage(message: string): Promise<string>;
}
export {};
