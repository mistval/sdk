import { SigningScheme } from "../utils";
import { ChainObject } from "./ChainObject";
export declare class PublicKey extends ChainObject {
    publicKey: string;
    signing?: SigningScheme;
}
export declare const PK_INDEX_KEY = "GCPK";
export declare function normalizePublicKey(input: string): string;
