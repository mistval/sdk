"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenBurnCounterCompositeKeyDto = exports.FetchBurnCountersResponse = exports.FetchBurnCountersWithPaginationDto = exports.BurnAndMintDto = exports.BurnTokensDto = exports.FetchBurnsDto = void 0;
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
const BurnTokenQuantity_1 = require("./BurnTokenQuantity");
const TokenBurnCounter_1 = require("./TokenBurnCounter");
const TokenInstance_1 = require("./TokenInstance");
const dtos_1 = require("./dtos");
const mint_1 = require("./mint");
let FetchBurnsDto = class FetchBurnsDto extends dtos_1.ChainCallDTO {
};
exports.FetchBurnsDto = FetchBurnsDto;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "The user who burned the token."
    }),
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], FetchBurnsDto.prototype, "burnedBy", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token collection. Optional, but required if category is provided."
    }),
    (0, class_validator_1.ValidateIf)((o) => !!o.category),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchBurnsDto.prototype, "collection", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token category. Optional, but required if type is provided."
    }),
    (0, class_validator_1.ValidateIf)((o) => !!o.type),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchBurnsDto.prototype, "category", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token type. Optional, but required if additionalKey is provided."
    }),
    (0, class_validator_1.ValidateIf)((o) => !!o.additionalKey),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchBurnsDto.prototype, "type", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token additionalKey. Optional, but required if instance is provided."
    }),
    (0, class_validator_1.ValidateIf)((o) => !!o.instance),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchBurnsDto.prototype, "additionalKey", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token instance. Optional, but required if allowanceType is provided."
    }),
    (0, class_validator_1.ValidateIf)((o) => o.allowanceType !== undefined),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchBurnsDto.prototype, "instance", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Created time. Optional."
    }),
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], FetchBurnsDto.prototype, "created", void 0);
exports.FetchBurnsDto = FetchBurnsDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Contains parameters for fetching burns."
    })
], FetchBurnsDto);
let BurnTokensDto = class BurnTokensDto extends dtos_1.ChainCallDTO {
};
exports.BurnTokensDto = BurnTokensDto;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Array of token instances of token to be burned. In case of fungible tokens, tokenInstance.instance field " +
            `should be set to ${TokenInstance_1.TokenInstance.FUNGIBLE_TOKEN_INSTANCE} and quantity set to 1.`
    }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => BurnTokenQuantity_1.BurnTokenQuantity),
    (0, class_validator_1.ArrayNotEmpty)(),
    tslib_1.__metadata("design:type", Array)
], BurnTokensDto.prototype, "tokenInstances", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Owner of the tokens to be burned. If not provided, the calling user is assumed to be the owner."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], BurnTokensDto.prototype, "owner", void 0);
exports.BurnTokensDto = BurnTokensDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Defines burns to be created."
    })
], BurnTokensDto);
let BurnAndMintDto = class BurnAndMintDto extends dtos_1.ChainCallDTO {
};
exports.BurnAndMintDto = BurnAndMintDto;
BurnAndMintDto.MAX_ARR_SIZE = 1000;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "A valid BurnTokensDto, properly signed by the owner of the tokens to be burned."
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => BurnTokensDto),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", BurnTokensDto)
], BurnAndMintDto.prototype, "burnDto", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "User ID of the identity that owns the tokens to be burned. " +
            "The burnDto signature will be validated against this user's public key on chain."
    }),
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], BurnAndMintDto.prototype, "burnOwner", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "DTOs of tokens to mint."
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => mint_1.BatchMintTokenDto),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", mint_1.BatchMintTokenDto)
], BurnAndMintDto.prototype, "mintDto", void 0);
exports.BurnAndMintDto = BurnAndMintDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Permits an atomic burn-to-mint transaction. Supply the token(s) to be burned, and the token(s) to be minted. " +
            "The `burnDto` and `mintDto` properties should be signed by their respective approving parties: " +
            "As an example for NFTs, the `burnDto` might be signed by the end user that owns the tokens, while " +
            "the mintDto is signed by an NFT token authority with the ability to mint NFTs. " +
            "If the burn is successful, mint the requested token(s)." +
            "Mints are executed under the identity of the calling user of this function. " +
            "All operations occur in the same transaction, meaning either all succeed or none are written to chain."
    })
], BurnAndMintDto);
let FetchBurnCountersWithPaginationDto = class FetchBurnCountersWithPaginationDto extends dtos_1.ChainCallDTO {
};
exports.FetchBurnCountersWithPaginationDto = FetchBurnCountersWithPaginationDto;
FetchBurnCountersWithPaginationDto.MAX_LIMIT = 10 * 1000;
FetchBurnCountersWithPaginationDto.DEFAULT_LIMIT = 1000;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token collection. Optional, but required if category is provided."
    }),
    (0, class_validator_1.ValidateIf)((o) => !!o.category),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchBurnCountersWithPaginationDto.prototype, "collection", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token category. Optional, but required if type is provided."
    }),
    (0, class_validator_1.ValidateIf)((o) => !!o.type),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchBurnCountersWithPaginationDto.prototype, "category", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token type. Optional, but required if additionalKey is provided."
    }),
    (0, class_validator_1.ValidateIf)((o) => !!o.additionalKey),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchBurnCountersWithPaginationDto.prototype, "type", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token additionalKey. Optional, but required if instance is provided."
    }),
    (0, class_validator_1.ValidateIf)((o) => !!o.instance),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchBurnCountersWithPaginationDto.prototype, "additionalKey", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Page bookmark. If it is undefined, then the first page is returned."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchBurnCountersWithPaginationDto.prototype, "bookmark", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: `Page size limit. ` +
            `Defaults to ${FetchBurnCountersWithPaginationDto.DEFAULT_LIMIT}, max possible value ${FetchBurnCountersWithPaginationDto.MAX_LIMIT}. ` +
            "Note you will likely get less results than the limit, because the limit is applied before additional filtering."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Max)(FetchBurnCountersWithPaginationDto.MAX_LIMIT),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsInt)(),
    tslib_1.__metadata("design:type", Number)
], FetchBurnCountersWithPaginationDto.prototype, "limit", void 0);
exports.FetchBurnCountersWithPaginationDto = FetchBurnCountersWithPaginationDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Contains parameters for fetching TokenBurnCounters with pagination."
    })
], FetchBurnCountersWithPaginationDto);
class FetchBurnCountersResponse extends dtos_1.ChainCallDTO {
}
exports.FetchBurnCountersResponse = FetchBurnCountersResponse;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: "List of token burn counters." }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => TokenBurnCounter_1.TokenBurnCounter),
    tslib_1.__metadata("design:type", Array)
], FetchBurnCountersResponse.prototype, "results", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({ description: "Next page bookmark." }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], FetchBurnCountersResponse.prototype, "nextPageBookmark", void 0);
let TokenBurnCounterCompositeKeyDto = class TokenBurnCounterCompositeKeyDto extends dtos_1.ChainCallDTO {
};
exports.TokenBurnCounterCompositeKeyDto = TokenBurnCounterCompositeKeyDto;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token collection."
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenBurnCounterCompositeKeyDto.prototype, "collection", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token category."
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenBurnCounterCompositeKeyDto.prototype, "category", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token type."
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenBurnCounterCompositeKeyDto.prototype, "type", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token additionalKey."
    }),
    (0, class_validator_1.IsDefined)(),
    tslib_1.__metadata("design:type", String)
], TokenBurnCounterCompositeKeyDto.prototype, "additionalKey", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "timeKey of TokenBurnCounter for range reads"
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenBurnCounterCompositeKeyDto.prototype, "timeKey", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "burnedBy user."
    }),
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], TokenBurnCounterCompositeKeyDto.prototype, "burnedBy", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token instance."
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, validators_1.BigNumberIsInteger)(),
    (0, validators_1.BigNumberIsNotNegative)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.default)
], TokenBurnCounterCompositeKeyDto.prototype, "instance", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Known burn counts at time of write, " +
            "discounting concurrent writes that occurred in the same block.."
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.default)
], TokenBurnCounterCompositeKeyDto.prototype, "totalKnownBurnsCount", void 0);
exports.TokenBurnCounterCompositeKeyDto = TokenBurnCounterCompositeKeyDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Key properties representing a TokenBurnCounter."
    })
], TokenBurnCounterCompositeKeyDto);
//# sourceMappingURL=burn.js.map