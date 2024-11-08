import { ValidationError } from "class-validator";
import { SigningScheme } from "../utils";
import { GalaChainResponse } from "./contract";
type Base<T, BaseT> = T extends BaseT ? T : never;
export type Inferred<T, BaseT = any> = T extends (infer U)[] ? Base<U, BaseT> : Base<T, BaseT>;
export interface ClassConstructor<T> {
    new (...args: unknown[]): T;
}
export declare const validateDTO: <T extends ChainCallDTO>(dto: T) => Promise<T>;
/**
 * Parses JSON string and creates a Promise with valid DTO. Throws exception in case of validation errors.
 */
export declare const parseValidDTO: <T extends ChainCallDTO>(constructor: ClassConstructor<Inferred<T, ChainCallDTO>>, jsonStringOrObj: string | Record<string, unknown>) => Promise<T>;
type NonFunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];
export type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;
/**
 * Creates valid DTO object from provided plain object. Throws exception in case of validation errors.
 */
export declare const createValidDTO: <T extends ChainCallDTO>(constructor: ClassConstructor<T>, plain: NonFunctionProperties<T>) => Promise<T>;
/**
 * Creates valid signed DTO object from provided plain object. Throws exception in case of validation errors.
 *
 * @deprecated Use `(await createValidDTO(...)).signed(...)` instead
 */
export declare const createAndSignValidDTO: <T extends ChainCallDTO>(constructor: ClassConstructor<T>, plain: NonFunctionProperties<T>, privateKey: string) => Promise<T>;
export interface TraceContext {
    spanId: string;
    traceId: string;
}
/**
 * @description
 *
 * The base DTO (Data Transfer Object) class. Provides common properties and
 * methods for signing, uniqueness, validation, and serialization. All other DTOs in the
 * SDK extend from this base class. To implement custom a custom DTO, create a new class that
 * extends `ChainCallDTO`, and use the `class-validator` npm package to decorate
 * the properties of the new class.
 *
 * @remarks
 *
 * Additional details for specific properties of this class
 * are generated via the `class-validator-jsonschema` npm module and can either
 *  be viewed in the source code
 * or in the OpenAPI documentation served alongside GalaChain's API endpoints.
 */
export declare class ChainCallDTO {
    trace?: TraceContext;
    static readonly ENCODING = "base64";
    uniqueKey?: string;
    signature?: string;
    prefix?: string;
    signerAddress?: string;
    signerPublicKey?: string;
    signing?: SigningScheme;
    validate(): Promise<ValidationError[]>;
    validateOrReject(): Promise<void>;
    /**
     * @description
     *
     * Serialze this object to string in a determinsitic fashion.
     * See Hyperledger Fabric's documentation on
     * [JSON Determinism](https://hyperledger-fabric.readthedocs.io/en/release-2.5/chaincode4ade.html#json-determinism)
     * for more details.
     *
     * @returns string
     */
    serialize(): string;
    /**
     * @description
     *
     * Instantiate a class instance from a serialized object using the provided `ClassConstructor`.
     *
     * @param constructor
     *
     * `ClassConstructor` that extends `ChainCallDTO`
     *
     * @param object
     *
     * serialized string or plain object to be instantiated via the provided `ClassConstructor`
     *
     * @returns
     *
     * An instantiated class created with the provided `ClassConstructor`
     */
    static deserialize<T>(constructor: ClassConstructor<Inferred<T, ChainCallDTO>>, object: string | Record<string, unknown> | Record<string, unknown>[]): T;
    sign(privateKey: string, useDer?: boolean): void;
    /**
     * Creates a signed copy of current object.
     */
    signed(privateKey: string, useDer?: boolean): this;
    isSignatureValid(publicKey: string): boolean;
}
/**
 * @description
 *
 * Input for the `GetObjectByKey` chaincode method defined on the GalaContract class.
 */
export declare class GetObjectDto extends ChainCallDTO {
    readonly objectId: string;
}
/**
 * @description
 *
 * Input for the `GetObjectByHistory` chaincode method defined on the GalaContract class.
 */
export declare class GetObjectHistoryDto extends ChainCallDTO {
    readonly objectId: string;
}
/**
 * @description
 *
 * Input for the `DryRun` chaincode method defined on the GalaContract class.
 * Use a `DryRunDto` and the `DryRun` chaincode method to simulate the
 * execution of a chaincode contract method. The results of the `DryRun`
 * will not be written chain. Instead, the Read/Write set that would have resulted from
 * the transaction will be returned to the consuming client for analysis.
 *
 * @remarks
 *
 * Authorization is not checked for `DryRun` execution. This allows application,
 * administrative, game server identities etc. to simulate a transaction result
 * without prompting the end user to sign the input first. This helps avoid
 * replay attacks (as the unique id would not be written to chain in a DryRun)
 * and also allows applications to present certain outcomes to the end user
 * before they decide to sign and authorize the transaction.
 *
 * Example use case: Executing a `DryRun` on a given method, and then processing
 * the results for `FeeChannelPaymentReceipt` or `FeeUserPaymentReceipt` objects
 * can yield the exepcted/estimated fee prior to executing a transaction. The
 * estimated fee can then be presented to an end user for them to decide whether
 * or not they want to authorize the transaction.
 */
export declare class DryRunDto extends ChainCallDTO {
    /**
     * @description
     *
     * The contract method intended for `DryRun` execution.
     *
     * @example
     *
     * "TransferToken"
     */
    readonly method: string;
    /**
     * @description
     *
     * The identity used for the transaction simulation.
     */
    readonly callerPublicKey: string;
    /**
     * @description
     *
     * A input to be used for the `DryRun` execution. For example, if the
     * method to be `DryRun` is `TransferToken`, then a `TransferTokenDto` should
     * be provided here.
     */
    dto?: ChainCallDTO;
}
/**
 * @description
 *
 * Data Transfer Object (DTO) representing the  results of a successful `DryRun` execution,
 * to be sent back to the  consuming client.
 */
export declare class DryRunResultDto extends ChainCallDTO {
    /**
     * @description
     *
     * The `GalaChainResponse` that would have occurred if the provided inputs had been
     * sent to the provided method, with a valid signature.
     */
    response: GalaChainResponse<unknown>;
    /**
     * @description
     *
     * The `writes` from the Hyperledger Fabric Read/Write set that would have been
     * written to chain, if the provided inputs had been sent to the provided method
     * with a valid signature. See the Hyperledger Fabric documentation on
     * [Valid Transactions](https://hyperledger-fabric.readthedocs.io/en/release-2.5/smartcontract/smartcontract.html#valid-transactions)
     * for more details on the importantce of Read/Write sets.
     */
    writes: Record<string, string>;
    /**
     * @description
     *
     * The `reads` from the Hyperledger Fabric Read/Write set that would have been
     * read from world state, if the provided inputs had been sent to the provided method
     * with a valid signature. See the Hyperledger Fabric documentation on
     * [Valid Transactions](https://hyperledger-fabric.readthedocs.io/en/release-2.5/smartcontract/smartcontract.html#valid-transactions)
     * for more details on the importantce of Read/Write sets.
     */
    reads: Record<string, string>;
    /**
     * @description
     *
     * The `deletes` from the Read/Write set that would have been deleted from
     * world state, if the provided inputs had been sent to the provided method with a
     * valid signature. See the Hyperledger Fabric documentation on
     * [Valid Transactions](https://hyperledger-fabric.readthedocs.io/en/release-2.5/smartcontract/smartcontract.html#valid-transactions)
     * for more details on the importantce of Read/Write sets.
     */
    deletes: Record<string, true>;
}
/**
 * @description
 *
 * Dto for secure method to save public keys for legacy users.
 * Method is called and signed by Curators
 */
export declare class RegisterUserDto extends ChainCallDTO {
    /**
     * @description
     *
     * Id of user to save public key for.
     * Must be a valid user alias. See also @IsUserAlias().
     */
    user: string;
    /**
     * @description Public secp256k1 key (compact or non-compact, hex or base64).
     */
    publicKey: string;
}
/**
 * @description
 *
 * Dto for secure method to save public keys for Eth users.
 * Method is called and signed by Curators
 */
export declare class RegisterEthUserDto extends ChainCallDTO {
    publicKey: string;
}
/**
 * @description
 *
 * Dto for secure method to save public keys for TON users.
 * Method is called and signed by Curators
 */
export declare class RegisterTonUserDto extends ChainCallDTO {
    publicKey: string;
}
export declare class UpdatePublicKeyDto extends ChainCallDTO {
    publicKey: string;
}
export declare class GetPublicKeyDto extends ChainCallDTO {
    user?: string;
}
export declare class GetMyProfileDto extends ChainCallDTO {
    signature: string;
}
export {};
