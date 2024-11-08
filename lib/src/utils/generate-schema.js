"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResponseSchema = exports.generateSchema = void 0;
/*
 * Copyright (c) Gala Games Inc. All rights reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
const storage_1 = require("class-transformer/cjs/storage");
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
const error_1 = require("./error");
class GenerateSchemaError extends error_1.RuntimeError {
}
function customTargetConstructorToSchema(classType) {
    const schema = (0, class_validator_jsonschema_1.targetConstructorToSchema)(classType, {
        additionalConverters: {
            ["enumProperty"]: (meta) => {
                const [values, , enumValuesInfo] = meta.constraints; // this is by convention in this decorator
                const type = values.every((v) => typeof v === "number")
                    ? { type: "number" }
                    : {};
                const schemaObj = {
                    ...type,
                    enum: values,
                    description: enumValuesInfo
                };
                return schemaObj;
            },
            ["IsUserAliasConstraint"]: (meta) => {
                return {
                    type: "string",
                    description: "Allowed value is string following the format of 'client|<user-id>', or 'eth|<checksumed-eth-addr>', or valid system-level username."
                };
            }
        },
        classTransformerMetadataStorage: storage_1.defaultMetadataStorage
    });
    return schema;
}
function isPrimitive(x) {
    return x === "number" || x === "string" || x === "boolean" || x === "null" || x === "object";
}
function isPrimitiveOrUndef(x) {
    return isPrimitive(x) || x === undefined;
}
function updateDefinitions(object, rootClass, property) {
    var _a;
    // Replace BigNumber with string
    if (object["$ref"] === "#/definitions/BigNumber") {
        delete object["$ref"];
        object.type = "string";
        object.description = (((_a = object.description) !== null && _a !== void 0 ? _a : "") + " Number provided as a string.").trim();
        return;
    }
    // Update items type in Arrays
    if (object["type"] === "array") {
        if (object.items && typeof object.items === "object") {
            updateDefinitions(object.items, rootClass, property);
        }
        return;
    }
    // Try to get type from registry and expand it
    if (object["$ref"] && typeof object["$ref"] === "string" && object["$ref"].startsWith("#/definitions/")) {
        try {
            const typeMetadata = storage_1.defaultMetadataStorage.findTypeMetadata(rootClass, property);
            if (typeMetadata === undefined) {
                const className = object["$ref"].replace("#/definitions/", "");
                throw new GenerateSchemaError(`Cannot find type metadata of ${className} for property ${property}`);
            }
            if (typeof typeMetadata.typeFunction !== "function") {
                throw new GenerateSchemaError(`reflectedType of ${typeMetadata} is not a function`);
            }
            const classType = typeMetadata.typeFunction();
            const schema = customTargetConstructorToSchema(classType);
            updateDefinitions(schema, classType, undefined);
            Object.keys(schema).map((k) => {
                var _a, _b;
                if (k === "description") {
                    // descriptions are appended, not overwritten
                    object[k] = `${(_a = object[k]) !== null && _a !== void 0 ? _a : ""} ${(_b = schema[k]) !== null && _b !== void 0 ? _b : ""}`.trim();
                }
                else {
                    object[k] = schema[k];
                }
            });
        }
        catch (e) {
            console.error("Error processing schema:", e.message);
        }
        finally {
            object.type = "object";
            delete object["$ref"];
        }
        return;
    }
    Object.entries(object).forEach(([property, v]) => {
        if (typeof v === "object" && !!v) {
            updateDefinitions(v, rootClass, property);
        }
    });
}
function generateSchema(classType) {
    const schema = customTargetConstructorToSchema(classType);
    updateDefinitions(schema, classType, undefined);
    return schema;
}
exports.generateSchema = generateSchema;
function generateResponseSchema(type, isArray) {
    const objectSchema = isPrimitiveOrUndef(type)
        ? { type: type !== null && type !== void 0 ? type : "null" }
        : generateSchema(type);
    const responseDataSchema = isArray === "array" ? { type: "array", items: objectSchema } : objectSchema;
    return {
        type: "object",
        properties: {
            Status: {
                enum: [0, 1],
                description: "Indicates Error (0) or Success (1)"
            },
            Message: {
                type: "string"
            },
            Data: responseDataSchema
        },
        required: ["Status"]
    };
}
exports.generateResponseSchema = generateResponseSchema;
//# sourceMappingURL=generate-schema.js.map