"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CleanTokenSwapsResponse = exports.CleanTokenSwapsDto = exports.EnsureTokenSwapIndexingResponse = exports.EnsureTokenSwapIndexingDto = exports.FetchTokenSwapsWithPaginationResponse = exports.FetchTokenSwapsByUserDto = exports.FetchTokenSwapsByInstanceDto = exports.FetchTokenSwapByRequestIdDto = exports.FetchTokenSwapsDto = exports.TerminateTokenSwapDto = exports.BatchFillTokenSwapDto = exports.FillTokenSwapDto = exports.ExpectedTokenSwap = exports.RequestTokenSwapDto = void 0;
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
const TokenInstance_1 = require("./TokenInstance");
const TokenSwapRequest_1 = require("./TokenSwapRequest");
const dtos_1 = require("./dtos");
let RequestTokenSwapDto = class RequestTokenSwapDto extends dtos_1.ChainCallDTO {
};
exports.RequestTokenSwapDto = RequestTokenSwapDto;
RequestTokenSwapDto.DEFAULT_EXPIRES = 0;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "User who requests the swap, typically an owner of tokens. " +
            "Optional field, by default set to chaincode calling user."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], RequestTokenSwapDto.prototype, "offeredBy", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "User who probably has tokens the requester wants."
    }),
    (0, validators_1.IsDifferentValue)("offeredBy", {
        message: "offeredBy should be different than offeredTo. " +
            "offeredTo can be optional - e.g. a user is offering a swap to any other user willing to fill it " +
            "and their client id is not known at the time the swap is offered."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], RequestTokenSwapDto.prototype, "offeredTo", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "A list of offered token instances."
    }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => TokenInstance_1.TokenInstanceQuantity),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ArrayUnique)(),
    tslib_1.__metadata("design:type", Array)
], RequestTokenSwapDto.prototype, "offered", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "A list of wanted token instances."
    }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => TokenInstance_1.TokenInstanceQuantity),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ArrayUnique)(),
    tslib_1.__metadata("design:type", Array)
], RequestTokenSwapDto.prototype, "wanted", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "How many times swap can filled."
    }),
    (0, validators_1.BigNumberIsPositive)(),
    (0, validators_1.BigNumberIsInteger)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.default)
], RequestTokenSwapDto.prototype, "uses", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Unix timestamp of the date when the swap request should expire. 0 means that it won' expire. " +
            `By default set to ${RequestTokenSwapDto.DEFAULT_EXPIRES}.`
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsInt)(),
    tslib_1.__metadata("design:type", Number)
], RequestTokenSwapDto.prototype, "expires", void 0);
exports.RequestTokenSwapDto = RequestTokenSwapDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Defines a swap request to be created, i.e. a request when a requester " +
            "offers some tokens to another user in exchange of another tokens."
    })
], RequestTokenSwapDto);
let ExpectedTokenSwap = class ExpectedTokenSwap extends dtos_1.ChainCallDTO {
};
exports.ExpectedTokenSwap = ExpectedTokenSwap;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "A list of offered token instances. The order of this array must match the order of the TokenSwapRequest stored on chain."
    }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => TokenInstance_1.TokenInstanceQuantity),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ArrayUnique)(),
    tslib_1.__metadata("design:type", Array)
], ExpectedTokenSwap.prototype, "offered", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "A list of wanted token instances. The order of this array must match the order of the TokenSwapRequest stored on chain."
    }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => TokenInstance_1.TokenInstanceQuantity),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ArrayUnique)(),
    tslib_1.__metadata("design:type", Array)
], ExpectedTokenSwap.prototype, "wanted", void 0);
exports.ExpectedTokenSwap = ExpectedTokenSwap = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Defines an expected token swap trade, i.e. offered and wanted tokens."
    })
], ExpectedTokenSwap);
let FillTokenSwapDto = class FillTokenSwapDto extends dtos_1.ChainCallDTO {
};
exports.FillTokenSwapDto = FillTokenSwapDto;
FillTokenSwapDto.DEFAULT_USES = new bignumber_js_1.default(1);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Swap request ID to be filled"
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FillTokenSwapDto.prototype, "swapRequestId", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Expected token swap trade to be validated before filling the swap."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    tslib_1.__metadata("design:type", ExpectedTokenSwap)
], FillTokenSwapDto.prototype, "expectedTokenSwap", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "User who fills the swap, an owner of tokens wanted in swap. " +
            "Optional field, by default set to chaincode calling user."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], FillTokenSwapDto.prototype, "filledBy", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "How many uses are filled with this swap fill. " +
            `In most cases it will be ${FillTokenSwapDto.DEFAULT_USES}, and this is the default value for it.`
    }),
    (0, class_validator_1.IsOptional)(),
    (0, validators_1.BigNumberIsPositive)(),
    (0, validators_1.BigNumberIsInteger)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.default)
], FillTokenSwapDto.prototype, "uses", void 0);
exports.FillTokenSwapDto = FillTokenSwapDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Defines a swap fill object, i.e. a response of another user for a swap request."
    })
], FillTokenSwapDto);
let BatchFillTokenSwapDto = class BatchFillTokenSwapDto extends dtos_1.ChainCallDTO {
};
exports.BatchFillTokenSwapDto = BatchFillTokenSwapDto;
BatchFillTokenSwapDto.MAX_ARR_SIZE = 1000;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Array of FillTokenSwapDto objects each representing a swap to fulfill"
    }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => FillTokenSwapDto),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.ArrayMaxSize)(BatchFillTokenSwapDto.MAX_ARR_SIZE),
    tslib_1.__metadata("design:type", Array)
], BatchFillTokenSwapDto.prototype, "swapDtos", void 0);
exports.BatchFillTokenSwapDto = BatchFillTokenSwapDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Fill multiple swaps in a single transaction, potentially swaps offered by many different users."
    })
], BatchFillTokenSwapDto);
class TerminateTokenSwapDto extends dtos_1.ChainCallDTO {
}
exports.TerminateTokenSwapDto = TerminateTokenSwapDto;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Swap request ID to be terminated."
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TerminateTokenSwapDto.prototype, "swapRequestId", void 0);
let FetchTokenSwapsDto = class FetchTokenSwapsDto extends dtos_1.ChainCallDTO {
};
exports.FetchTokenSwapsDto = FetchTokenSwapsDto;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "(optional). ChainKey 0 - Created timestamp of swap."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], FetchTokenSwapsDto.prototype, "created", void 0);
exports.FetchTokenSwapsDto = FetchTokenSwapsDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Legacy FetchTokenSwapsDto. Provided created timestamp to limit result, or leave empty to query all swaps."
    })
], FetchTokenSwapsDto);
class FetchTokenSwapByRequestIdDto extends dtos_1.ChainCallDTO {
}
exports.FetchTokenSwapByRequestIdDto = FetchTokenSwapByRequestIdDto;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token swap request ID."
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchTokenSwapByRequestIdDto.prototype, "swapRequestId", void 0);
let FetchTokenSwapsByInstanceDto = class FetchTokenSwapsByInstanceDto extends dtos_1.ChainCallDTO {
};
exports.FetchTokenSwapsByInstanceDto = FetchTokenSwapsByInstanceDto;
FetchTokenSwapsByInstanceDto.MAX_LIMIT = 10 * 1000;
FetchTokenSwapsByInstanceDto.DEFAULT_LIMIT = 1000;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token collection. Optional, but required if category is provided."
    }),
    (0, class_validator_1.ValidateIf)((o) => !!o.category),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchTokenSwapsByInstanceDto.prototype, "collection", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token category. Optional, but required if type is provided."
    }),
    (0, class_validator_1.ValidateIf)((o) => !!o.type),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchTokenSwapsByInstanceDto.prototype, "category", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token type. Optional, but required if additionalKey is provided."
    }),
    (0, class_validator_1.ValidateIf)((o) => !!o.additionalKey),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchTokenSwapsByInstanceDto.prototype, "type", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token additionalKey. Optional, but required if instance is provided."
    }),
    (0, class_validator_1.ValidateIf)((o) => !!o.instance),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchTokenSwapsByInstanceDto.prototype, "additionalKey", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token instance. Optional, but required if allowanceType is provided"
    }),
    (0, class_validator_1.ValidateIf)((o) => o.allowanceType !== undefined),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchTokenSwapsByInstanceDto.prototype, "instance", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Page bookmark. If it is undefined, then the first page is returned."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchTokenSwapsByInstanceDto.prototype, "bookmark", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: `Page size limit. ` +
            `Defaults to ${FetchTokenSwapsByInstanceDto.DEFAULT_LIMIT}, max possible value ${FetchTokenSwapsByInstanceDto.MAX_LIMIT}. ` +
            "Note you will likely get less results than the limit, because the limit is applied before additional filtering."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Max)(FetchTokenSwapsByInstanceDto.MAX_LIMIT),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsInt)(),
    tslib_1.__metadata("design:type", Number)
], FetchTokenSwapsByInstanceDto.prototype, "limit", void 0);
exports.FetchTokenSwapsByInstanceDto = FetchTokenSwapsByInstanceDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Query for TokenSwapRequests by Token Instance properties. Supports pagination."
    })
], FetchTokenSwapsByInstanceDto);
let FetchTokenSwapsByUserDto = class FetchTokenSwapsByUserDto extends dtos_1.ChainCallDTO {
};
exports.FetchTokenSwapsByUserDto = FetchTokenSwapsByUserDto;
FetchTokenSwapsByUserDto.MAX_LIMIT = 10 * 1000;
FetchTokenSwapsByUserDto.DEFAULT_LIMIT = 1000;
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], FetchTokenSwapsByUserDto.prototype, "user", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Page bookmark. If it is undefined, then the first page is returned."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], FetchTokenSwapsByUserDto.prototype, "bookmark", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: `Page size limit. ` +
            `Defaults to ${FetchTokenSwapsByUserDto.DEFAULT_LIMIT}, max possible value ${FetchTokenSwapsByUserDto.MAX_LIMIT}. ` +
            "Note you will likely get less results than the limit, because the limit is applied before additional filtering."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Max)(FetchTokenSwapsByUserDto.MAX_LIMIT),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.IsInt)(),
    tslib_1.__metadata("design:type", Number)
], FetchTokenSwapsByUserDto.prototype, "limit", void 0);
exports.FetchTokenSwapsByUserDto = FetchTokenSwapsByUserDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Query for TokenSwapRequests by User properties (offeredBy/offeredTo). Supports pagination."
    })
], FetchTokenSwapsByUserDto);
let FetchTokenSwapsWithPaginationResponse = class FetchTokenSwapsWithPaginationResponse extends dtos_1.ChainCallDTO {
};
exports.FetchTokenSwapsWithPaginationResponse = FetchTokenSwapsWithPaginationResponse;
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Object)
], FetchTokenSwapsWithPaginationResponse.prototype, "nextPageBookmark", void 0);
tslib_1.__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => TokenSwapRequest_1.TokenSwapRequest),
    tslib_1.__metadata("design:type", Array)
], FetchTokenSwapsWithPaginationResponse.prototype, "results", void 0);
exports.FetchTokenSwapsWithPaginationResponse = FetchTokenSwapsWithPaginationResponse = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Response DTO for FetchTokenSwaps{ByInstanceOffered|ByInstanceWanted|OfferedBy|OfferedTo} methods. Supports pagination."
    })
], FetchTokenSwapsWithPaginationResponse);
let EnsureTokenSwapIndexingDto = class EnsureTokenSwapIndexingDto extends dtos_1.ChainCallDTO {
};
exports.EnsureTokenSwapIndexingDto = EnsureTokenSwapIndexingDto;
tslib_1.__decorate([
    (0, class_validator_1.ArrayNotEmpty)(),
    tslib_1.__metadata("design:type", Array)
], EnsureTokenSwapIndexingDto.prototype, "swapRequestIds", void 0);
exports.EnsureTokenSwapIndexingDto = EnsureTokenSwapIndexingDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Ensure that provided swapRequestId chain objects have proper supporting index Chain Objects. " +
            "This method permits migration / upgrade of TokenSwapRequests written prior to the advent of new index objects " +
            "which were added to support fine-grained querying of TokenSwapRequests by client applications. " +
            "The provided swapRequestIds will be looked up on chain, then their corresponding index Chain objects will be queried and written if necessary."
    })
], EnsureTokenSwapIndexingDto);
let EnsureTokenSwapIndexingResponse = class EnsureTokenSwapIndexingResponse extends dtos_1.ChainCallDTO {
};
exports.EnsureTokenSwapIndexingResponse = EnsureTokenSwapIndexingResponse;
tslib_1.__decorate([
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], EnsureTokenSwapIndexingResponse.prototype, "noOp", void 0);
tslib_1.__decorate([
    (0, class_validator_1.ArrayMinSize)(0),
    tslib_1.__metadata("design:type", Array)
], EnsureTokenSwapIndexingResponse.prototype, "writes", void 0);
exports.EnsureTokenSwapIndexingResponse = EnsureTokenSwapIndexingResponse = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Response DTO for a EnsureTokenSwapIndexing request. If any writes were made, they will be provided in the writes array and noOp will be true."
    })
], EnsureTokenSwapIndexingResponse);
let CleanTokenSwapsDto = class CleanTokenSwapsDto extends dtos_1.ChainCallDTO {
};
exports.CleanTokenSwapsDto = CleanTokenSwapsDto;
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    tslib_1.__metadata("design:type", Array)
], CleanTokenSwapsDto.prototype, "swapRequestIds", void 0);
exports.CleanTokenSwapsDto = CleanTokenSwapsDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Request DTO for CleanTokenSwaps. Optionally, provide a list of ChainKeys to specifically clean/delete from world state. "
    })
], CleanTokenSwapsDto);
let CleanTokenSwapsResponse = class CleanTokenSwapsResponse extends dtos_1.ChainCallDTO {
};
exports.CleanTokenSwapsResponse = CleanTokenSwapsResponse;
tslib_1.__decorate([
    (0, class_validator_1.ArrayMinSize)(0),
    tslib_1.__metadata("design:type", Array)
], CleanTokenSwapsResponse.prototype, "deletes", void 0);
exports.CleanTokenSwapsResponse = CleanTokenSwapsResponse = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Response DTO for a CleanTokenSwaps request. If any deletes occurred, they will be provided in the deletes array."
    })
], CleanTokenSwapsResponse);
//# sourceMappingURL=swap.js.map