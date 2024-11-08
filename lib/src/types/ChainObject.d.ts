import { ValidationError } from "class-validator";
import "reflect-metadata";
import { ValidationFailedError } from "../utils";
import { ClassConstructor, Inferred } from "./dtos";
export declare class ObjectValidationFailedError extends ValidationFailedError {
    constructor(errors: ValidationError[]);
}
export declare class InvalidCompositeKeyError extends ValidationFailedError {
    constructor(message: string);
}
export declare abstract class ChainObject {
    static MIN_UNICODE_RUNE_VALUE: string;
    static COMPOSITEKEY_NS: string;
    static ID_SPLIT_CHAR: string;
    static ID_SUB_SPLIT_CHAR: string;
    serialize(): string;
    validate(): Promise<ValidationError[]>;
    validateOrReject(): Promise<void>;
    toPlainObject(): Record<string, unknown>;
    static deserialize<T>(constructor: ClassConstructor<Inferred<T, ChainObject>>, object: string | Record<string, unknown> | Record<string, unknown>[]): T;
    getCompositeKey(): string;
    static getCompositeKeyFromParts(indexKey: string, parts: unknown[]): string;
    static getStringKeyFromParts(parts: string[]): string;
}
