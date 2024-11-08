"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshAllowancesDto = exports.RefreshAllowanceDto = exports.FullAllowanceCheckResDto = exports.FullAllowanceCheckDto = exports.FulfillMintAllowanceDto = exports.HighThroughputGrantAllowanceDto = exports.GrantAllowanceDto = exports.DeleteAllowancesDto = exports.FetchAllowancesResponse = exports.FetchAllowancesLegacyDto = exports.FetchAllowancesDto = void 0;
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
const validators_1 = require("../validators");
const GrantAllowance_1 = require("./GrantAllowance");
const TokenAllowance_1 = require("./TokenAllowance");
const TokenInstance_1 = require("./TokenInstance");
const common_1 = require("./common");
const dtos_1 = require("./dtos");
let FetchAllowancesDto = class FetchAllowancesDto extends dtos_1.ChainCallDTO {
};
exports.FetchAllowancesDto = FetchAllowancesDto;
FetchAllowancesDto.MAX_LIMIT = 10 * 1000;
FetchAllowancesDto.DEFAULT_LIMIT = 1000;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "A user who can use an allowance."
    }),
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], FetchAllowancesDto.prototype, "grantedTo", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token collection. Optional, but required if category is provided."
    }),
    (0, class_validator_1.ValidateIf)((o) => !!o.category),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchAllowancesDto.prototype, "collection", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token category. Optional, but required if type is provided."
    }),
    (0, class_validator_1.ValidateIf)((o) => !!o.type),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchAllowancesDto.prototype, "category", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token type. Optional, but required if additionalKey is provided."
    }),
    (0, class_validator_1.ValidateIf)((o) => !!o.additionalKey),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchAllowancesDto.prototype, "type", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token additionalKey. Optional, but required if instance is provided."
    }),
    (0, class_validator_1.ValidateIf)((o) => !!o.instance),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchAllowancesDto.prototype, "additionalKey", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token instance. Optional, but required if allowanceType is provided"
    }),
    (0, class_validator_1.ValidateIf)((o) => o.allowanceType !== undefined),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchAllowancesDto.prototype, "instance", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, validators_1.EnumProperty)(common_1.AllowanceType),
    tslib_1.__metadata("design:type", Number)
], FetchAllowancesDto.prototype, "allowanceType", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "User who granted allowances."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], FetchAllowancesDto.prototype, "grantedBy", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Page bookmark. If it is undefined, then the first page is returned."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchAllowancesDto.prototype, "bookmark", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: `Page size limit. ` +
            `Defaults to ${FetchAllowancesDto.DEFAULT_LIMIT}, max possible value ${FetchAllowancesDto.MAX_LIMIT}. ` +
            "Note you will likely get less results than the limit, because the limit is applied before additional filtering."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Max)(FetchAllowancesDto.MAX_LIMIT),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsInt)(),
    tslib_1.__metadata("design:type", Number)
], FetchAllowancesDto.prototype, "limit", void 0);
exports.FetchAllowancesDto = FetchAllowancesDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Contains parameters for fetching allowances with pagination."
    })
], FetchAllowancesDto);
let FetchAllowancesLegacyDto = class FetchAllowancesLegacyDto extends dtos_1.ChainCallDTO {
};
exports.FetchAllowancesLegacyDto = FetchAllowancesLegacyDto;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "A user who can use an allowance."
    }),
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], FetchAllowancesLegacyDto.prototype, "grantedTo", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token collection. Optional, but required if category is provided."
    }),
    (0, class_validator_1.ValidateIf)((o) => !!o.category),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchAllowancesLegacyDto.prototype, "collection", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token category. Optional, but required if type is provided."
    }),
    (0, class_validator_1.ValidateIf)((o) => !!o.type),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchAllowancesLegacyDto.prototype, "category", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token type. Optional, but required if additionalKey is provided."
    }),
    (0, class_validator_1.ValidateIf)((o) => !!o.additionalKey),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchAllowancesLegacyDto.prototype, "type", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token additionalKey. Optional, but required if instance is provided."
    }),
    (0, class_validator_1.ValidateIf)((o) => !!o.instance),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchAllowancesLegacyDto.prototype, "additionalKey", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token instance. Optional, but required if allowanceType is provided"
    }),
    (0, class_validator_1.ValidateIf)((o) => o.allowanceType !== undefined),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchAllowancesLegacyDto.prototype, "instance", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, validators_1.EnumProperty)(common_1.AllowanceType),
    tslib_1.__metadata("design:type", Number)
], FetchAllowancesLegacyDto.prototype, "allowanceType", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "User who granted allowances."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], FetchAllowancesLegacyDto.prototype, "grantedBy", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Page bookmark. If it is undefined, then the first page is returned."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchAllowancesLegacyDto.prototype, "bookmark", void 0);
exports.FetchAllowancesLegacyDto = FetchAllowancesLegacyDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Contains parameters for fetching allowances. " +
            "Deprecated since 2023-05-29. Please use version with pagination."
    })
    /**
     * @deprecated
     */
], FetchAllowancesLegacyDto);
class FetchAllowancesResponse extends dtos_1.ChainCallDTO {
}
exports.FetchAllowancesResponse = FetchAllowancesResponse;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: "List of allowances." }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => TokenAllowance_1.TokenAllowance),
    tslib_1.__metadata("design:type", Array)
], FetchAllowancesResponse.prototype, "results", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: "Next page bookmark." }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], FetchAllowancesResponse.prototype, "nextPageBookmark", void 0);
let DeleteAllowancesDto = class DeleteAllowancesDto extends dtos_1.ChainCallDTO {
};
exports.DeleteAllowancesDto = DeleteAllowancesDto;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "A user who can use an allowance."
    }),
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], DeleteAllowancesDto.prototype, "grantedTo", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "User who granted allowances."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], DeleteAllowancesDto.prototype, "grantedBy", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token collection. Optional, but required if category is provided."
    }),
    (0, class_validator_1.ValidateIf)((o) => !!o.category),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], DeleteAllowancesDto.prototype, "collection", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token category. Optional, but required if type is provided."
    }),
    (0, class_validator_1.ValidateIf)((o) => !!o.type),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], DeleteAllowancesDto.prototype, "category", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token type. Optional, but required if additionalKey is provided."
    }),
    (0, class_validator_1.ValidateIf)((o) => !!o.additionalKey),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], DeleteAllowancesDto.prototype, "type", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token additionalKey. Optional, but required if instance is provided."
    }),
    (0, class_validator_1.ValidateIf)((o) => !!o.instance),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], DeleteAllowancesDto.prototype, "additionalKey", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token instance. Optional, but required if allowanceType is provided"
    }),
    (0, class_validator_1.ValidateIf)((o) => o.allowanceType !== undefined),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], DeleteAllowancesDto.prototype, "instance", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, validators_1.EnumProperty)(common_1.AllowanceType),
    tslib_1.__metadata("design:type", Number)
], DeleteAllowancesDto.prototype, "allowanceType", void 0);
exports.DeleteAllowancesDto = DeleteAllowancesDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Contains parameters for deleting allowances for a calling user."
    })
], DeleteAllowancesDto);
let GrantAllowanceDto = class GrantAllowanceDto extends dtos_1.ChainCallDTO {
};
exports.GrantAllowanceDto = GrantAllowanceDto;
GrantAllowanceDto.DEFAULT_EXPIRES = 0;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token instance of token which the allowance concerns. " +
            "In case of fungible tokens, tokenInstance.instance field " +
            `should be set to ${TokenInstance_1.TokenInstance.FUNGIBLE_TOKEN_INSTANCE}.`
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => TokenInstance_1.TokenInstanceQueryKey),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", TokenInstance_1.TokenInstanceQueryKey)
], GrantAllowanceDto.prototype, "tokenInstance", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "List of objects with user and token quantities. " + "The user fields must be unique"
    }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => GrantAllowance_1.GrantAllowanceQuantity),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, validators_1.ArrayUniqueObjects)("user"),
    tslib_1.__metadata("design:type", Array)
], GrantAllowanceDto.prototype, "quantities", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, validators_1.EnumProperty)(common_1.AllowanceType),
    tslib_1.__metadata("design:type", Number)
], GrantAllowanceDto.prototype, "allowanceType", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "How many times each allowance can be used."
    }),
    (0, validators_1.BigNumberIsPositive)(),
    (0, validators_1.BigNumberProperty)({ allowInfinity: true }),
    tslib_1.__metadata("design:type", bignumber_js_1.default)
], GrantAllowanceDto.prototype, "uses", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Unix timestamp of the date when the allowances should expire. 0 means that it won' expire. " +
            `By default set to ${GrantAllowanceDto.DEFAULT_EXPIRES}.`
    }),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], GrantAllowanceDto.prototype, "expires", void 0);
exports.GrantAllowanceDto = GrantAllowanceDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Defines allowances to be created."
    })
], GrantAllowanceDto);
/**
 * Experimental: Defines allowances to be created. High-throughput implementation.
 *
 * @experimental 2023-03-23
 */
let HighThroughputGrantAllowanceDto = class HighThroughputGrantAllowanceDto extends dtos_1.ChainCallDTO {
};
exports.HighThroughputGrantAllowanceDto = HighThroughputGrantAllowanceDto;
// todo: remove all these duplicated properties
// it seems something about our @GalaTransaction decorator does not pass through
// parent properties. Leaving this class empty with just the `extends GrantAllowanceDto`
// results in an api definition with no property except the signature.
// update: using extends GrantAllowanceDto causes issues with property validation and failure
HighThroughputGrantAllowanceDto.DEFAULT_EXPIRES = 0;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token instance of token which the allowance concerns. " +
            "In case of fungible tokens, tokenInstance.instance field " +
            `should be set to ${TokenInstance_1.TokenInstance.FUNGIBLE_TOKEN_INSTANCE}.`
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => TokenInstance_1.TokenInstanceQueryKey),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", TokenInstance_1.TokenInstanceQueryKey)
], HighThroughputGrantAllowanceDto.prototype, "tokenInstance", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "List of objects with user and token quantities. " + "The user fields must be unique"
    }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => GrantAllowance_1.GrantAllowanceQuantity),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, validators_1.ArrayUniqueObjects)("user"),
    tslib_1.__metadata("design:type", Array)
], HighThroughputGrantAllowanceDto.prototype, "quantities", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, validators_1.EnumProperty)(common_1.AllowanceType),
    tslib_1.__metadata("design:type", Number)
], HighThroughputGrantAllowanceDto.prototype, "allowanceType", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "How many times each allowance can be used."
    }),
    (0, validators_1.BigNumberIsPositive)(),
    (0, validators_1.BigNumberIsInteger)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.default)
], HighThroughputGrantAllowanceDto.prototype, "uses", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Unix timestamp of the date when the allowances should expire. 0 means that it won' expire. " +
            `By default set to ${GrantAllowanceDto.DEFAULT_EXPIRES}.`
    }),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], HighThroughputGrantAllowanceDto.prototype, "expires", void 0);
exports.HighThroughputGrantAllowanceDto = HighThroughputGrantAllowanceDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Experimental: Defines allowances to be created. High-throughput implementation. " +
            "DTO properties backwards-compatible with prior GrantAllowanceDto, with the " +
            "exception that this implementation only supports AllowanceType.Mint."
    })
], HighThroughputGrantAllowanceDto);
let FulfillMintAllowanceDto = class FulfillMintAllowanceDto extends dtos_1.ChainCallDTO {
};
exports.FulfillMintAllowanceDto = FulfillMintAllowanceDto;
FulfillMintAllowanceDto.MAX_ARR_SIZE = 1000;
tslib_1.__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => common_1.MintRequestDto),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.ArrayMaxSize)(FulfillMintAllowanceDto.MAX_ARR_SIZE),
    (0, validators_1.ArrayUniqueObjects)("id"),
    tslib_1.__metadata("design:type", Array)
], FulfillMintAllowanceDto.prototype, "requests", void 0);
exports.FulfillMintAllowanceDto = FulfillMintAllowanceDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Experimental: After submitting request to RequestMintAllowance, follow up with FulfillMintAllowance."
    })
], FulfillMintAllowanceDto);
let FullAllowanceCheckDto = class FullAllowanceCheckDto extends dtos_1.ChainCallDTO {
};
exports.FullAllowanceCheckDto = FullAllowanceCheckDto;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Person who owns the balance(s). If the value is missing, chaincode caller is used."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], FullAllowanceCheckDto.prototype, "owner", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Person/UserId to whom allowance(s) were granted. If the value is missing, chaincode caller is used."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], FullAllowanceCheckDto.prototype, "grantedTo", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token collection. Optional."
    }),
    (0, class_validator_1.ValidateIf)((o) => !!o.category),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FullAllowanceCheckDto.prototype, "collection", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token category. Optional, and ignored if collection is not provided."
    }),
    (0, class_validator_1.ValidateIf)((o) => !!o.type),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FullAllowanceCheckDto.prototype, "category", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token type. Optional, and ignored if category is not provded."
    }),
    (0, class_validator_1.ValidateIf)((o) => !!o.additionalKey),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FullAllowanceCheckDto.prototype, "type", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token additionalKey. Optional, and ignored if type is not provided."
    }),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], FullAllowanceCheckDto.prototype, "additionalKey", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "AllowanceType to check. Default: Use (0)"
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], FullAllowanceCheckDto.prototype, "allowanceType", void 0);
exports.FullAllowanceCheckDto = FullAllowanceCheckDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Fetch one or more balances, verify all owned TokenInstances have at least one available " +
            "allowance of the specified type. Any token instance key(s) with no available allowances will " +
            "be returned in the response."
    })
], FullAllowanceCheckDto);
let FullAllowanceCheckResDto = class FullAllowanceCheckResDto extends dtos_1.ChainCallDTO {
};
exports.FullAllowanceCheckResDto = FullAllowanceCheckResDto;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "True if all resulting token(s) have active/un-expired allowances available."
    }),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], FullAllowanceCheckResDto.prototype, "all", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "TokenInstanceKey(s) of any tokens missing the requested AllowanceType."
    }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => TokenInstance_1.TokenInstanceKey),
    (0, class_validator_1.ArrayNotEmpty)(),
    tslib_1.__metadata("design:type", Array)
], FullAllowanceCheckResDto.prototype, "missing", void 0);
exports.FullAllowanceCheckResDto = FullAllowanceCheckResDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Response Data Transfer Object for FullLockAllowance request."
    })
], FullAllowanceCheckResDto);
let RefreshAllowanceDto = class RefreshAllowanceDto extends dtos_1.ChainCallDTO {
};
exports.RefreshAllowanceDto = RefreshAllowanceDto;
tslib_1.__decorate([
    (0, class_transformer_1.Type)(() => common_1.AllowanceKey),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", common_1.AllowanceKey)
], RefreshAllowanceDto.prototype, "allowanceKey", void 0);
tslib_1.__decorate([
    (0, validators_1.BigNumberIsPositive)(),
    (0, validators_1.BigNumberIsInteger)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.default)
], RefreshAllowanceDto.prototype, "uses", void 0);
tslib_1.__decorate([
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsInt)(),
    tslib_1.__metadata("design:type", Number)
], RefreshAllowanceDto.prototype, "expires", void 0);
exports.RefreshAllowanceDto = RefreshAllowanceDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Refresh the uses or expiration date of an existing allowance. " +
            "If quantity needs updating, grant a new allowance instead."
    })
], RefreshAllowanceDto);
let RefreshAllowancesDto = class RefreshAllowancesDto extends dtos_1.ChainCallDTO {
};
exports.RefreshAllowancesDto = RefreshAllowancesDto;
tslib_1.__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => RefreshAllowanceDto),
    (0, class_validator_1.ArrayNotEmpty)(),
    tslib_1.__metadata("design:type", Array)
], RefreshAllowancesDto.prototype, "allowances", void 0);
exports.RefreshAllowancesDto = RefreshAllowancesDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Refresh the uses or expiration date of an existing allowance. " +
            "If quantity needs updating, grant a new allowance instead."
    })
], RefreshAllowancesDto);
//# sourceMappingURL=allowance.js.map