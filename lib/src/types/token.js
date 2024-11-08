"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferTokenDto = exports.FetchBalancesWithTokenMetadataResponse = exports.TokenBalanceWithMetadata = exports.FetchBalancesWithPaginationDto = exports.FetchBalancesDto = exports.UpdateTokenClassDto = exports.CreateTokenClassDto = exports.FetchTokenInstancesDto = exports.FetchTokenClassesResponse = exports.FetchTokenClassesWithPaginationDto = exports.FetchTokenClassesDto = void 0;
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
const TokenBalance_1 = require("./TokenBalance");
const TokenClass_1 = require("./TokenClass");
const TokenInstance_1 = require("./TokenInstance");
const dtos_1 = require("./dtos");
let FetchTokenClassesDto = class FetchTokenClassesDto extends dtos_1.ChainCallDTO {
};
exports.FetchTokenClassesDto = FetchTokenClassesDto;
tslib_1.__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => TokenClass_1.TokenClassKey),
    (0, class_validator_1.ArrayNotEmpty)(),
    tslib_1.__metadata("design:type", Array)
], FetchTokenClassesDto.prototype, "tokenClasses", void 0);
exports.FetchTokenClassesDto = FetchTokenClassesDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Contains list of objects representing token classes to fetch."
    })
], FetchTokenClassesDto);
let FetchTokenClassesWithPaginationDto = class FetchTokenClassesWithPaginationDto extends dtos_1.ChainCallDTO {
};
exports.FetchTokenClassesWithPaginationDto = FetchTokenClassesWithPaginationDto;
FetchTokenClassesWithPaginationDto.MAX_LIMIT = 10 * 1000;
FetchTokenClassesWithPaginationDto.DEFAULT_LIMIT = 1000;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token collection. Optional, but required if category is provided."
    }),
    (0, class_validator_1.ValidateIf)((o) => !!o.category),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchTokenClassesWithPaginationDto.prototype, "collection", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token category. Optional, but required if type is provided."
    }),
    (0, class_validator_1.ValidateIf)((o) => !!o.type),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchTokenClassesWithPaginationDto.prototype, "category", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token type. Optional, but required if additionalKey is provided."
    }),
    (0, class_validator_1.ValidateIf)((o) => !!o.additionalKey),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchTokenClassesWithPaginationDto.prototype, "type", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token additionalKey. Optional, but required if instance is provided."
    }),
    (0, class_validator_1.ValidateIf)((o) => !!o.instance),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchTokenClassesWithPaginationDto.prototype, "additionalKey", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Page bookmark. If it is undefined, then the first page is returned."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchTokenClassesWithPaginationDto.prototype, "bookmark", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: `Page size limit. ` +
            `Defaults to ${FetchTokenClassesWithPaginationDto.DEFAULT_LIMIT}, max possible value ${FetchTokenClassesWithPaginationDto.MAX_LIMIT}. ` +
            "Note you will likely get less results than the limit, because the limit is applied before additional filtering."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Max)(FetchTokenClassesWithPaginationDto.MAX_LIMIT),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsInt)(),
    tslib_1.__metadata("design:type", Number)
], FetchTokenClassesWithPaginationDto.prototype, "limit", void 0);
exports.FetchTokenClassesWithPaginationDto = FetchTokenClassesWithPaginationDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Fetch token classes currently available in world state. Supports filtering, " +
            "pagination, and optionality of TokenClassKey properties."
    })
], FetchTokenClassesWithPaginationDto);
class FetchTokenClassesResponse extends dtos_1.ChainCallDTO {
}
exports.FetchTokenClassesResponse = FetchTokenClassesResponse;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: "List of Token Classes." }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => TokenClass_1.TokenClass),
    tslib_1.__metadata("design:type", Array)
], FetchTokenClassesResponse.prototype, "results", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: "Next page bookmark." }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], FetchTokenClassesResponse.prototype, "nextPageBookmark", void 0);
let FetchTokenInstancesDto = class FetchTokenInstancesDto extends dtos_1.ChainCallDTO {
};
exports.FetchTokenInstancesDto = FetchTokenInstancesDto;
tslib_1.__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => TokenInstance_1.TokenInstanceKey),
    (0, class_validator_1.ArrayNotEmpty)(),
    tslib_1.__metadata("design:type", Array)
], FetchTokenInstancesDto.prototype, "tokenInstances", void 0);
exports.FetchTokenInstancesDto = FetchTokenInstancesDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Contains list of objects representing token instances to fetch."
    })
], FetchTokenInstancesDto);
let CreateTokenClassDto = class CreateTokenClassDto extends dtos_1.ChainCallDTO {
};
exports.CreateTokenClassDto = CreateTokenClassDto;
CreateTokenClassDto.DEFAULT_NETWORK = "GC";
CreateTokenClassDto.DEFAULT_DECIMALS = 0;
CreateTokenClassDto.DEFAULT_MAX_CAPACITY = new bignumber_js_1.default("Infinity");
CreateTokenClassDto.DEFAULT_MAX_SUPPLY = new bignumber_js_1.default("Infinity");
CreateTokenClassDto.INITIAL_MINT_ALLOWANCE = new bignumber_js_1.default("0");
CreateTokenClassDto.INITIAL_TOTAL_SUPPLY = new bignumber_js_1.default("0");
CreateTokenClassDto.INITIAL_TOTAL_BURNED = new bignumber_js_1.default("0");
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: `A network of the token. An optional field, by default set to ${CreateTokenClassDto.DEFAULT_NETWORK}. ` +
            `Custom value is required when we want to use different network than ${CreateTokenClassDto.DEFAULT_NETWORK} ` +
            `to store tokens (but this is not supported yet).`
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateTokenClassDto.prototype, "network", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: `If missing, and for NFTs, it is set to ${CreateTokenClassDto.DEFAULT_DECIMALS}.`
    }),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(32),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], CreateTokenClassDto.prototype, "decimals", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: `If missing, set to ${CreateTokenClassDto.DEFAULT_MAX_CAPACITY}.`
    }),
    (0, class_validator_1.IsOptional)(),
    (0, validators_1.BigNumberIsPositive)(),
    (0, validators_1.BigNumberProperty)({ allowInfinity: true }),
    tslib_1.__metadata("design:type", bignumber_js_1.default)
], CreateTokenClassDto.prototype, "maxCapacity", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: `If missing, set to infinity ${CreateTokenClassDto.DEFAULT_MAX_SUPPLY}.`
    }),
    (0, class_validator_1.IsOptional)(),
    (0, validators_1.BigNumberIsPositive)(),
    (0, validators_1.BigNumberProperty)({ allowInfinity: true }),
    tslib_1.__metadata("design:type", bignumber_js_1.default)
], CreateTokenClassDto.prototype, "maxSupply", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "A unique identifier of this token."
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => TokenClass_1.TokenClassKey),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", TokenClass_1.TokenClassKey)
], CreateTokenClassDto.prototype, "tokenClass", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(200),
    tslib_1.__metadata("design:type", String)
], CreateTokenClassDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.MaxLength)(20),
    (0, class_validator_1.IsAlpha)(),
    tslib_1.__metadata("design:type", String)
], CreateTokenClassDto.prototype, "symbol", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(1000),
    tslib_1.__metadata("design:type", String)
], CreateTokenClassDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: `How much units or how many NFTs were allowed to be minted in the past. ` +
            `By default set to ${CreateTokenClassDto.INITIAL_MINT_ALLOWANCE}.`
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, validators_1.BigNumberIsNotNegative)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.default)
], CreateTokenClassDto.prototype, "totalMintAllowance", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: `How much units or how many NFTs are already on the market. ` +
            `By default set to ${CreateTokenClassDto.INITIAL_TOTAL_SUPPLY}.`
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, validators_1.BigNumberIsNotNegative)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.default)
], CreateTokenClassDto.prototype, "totalSupply", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: `How much units or how many NFTs ware already burned. ` +
            `By default set to ${CreateTokenClassDto.INITIAL_TOTAL_BURNED}.`
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, validators_1.BigNumberIsNotNegative)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.default)
], CreateTokenClassDto.prototype, "totalBurned", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(500),
    tslib_1.__metadata("design:type", String)
], CreateTokenClassDto.prototype, "contractAddress", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(500),
    tslib_1.__metadata("design:type", String)
], CreateTokenClassDto.prototype, "metadataAddress", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "How rare is the NFT"
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsAlpha)(),
    tslib_1.__metadata("design:type", String)
], CreateTokenClassDto.prototype, "rarity", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsUrl)(),
    tslib_1.__metadata("design:type", String)
], CreateTokenClassDto.prototype, "image", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Determines if the token is an NFT. Set to false if missing."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], CreateTokenClassDto.prototype, "isNonFungible", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "List of chain user identifiers who should become token authorities. " +
            "Only token authorities can give mint allowances. " +
            "By default the calling user becomes a single token authority. "
    }),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    tslib_1.__metadata("design:type", Array)
], CreateTokenClassDto.prototype, "authorities", void 0);
exports.CreateTokenClassDto = CreateTokenClassDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Contains properties of token class to be created. Actual token units and NFT instances are created on mint."
    })
], CreateTokenClassDto);
class UpdateTokenClassDto extends dtos_1.ChainCallDTO {
}
exports.UpdateTokenClassDto = UpdateTokenClassDto;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "The unique identifier of the existing token which will be updated."
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => TokenClass_1.TokenClassKey),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", TokenClass_1.TokenClassKey)
], UpdateTokenClassDto.prototype, "tokenClass", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(200),
    tslib_1.__metadata("design:type", String)
], UpdateTokenClassDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(20),
    (0, class_validator_1.IsAlpha)(),
    tslib_1.__metadata("design:type", String)
], UpdateTokenClassDto.prototype, "symbol", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MaxLength)(1000),
    tslib_1.__metadata("design:type", String)
], UpdateTokenClassDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(500),
    tslib_1.__metadata("design:type", String)
], UpdateTokenClassDto.prototype, "contractAddress", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(500),
    tslib_1.__metadata("design:type", String)
], UpdateTokenClassDto.prototype, "metadataAddress", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "How rare is the NFT"
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsAlpha)(),
    tslib_1.__metadata("design:type", String)
], UpdateTokenClassDto.prototype, "rarity", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    tslib_1.__metadata("design:type", String)
], UpdateTokenClassDto.prototype, "image", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "List of chain user identifiers who should become token authorities. " +
            "Only token authorities can give mint allowances. " +
            "By default the calling user becomes a single token authority. "
    }),
    (0, validators_1.IsUserAlias)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    tslib_1.__metadata("design:type", Array)
], UpdateTokenClassDto.prototype, "authorities", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Overwrite existing authorities completely with new values. Default: false. " +
            "The default behavior will augment the existing authorities with new values. " +
            "Set this to true and provide a full list to remove one or more existing authorities."
    }),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Boolean)
], UpdateTokenClassDto.prototype, "overwriteAuthorities", void 0);
let FetchBalancesDto = class FetchBalancesDto extends dtos_1.ChainCallDTO {
};
exports.FetchBalancesDto = FetchBalancesDto;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Person who owns the balance. If the value is missing, chaincode caller is used."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], FetchBalancesDto.prototype, "owner", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token collection. Optional, but required if category is provided."
    }),
    (0, class_validator_1.ValidateIf)((o) => !!o.category),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchBalancesDto.prototype, "collection", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token category. Optional, but required if type is provided."
    }),
    (0, class_validator_1.ValidateIf)((o) => !!o.type),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchBalancesDto.prototype, "category", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token type. Optional, but required if additionalKey is provided."
    }),
    (0, class_validator_1.ValidateIf)((o) => !!o.additionalKey),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchBalancesDto.prototype, "type", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token additionalKey."
    }),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], FetchBalancesDto.prototype, "additionalKey", void 0);
exports.FetchBalancesDto = FetchBalancesDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Contains parameters for fetching balances. Each parameter is optional."
    })
], FetchBalancesDto);
let FetchBalancesWithPaginationDto = class FetchBalancesWithPaginationDto extends dtos_1.ChainCallDTO {
};
exports.FetchBalancesWithPaginationDto = FetchBalancesWithPaginationDto;
FetchBalancesWithPaginationDto.MAX_LIMIT = 10 * 1000;
FetchBalancesWithPaginationDto.DEFAULT_LIMIT = 1000;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Person who owns the balance. If the value is missing, chaincode caller is used."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], FetchBalancesWithPaginationDto.prototype, "owner", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token collection. Optional, but required if category is provided."
    }),
    (0, class_validator_1.ValidateIf)((o) => !!o.category),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchBalancesWithPaginationDto.prototype, "collection", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token category. Optional, but required if type is provided."
    }),
    (0, class_validator_1.ValidateIf)((o) => !!o.type),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchBalancesWithPaginationDto.prototype, "category", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token type. Optional, but required if additionalKey is provided."
    }),
    (0, class_validator_1.ValidateIf)((o) => !!o.additionalKey),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchBalancesWithPaginationDto.prototype, "type", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token additionalKey."
    }),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], FetchBalancesWithPaginationDto.prototype, "additionalKey", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Page bookmark. If it is undefined, then the first page is returned."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchBalancesWithPaginationDto.prototype, "bookmark", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: `Page size limit. ` +
            `Defaults to ${FetchBalancesWithPaginationDto.DEFAULT_LIMIT}, max possible value ${FetchBalancesWithPaginationDto.MAX_LIMIT}. ` +
            "Note you will likely get less results than the limit, because the limit is applied before additional filtering."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Max)(FetchBalancesWithPaginationDto.MAX_LIMIT),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsInt)(),
    tslib_1.__metadata("design:type", Number)
], FetchBalancesWithPaginationDto.prototype, "limit", void 0);
exports.FetchBalancesWithPaginationDto = FetchBalancesWithPaginationDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Contains parameters for fetching balances. Each parameter is optional."
    })
], FetchBalancesWithPaginationDto);
let TokenBalanceWithMetadata = class TokenBalanceWithMetadata extends dtos_1.ChainCallDTO {
};
exports.TokenBalanceWithMetadata = TokenBalanceWithMetadata;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "A TokenBalance read of chain."
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => TokenBalance_1.TokenBalance),
    (0, class_validator_1.IsObject)(),
    tslib_1.__metadata("design:type", TokenBalance_1.TokenBalance)
], TokenBalanceWithMetadata.prototype, "balance", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "The TokenClass metadata corresponding to the TokenBalance on this DTO."
    }),
    (0, class_transformer_1.Type)(() => TokenClass_1.TokenClass),
    (0, class_validator_1.IsObject)(),
    tslib_1.__metadata("design:type", TokenClass_1.TokenClass)
], TokenBalanceWithMetadata.prototype, "token", void 0);
exports.TokenBalanceWithMetadata = TokenBalanceWithMetadata = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Response DTO containing a TokenBalance and the balance's corresponding TokenClass."
    })
], TokenBalanceWithMetadata);
class FetchBalancesWithTokenMetadataResponse extends dtos_1.ChainCallDTO {
}
exports.FetchBalancesWithTokenMetadataResponse = FetchBalancesWithTokenMetadataResponse;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: "List of balances with token metadata." }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => TokenBalanceWithMetadata),
    tslib_1.__metadata("design:type", Array)
], FetchBalancesWithTokenMetadataResponse.prototype, "results", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: "Next page bookmark." }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], FetchBalancesWithTokenMetadataResponse.prototype, "nextPageBookmark", void 0);
let TransferTokenDto = class TransferTokenDto extends dtos_1.ChainCallDTO {
};
exports.TransferTokenDto = TransferTokenDto;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "The current owner of tokens. If the value is missing, chaincode caller is used."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], TransferTokenDto.prototype, "from", void 0);
tslib_1.__decorate([
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], TransferTokenDto.prototype, "to", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token instance of token to be transferred. In case of fungible tokens, tokenInstance.instance field " +
            `should be set to ${TokenInstance_1.TokenInstance.FUNGIBLE_TOKEN_INSTANCE}.`
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => TokenInstance_1.TokenInstanceKey),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", TokenInstance_1.TokenInstanceKey)
], TransferTokenDto.prototype, "tokenInstance", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "The quantity of token units to be transferred."
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, validators_1.BigNumberIsNotNegative)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.default)
], TransferTokenDto.prototype, "quantity", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Allowance ids to be used on transferToken (optional)."
    }),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    tslib_1.__metadata("design:type", Array)
], TransferTokenDto.prototype, "useAllowances", void 0);
exports.TransferTokenDto = TransferTokenDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Experimental: After submitting request to RequestMintAllowance, follow up with FulfillMintAllowance."
    })
], TransferTokenDto);
//# sourceMappingURL=token.js.map