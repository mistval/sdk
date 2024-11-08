import { NonFunctionProperties } from "@gala-chain/api";
export type PublicProperties<T> = {
    -readonly [K in keyof T]: T[K];
};
type NonFunctionPropertiesAndReplaceRecursive<T> = {
    [K in keyof NonFunctionProperties<T>]: NonFunctionProperties<T>[K] extends object ? NonFunctionPropertiesAndReplaceRecursive<NonFunctionProperties<T>[K]> : NonFunctionProperties<T>[K];
};
export type ConstructorArgs<T> = NonFunctionPropertiesAndReplaceRecursive<T>;
export {};
