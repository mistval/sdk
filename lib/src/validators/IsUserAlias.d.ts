import { ValidationOptions } from "class-validator";
/**
 * @description
 *
 * Used to register a decorator for class validation.
 * Validates against IsUserAliasConstraint.
 * See also IsUserAliasConstraint, validateUserAlias.
 * As of 2024-10, The following alias types
 * are supported: legacy client| and service| prefixed aliases,
 * eth| and ton| prefixed addresses, and internally reserved identities.
 *
 * @param options
 *
 */
export declare function IsUserAlias(options?: ValidationOptions): (object: object, propertyName: string) => void;
