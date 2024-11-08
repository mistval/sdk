"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchTokenMintConfigurationsResponse = exports.FetchTokenMintConfigurationsDto = exports.TokenMintConfigurationDto = exports.PatchMintRequestDto = exports.PatchMintAllowanceRequestDto = exports.FetchTokenSupplyResponse = exports.FetchTokenSupplyDto = exports.FetchMintRequestsDto = exports.FulfillMintDto = exports.HighThroughputMintTokenDto = exports.BatchMintTokenDto = exports.MintTokenWithAllowanceDto = exports.MintTokenDto = void 0;
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
const TokenClass_1 = require("./TokenClass");
const TokenMintConfiguration_1 = require("./TokenMintConfiguration");
const common_1 = require("./common");
const dtos_1 = require("./dtos");
let MintTokenDto = class MintTokenDto extends dtos_1.ChainCallDTO {
};
exports.MintTokenDto = MintTokenDto;
MintTokenDto.MAX_NFT_MINT_SIZE = 1000;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token class of token to be minted."
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => TokenClass_1.TokenClassKey),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", TokenClass_1.TokenClassKey)
], MintTokenDto.prototype, "tokenClass", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "The owner of minted tokens. If the value is missing, chaincode caller is used."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], MintTokenDto.prototype, "owner", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "How many units of Fungible/NonFungible Token will be minted."
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, validators_1.BigNumberIsNotNegative)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.default)
], MintTokenDto.prototype, "quantity", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => common_1.AllowanceKey),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", common_1.AllowanceKey)
], MintTokenDto.prototype, "allowanceKey", void 0);
exports.MintTokenDto = MintTokenDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Describes an action to mint a token. " +
            `For NFTs you can mint up to ${MintTokenDto.MAX_NFT_MINT_SIZE} tokens.`
    })
], MintTokenDto);
let MintTokenWithAllowanceDto = class MintTokenWithAllowanceDto extends dtos_1.ChainCallDTO {
};
exports.MintTokenWithAllowanceDto = MintTokenWithAllowanceDto;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token class of token to be minted."
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => TokenClass_1.TokenClassKey),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", TokenClass_1.TokenClassKey)
], MintTokenWithAllowanceDto.prototype, "tokenClass", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "The owner of minted tokens. If the value is missing, chaincode caller is used."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], MintTokenWithAllowanceDto.prototype, "owner", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Instance of token to be minted"
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, validators_1.BigNumberIsNotNegative)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.default)
], MintTokenWithAllowanceDto.prototype, "tokenInstance", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "How many units of Fungible/NonFungible Token will be minted."
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, validators_1.BigNumberIsNotNegative)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.default)
], MintTokenWithAllowanceDto.prototype, "quantity", void 0);
exports.MintTokenWithAllowanceDto = MintTokenWithAllowanceDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Describes an action to grant allowance to self and mint token to owner in single transaction. " +
            "This action will fail is the calling user lacks the authority to grant MINT allowances."
    })
], MintTokenWithAllowanceDto);
let BatchMintTokenDto = class BatchMintTokenDto extends dtos_1.ChainCallDTO {
};
exports.BatchMintTokenDto = BatchMintTokenDto;
BatchMintTokenDto.MAX_ARR_SIZE = 1000;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "DTOs of tokens to mint."
    }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => MintTokenDto),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.ArrayMaxSize)(BatchMintTokenDto.MAX_ARR_SIZE),
    tslib_1.__metadata("design:type", Array)
], BatchMintTokenDto.prototype, "mintDtos", void 0);
exports.BatchMintTokenDto = BatchMintTokenDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Describes an action to transferToken a token. " +
            `For NFTs you can mint up to ${MintTokenDto.MAX_NFT_MINT_SIZE} tokens.`
    })
], BatchMintTokenDto);
/**
 * Experimental: Defines an action to mint a token. High-throughput implementation.
 *
 * @experimental 2023-03-23
 */
let HighThroughputMintTokenDto = class HighThroughputMintTokenDto extends dtos_1.ChainCallDTO {
};
exports.HighThroughputMintTokenDto = HighThroughputMintTokenDto;
// todo: remove all these duplicated properties
// it seems something about our @GalaTransaction decorator does not pass through
// parent properties. Leaving this class empty with just the `extends MintTokenDto`
// results in an api definition with no property except the signature.
// update: seems extending MintTokenDto results in failures value.toFixed is not a function,
// presumably something about the quantity and our dynamic type/class validator
HighThroughputMintTokenDto.MAX_NFT_MINT_SIZE = 1000;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token class of token to be minted."
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => TokenClass_1.TokenClassKey),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", TokenClass_1.TokenClassKey)
], HighThroughputMintTokenDto.prototype, "tokenClass", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "The owner of minted tokens. If the value is missing, chaincode caller is used."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], HighThroughputMintTokenDto.prototype, "owner", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "How many units of fungible token of how many NFTs are going to be minted."
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, validators_1.BigNumberIsNotNegative)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.default)
], HighThroughputMintTokenDto.prototype, "quantity", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => common_1.AllowanceKey),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", common_1.AllowanceKey)
], HighThroughputMintTokenDto.prototype, "allowanceKey", void 0);
exports.HighThroughputMintTokenDto = HighThroughputMintTokenDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Experimental: Describes an action to mint a token. High-throughput implementation. " +
            "DTO properties backwards-compatible with prior MintTokenDto,"
    })
], HighThroughputMintTokenDto);
let FulfillMintDto = class FulfillMintDto extends dtos_1.ChainCallDTO {
};
exports.FulfillMintDto = FulfillMintDto;
FulfillMintDto.MAX_ARR_SIZE = 1000;
tslib_1.__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => common_1.MintRequestDto),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.ArrayMaxSize)(FulfillMintDto.MAX_ARR_SIZE),
    (0, validators_1.ArrayUniqueObjects)("id"),
    tslib_1.__metadata("design:type", Array)
], FulfillMintDto.prototype, "requests", void 0);
exports.FulfillMintDto = FulfillMintDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Experimental: After submitting request to RequestMintAllowance, follow up with FulfillMintAllowance."
    })
], FulfillMintDto);
let FetchMintRequestsDto = class FetchMintRequestsDto extends dtos_1.ChainCallDTO {
};
exports.FetchMintRequestsDto = FetchMintRequestsDto;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token collection."
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchMintRequestsDto.prototype, "collection", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token category."
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchMintRequestsDto.prototype, "category", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token type."
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchMintRequestsDto.prototype, "type", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token additionalKey."
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchMintRequestsDto.prototype, "additionalKey", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], FetchMintRequestsDto.prototype, "startTimestamp", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], FetchMintRequestsDto.prototype, "endTimestamp", void 0);
exports.FetchMintRequestsDto = FetchMintRequestsDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Fetch MintRequest or MintAllowanceRequest objects off chain."
    })
], FetchMintRequestsDto);
let FetchTokenSupplyDto = class FetchTokenSupplyDto extends dtos_1.ChainCallDTO {
};
exports.FetchTokenSupplyDto = FetchTokenSupplyDto;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token collection."
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchTokenSupplyDto.prototype, "collection", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token category."
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchTokenSupplyDto.prototype, "category", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token type."
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchTokenSupplyDto.prototype, "type", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token additionalKey."
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchTokenSupplyDto.prototype, "additionalKey", void 0);
exports.FetchTokenSupplyDto = FetchTokenSupplyDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Fetch Mint, Burn or Mint Allowance supply totals off chain."
    })
], FetchTokenSupplyDto);
let FetchTokenSupplyResponse = class FetchTokenSupplyResponse extends dtos_1.ChainCallDTO {
};
exports.FetchTokenSupplyResponse = FetchTokenSupplyResponse;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Total known supply at time of chaincode execution."
    }),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.default)
], FetchTokenSupplyResponse.prototype, "supply", void 0);
exports.FetchTokenSupplyResponse = FetchTokenSupplyResponse = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Fetch MintRequest or MintAllowanceRequest objects off chain and return the supply."
    })
], FetchTokenSupplyResponse);
let PatchMintAllowanceRequestDto = class PatchMintAllowanceRequestDto extends dtos_1.ChainCallDTO {
};
exports.PatchMintAllowanceRequestDto = PatchMintAllowanceRequestDto;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token collection."
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], PatchMintAllowanceRequestDto.prototype, "collection", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token category."
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], PatchMintAllowanceRequestDto.prototype, "category", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token type."
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], PatchMintAllowanceRequestDto.prototype, "type", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token additionalKey."
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], PatchMintAllowanceRequestDto.prototype, "additionalKey", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "The total known mint allowances count."
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.default)
], PatchMintAllowanceRequestDto.prototype, "totalKnownMintAllowancesCount", void 0);
exports.PatchMintAllowanceRequestDto = PatchMintAllowanceRequestDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Write a MintAllowanceRequest object to chain. " +
            "Designed to patch, update, or correct the known total supply. " +
            "An administrative / token authority can patch in the chain objects " +
            "needed with an off-chain, correctly-calculated total supply " +
            "such that ongoing high throughput mints/mint allowances are migrated " +
            "to a correct running total."
    })
], PatchMintAllowanceRequestDto);
let PatchMintRequestDto = class PatchMintRequestDto extends dtos_1.ChainCallDTO {
};
exports.PatchMintRequestDto = PatchMintRequestDto;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token collection."
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], PatchMintRequestDto.prototype, "collection", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token category."
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], PatchMintRequestDto.prototype, "category", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token type."
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], PatchMintRequestDto.prototype, "type", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token additionalKey."
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], PatchMintRequestDto.prototype, "additionalKey", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "The total known mint allowances count."
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.default)
], PatchMintRequestDto.prototype, "totalKnownMintsCount", void 0);
exports.PatchMintRequestDto = PatchMintRequestDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Write MintRequest objects to chain. " +
            "Designed to patch, update, or correct the known total supply. " +
            "An administrative / token authority can patch in the chain objects " +
            "needed with an off-chain, correctly-calculated total supply " +
            "such that ongoing high throughput mints/mint allowances are migrated " +
            "to a correct running total."
    })
], PatchMintRequestDto);
let TokenMintConfigurationDto = class TokenMintConfigurationDto extends dtos_1.ChainCallDTO {
};
exports.TokenMintConfigurationDto = TokenMintConfigurationDto;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token collection."
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenMintConfigurationDto.prototype, "collection", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token category."
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenMintConfigurationDto.prototype, "category", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token type."
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenMintConfigurationDto.prototype, "type", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token additionalKey."
    }),
    (0, class_validator_1.IsDefined)(),
    tslib_1.__metadata("design:type", String)
], TokenMintConfigurationDto.prototype, "additionalKey", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "(optional) Specify a `BurnToMintConfiguration` to require a burn equal to a " +
            "percentage of the quantity to-be-minted prior to executing the mint action."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => TokenMintConfiguration_1.BurnToMintConfiguration),
    tslib_1.__metadata("design:type", TokenMintConfiguration_1.BurnToMintConfiguration)
], TokenMintConfigurationDto.prototype, "preMintBurn", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "(optional) Specify a `BurnToMintConfiguration` to enable burning a " +
            "percentage of each quantity minted"
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => TokenMintConfiguration_1.BurnToMintConfiguration),
    tslib_1.__metadata("design:type", TokenMintConfiguration_1.BurnToMintConfiguration)
], TokenMintConfigurationDto.prototype, "postMintBurn", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "(optional) Specify a `PostMintLockConfiguration` to enable " +
            "locking a percentage of each quantity minted"
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => TokenMintConfiguration_1.PostMintLockConfiguration),
    tslib_1.__metadata("design:type", TokenMintConfiguration_1.PostMintLockConfiguration)
], TokenMintConfigurationDto.prototype, "postMintLock", void 0);
exports.TokenMintConfigurationDto = TokenMintConfigurationDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "DTO that describes a TokenMintConfiguration chain object."
    })
], TokenMintConfigurationDto);
let FetchTokenMintConfigurationsDto = class FetchTokenMintConfigurationsDto extends dtos_1.ChainCallDTO {
};
exports.FetchTokenMintConfigurationsDto = FetchTokenMintConfigurationsDto;
FetchTokenMintConfigurationsDto.DEFAULT_LIMIT = 100;
FetchTokenMintConfigurationsDto.MAX_LIMIT = 10000;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token Class collection."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchTokenMintConfigurationsDto.prototype, "collection", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token Class category. Optional, but required if collection is provided."
    }),
    (0, class_validator_1.ValidateIf)((c) => !!c.collection),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchTokenMintConfigurationsDto.prototype, "category", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token Class type. Optional, but required if category is provided."
    }),
    (0, class_validator_1.ValidateIf)((c) => !!c.category),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchTokenMintConfigurationsDto.prototype, "type", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token Class additionalKey. Optional, but required if type is provided. "
    }),
    (0, class_validator_1.ValidateIf)((c) => !!c.type),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchTokenMintConfigurationsDto.prototype, "additionalKey", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Bookmark for paginated queries. Provide the empty string for the first page of results."
    }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], FetchTokenMintConfigurationsDto.prototype, "bookmark", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Page size used to limit the results returned. Default: 100. Max: 10000."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], FetchTokenMintConfigurationsDto.prototype, "limit", void 0);
exports.FetchTokenMintConfigurationsDto = FetchTokenMintConfigurationsDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Query parameters for fetching a paginated results set of TokenMintConfiguration entries"
    })
], FetchTokenMintConfigurationsDto);
let FetchTokenMintConfigurationsResponse = class FetchTokenMintConfigurationsResponse extends dtos_1.ChainCallDTO {
};
exports.FetchTokenMintConfigurationsResponse = FetchTokenMintConfigurationsResponse;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Results set of TokenMintConfiguration entries."
    }),
    tslib_1.__metadata("design:type", Array)
], FetchTokenMintConfigurationsResponse.prototype, "results", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], FetchTokenMintConfigurationsResponse.prototype, "bookmark", void 0);
exports.FetchTokenMintConfigurationsResponse = FetchTokenMintConfigurationsResponse = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "DTO that includes a paginated results set of TokenMintConfiguration objects"
    })
], FetchTokenMintConfigurationsResponse);
//# sourceMappingURL=mint.js.map