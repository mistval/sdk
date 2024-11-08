/// <reference types="node" />
import { getPayloadToSign } from "./getPayloadToSign";
export declare enum SigningScheme {
    ETH = "ETH",
    TON = "TON"
}
declare const _default: {
    readonly getPayloadToSign: typeof getPayloadToSign;
    readonly calculateKeccak256: (data: Buffer) => Buffer;
    readonly enforceValidPublicKey: (signature: string | undefined, payload: object, publicKey: string | undefined) => string;
    readonly genKeyPair: () => {
        privateKey: string;
        publicKey: string;
    };
    readonly getCompactBase64PublicKey: (publicKey: string) => string;
    readonly getNonCompactHexPublicKey: (publicKey: string) => string;
    readonly getEthAddress: (publicKey: string) => string;
    readonly getPublicKey: (privateKey: string) => string;
    readonly getSignature: (obj: object, privateKey: Buffer) => string;
    readonly getDERSignature: (obj: object, privateKey: Buffer) => string;
    readonly isChecksumedEthAddress: (address: string) => boolean;
    readonly isLowercasedEthAddress: (address: string) => boolean;
    readonly isValid: (signature: string, obj: object, publicKey: string) => boolean;
    readonly isValidBase64: (input: string) => boolean;
    readonly isValidHex: (input: string) => boolean;
    readonly isValidSecp256k1Signature: (signature: import("./eth").Secp256k1Signature, dataHash: Buffer, publicKey: Buffer) => boolean;
    readonly normalizeEthAddress: (address: string) => string;
    readonly normalizePrivateKey: (input: string) => Buffer;
    readonly normalizePublicKey: (input: string) => Buffer;
    readonly parseSecp256k1Signature: (s: string) => import("./eth").Secp256k1Signature;
    readonly recoverPublicKey: (signature: string, obj: object, prefix?: string | undefined) => string;
    readonly validatePublicKey: (publicKey: Buffer) => void;
    readonly validateSecp256k1PublicKey: (publicKey: Buffer) => import("elliptic").ec.KeyPair;
};
export default _default;
