"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestTokenBridgeOutDto = void 0;
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
const ChainId_1 = require("./ChainId");
const TokenInstance_1 = require("./TokenInstance");
const dtos_1 = require("./dtos");
const oracle_1 = require("./oracle");
let RequestTokenBridgeOutDto = class RequestTokenBridgeOutDto extends dtos_1.ChainCallDTO {
};
exports.RequestTokenBridgeOutDto = RequestTokenBridgeOutDto;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "The type of the bridge."
    }),
    (0, validators_1.EnumProperty)(ChainId_1.ChainId),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Number)
], RequestTokenBridgeOutDto.prototype, "destinationChainId", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Token instance of token to be bridged out. In case of fungible tokens, tokenInstance.instance field " +
            `should be set to ${TokenInstance_1.TokenInstance.FUNGIBLE_TOKEN_INSTANCE}.`
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => TokenInstance_1.TokenInstanceKey),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", TokenInstance_1.TokenInstanceKey)
], RequestTokenBridgeOutDto.prototype, "tokenInstance", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "The quantity of token units to be bridged out."
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, validators_1.BigNumberIsPositive)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.default)
], RequestTokenBridgeOutDto.prototype, "quantity", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Recipient address for destination chain"
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], RequestTokenBridgeOutDto.prototype, "recipient", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "(Experimetnal) Serialzed OracleBridgeFeeAssertionDto signed by a valid Oracle Authority. To cover the gas fee on the other side"
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => oracle_1.OracleBridgeFeeAssertionDto),
    tslib_1.__metadata("design:type", oracle_1.OracleBridgeFeeAssertionDto)
], RequestTokenBridgeOutDto.prototype, "destinationChainTxFee", void 0);
exports.RequestTokenBridgeOutDto = RequestTokenBridgeOutDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Contains properties of bridge request, i.e. a request to bridge token out from GalaChain."
    })
], RequestTokenBridgeOutDto);
//# sourceMappingURL=bridge.js.map