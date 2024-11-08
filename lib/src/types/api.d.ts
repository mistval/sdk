import { SchemaObject } from "openapi3-ts";
export interface MethodAPI {
    methodName: string;
    apiMethodName?: string;
    isWrite: boolean;
    deprecated?: true;
    description?: string;
    dtoSchema?: SchemaObject;
    responseSchema?: SchemaObject;
    sequence?: MethodAPI[];
}
export interface ContractAPI {
    contractVersion: string;
    contractName: string;
    methods: MethodAPI[];
}
