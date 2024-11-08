"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestedTestClass = void 0;
const tslib_1 = require("tslib");
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
const bignumber_js_1 = tslib_1.__importDefault(require("bignumber.js"));
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
const types_1 = require("../types");
const validators_1 = require("../validators");
const generate_schema_1 = require("./generate-schema");
var YesNoEnum;
(function (YesNoEnum) {
    YesNoEnum[YesNoEnum["Yes"] = 0] = "Yes";
    YesNoEnum[YesNoEnum["No"] = 1] = "No";
})(YesNoEnum || (YesNoEnum = {}));
class TestCategory {
}
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TestCategory.prototype, "name", void 0);
let NestedTestClass = class NestedTestClass {
};
exports.NestedTestClass = NestedTestClass;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], NestedTestClass.prototype, "collection", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: "Test category" }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => TestCategory),
    tslib_1.__metadata("design:type", Array)
], NestedTestClass.prototype, "categories", void 0);
exports.NestedTestClass = NestedTestClass = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: "Nested test class." })
], NestedTestClass);
let TestDto = class TestDto extends types_1.ChainCallDTO {
};
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: "First part of the description." }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => NestedTestClass),
    tslib_1.__metadata("design:type", NestedTestClass)
], TestDto.prototype, "nestedClass", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: "Quantity used in some place to support some feature." }),
    (0, validators_1.BigNumberProperty)(),
    (0, validators_1.BigNumberIsPositive)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", bignumber_js_1.default)
], TestDto.prototype, "quantity", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Type)(() => bignumber_js_1.default),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.ArrayNotEmpty)(),
    tslib_1.__metadata("design:type", Array)
], TestDto.prototype, "quantities", void 0);
tslib_1.__decorate([
    (0, validators_1.EnumProperty)(YesNoEnum),
    tslib_1.__metadata("design:type", Number)
], TestDto.prototype, "amITestClass", void 0);
TestDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: "Some test DTO class" })
], TestDto);
const expectedNestedTestClassSchema = {
    properties: {
        collection: { minLength: 1, type: "string" },
        categories: {
            items: {
                properties: { name: { minLength: 1, type: "string" } },
                type: "object",
                required: ["name"]
            },
            type: "array",
            description: "Test category"
        }
    },
    type: "object",
    required: ["collection", "categories"],
    description: "Nested test class."
};
const expectedTestDtoSchema = {
    description: "Some test DTO class",
    properties: {
        nestedClass: {
            ...expectedNestedTestClassSchema,
            description: `First part of the description. ${expectedNestedTestClassSchema.description}`
        },
        quantity: {
            description: "Quantity used in some place to support some feature. Number provided as a string.",
            type: "string"
        },
        signerAddress: {
            description: "Address of the user who signed the DTO. Typically Ethereum or TON address.",
            minLength: 1,
            type: "string"
        },
        signature: {
            description: expect.stringContaining("Signature of the DTO signed with caller's private key"),
            minLength: 1,
            type: "string"
        },
        signerPublicKey: {
            description: "Public key of the user who signed the DTO.",
            minLength: 1,
            type: "string"
        },
        signing: {
            description: 'Signing scheme used for the signature. "ETH" for Ethereum, and "TON" for The Open Network are supported. Default: "ETH".',
            enum: ["ETH", "TON"],
            type: "string"
        },
        uniqueKey: {
            description: "Unique key of the DTO. It is used to prevent double execution of the same transaction on chain. " +
                "The key is saved on chain and checked before execution. " +
                "If a DTO with already saved key is used in transaction, the transaction will fail with " +
                "UniqueTransactionConflict error, which is mapped to HTTP 409 Conflict error. " +
                "In case of the error, no changes are saved to chain state.\n" +
                "The key is generated by the caller and should be unique for each DTO. " +
                "You can use `nanoid` library, UUID scheme, or any tool to generate unique string keys.",
            minLength: 1,
            type: "string"
        },
        prefix: {
            description: "Prefix for Metamask transaction signatures. Necessary to format payloads correctly to recover publicKey from web3 signatures.",
            minLength: 1,
            type: "string"
        },
        quantities: {
            items: {
                description: "Number provided as a string.",
                type: "string"
            },
            minItems: 1,
            type: "array"
        },
        amITestClass: {
            description: "0 - Yes, 1 - No",
            enum: [0, 1],
            type: "number"
        }
    },
    type: "object",
    required: ["nestedClass", "quantities", "amITestClass"]
};
const expectedTestDtoResponseSchema = {
    properties: {
        Data: expectedTestDtoSchema,
        Message: {
            type: "string"
        },
        Status: {
            description: "Indicates Error (0) or Success (1)",
            enum: [0, 1]
        }
    },
    required: ["Status"],
    type: "object"
};
it("should generateSchema of NestedTestClass", async () => {
    expect((0, generate_schema_1.generateSchema)(NestedTestClass)).toEqual(expectedNestedTestClassSchema);
});
it("should generateSchema of TestDto", async () => {
    expect((0, generate_schema_1.generateSchema)(TestDto)).toEqual(expectedTestDtoSchema);
});
it("should generateResponseSchema of TestDto", async () => {
    expect((0, generate_schema_1.generateResponseSchema)(TestDto)).toEqual(expectedTestDtoResponseSchema);
});
//# sourceMappingURL=generate-schema.spec.js.map