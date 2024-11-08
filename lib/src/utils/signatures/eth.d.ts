/// <reference types="node" />
import BN from "bn.js";
import { ec as EC, ec } from "elliptic";
import { ValidationFailedError } from "../error";
export declare class InvalidSignatureFormatError extends ValidationFailedError {
}
declare function normalizePrivateKey(input: string): Buffer;
declare function normalizePublicKey(input: string): Buffer;
declare function getCompactBase64PublicKey(publicKey: string): string;
declare function getNonCompactHexPublicKey(publicKey: string): string;
declare function getPublicKey(privateKey: string): string;
declare function getEthAddress(publicKey: string): string;
declare function isLowercasedEthAddress(address: string): boolean;
declare function isChecksumedEthAddress(address: string): boolean;
declare function normalizeEthAddress(address: string): string;
export interface Secp256k1Signature {
    r: BN;
    s: BN;
    recoveryParam: number | undefined;
}
declare function parseSecp256k1Signature(s: string): Secp256k1Signature;
export declare function normalizeSecp256k1Signature(s: string): Secp256k1Signature;
export declare function flipSignatureParity<T extends EC.Signature | Secp256k1Signature>(signatureObj: T): T;
declare function validateSecp256k1PublicKey(publicKey: Buffer): ec.KeyPair;
declare function isValidSecp256k1Signature(signature: Secp256k1Signature, dataHash: Buffer, publicKey: Buffer): boolean;
declare function calculateKeccak256(data: Buffer): Buffer;
declare function getSignature(obj: object, privateKey: Buffer): string;
declare function getDERSignature(obj: object, privateKey: Buffer): string;
declare function recoverPublicKey(signature: string, obj: object, prefix?: string): string;
declare function isValid(signature: string, obj: object, publicKey: string): boolean;
declare function validatePublicKey(publicKey: Buffer): void;
declare function enforceValidPublicKey(signature: string | undefined, payload: object, publicKey: string | undefined): string;
declare function isValidHex(input: string): boolean;
declare function isValidBase64(input: string): boolean;
declare function genKeyPair(): {
    privateKey: string;
    publicKey: string;
};
declare const _default: {
    readonly calculateKeccak256: typeof calculateKeccak256;
    readonly enforceValidPublicKey: typeof enforceValidPublicKey;
    readonly genKeyPair: typeof genKeyPair;
    readonly getCompactBase64PublicKey: typeof getCompactBase64PublicKey;
    readonly getNonCompactHexPublicKey: typeof getNonCompactHexPublicKey;
    readonly getEthAddress: typeof getEthAddress;
    readonly getPublicKey: typeof getPublicKey;
    readonly getSignature: typeof getSignature;
    readonly getDERSignature: typeof getDERSignature;
    readonly isChecksumedEthAddress: typeof isChecksumedEthAddress;
    readonly isLowercasedEthAddress: typeof isLowercasedEthAddress;
    readonly isValid: typeof isValid;
    readonly isValidBase64: typeof isValidBase64;
    readonly isValidHex: typeof isValidHex;
    readonly isValidSecp256k1Signature: typeof isValidSecp256k1Signature;
    readonly normalizeEthAddress: typeof normalizeEthAddress;
    readonly normalizePrivateKey: typeof normalizePrivateKey;
    readonly normalizePublicKey: typeof normalizePublicKey;
    readonly parseSecp256k1Signature: typeof parseSecp256k1Signature;
    readonly recoverPublicKey: typeof recoverPublicKey;
    readonly validatePublicKey: typeof validatePublicKey;
    readonly validateSecp256k1PublicKey: typeof validateSecp256k1PublicKey;
};
export default _default;