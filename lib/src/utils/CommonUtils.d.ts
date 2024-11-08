type EIP712Types = Record<string, Array<{
    name: string;
    type: string;
}>>;
type EIP712Value = Record<string, unknown>;
export declare function generateEIP712Types<T>(typeName: string, params: T): EIP712Types;
export declare function capitalizeFirstLetter(string: string): string;
export declare function generateEIP712Value<T>(params: T): EIP712Value;
export declare function galaChainToEthereumAddress(galaAddress: string): string;
export declare function ethereumToGalaChainAddress(ethereumAddress: string): string;
export {};
