"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OracleBridgeFeeAssertionDto = exports.DeleteOracleDefinitionDto = exports.DeleteOracleAssertionsDto = exports.FetchOraclePriceCrossRateAssertionsResponse = exports.OraclePriceCrossRateAssertionDto = exports.FetchOraclePriceAssertionsResponse = exports.OraclePriceAssertionDto = exports.FetchOracleDefinitionsResponse = exports.FetchOracleAssertionsDto = exports.FetchOracleDefinitionsDto = exports.OracleDefinitionDto = void 0;
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
const utils_1 = require("../utils");
const validators_1 = require("../validators");
const OracleDefinition_1 = require("./OracleDefinition");
const OraclePriceAssertion_1 = require("./OraclePriceAssertion");
const OraclePriceCrossRateAssertion_1 = require("./OraclePriceCrossRateAssertion");
const TokenClass_1 = require("./TokenClass");
const TokenInstance_1 = require("./TokenInstance");
const dtos_1 = require("./dtos");
let OracleDefinitionDto = class OracleDefinitionDto extends dtos_1.ChainCallDTO {
};
exports.OracleDefinitionDto = OracleDefinitionDto;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Name of the oracle. Unique chain key."
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], OracleDefinitionDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Oracle Authorities. On-Chain identities that speak for this Oracle."
    }),
    (0, class_validator_1.ArrayUnique)(),
    tslib_1.__metadata("design:type", Array)
], OracleDefinitionDto.prototype, "authorities", void 0);
exports.OracleDefinitionDto = OracleDefinitionDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Save an Oracle definition on chain"
    })
], OracleDefinitionDto);
let FetchOracleDefinitionsDto = class FetchOracleDefinitionsDto extends dtos_1.ChainCallDTO {
};
exports.FetchOracleDefinitionsDto = FetchOracleDefinitionsDto;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "(optional). Provide a name key to fetch a specific oracle definition"
    }),
    tslib_1.__metadata("design:type", Object)
], FetchOracleDefinitionsDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "(optional). Bookmark for paginated results"
    }),
    tslib_1.__metadata("design:type", Object)
], FetchOracleDefinitionsDto.prototype, "bookmark", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "(optional). Limit results set."
    }),
    tslib_1.__metadata("design:type", Object)
], FetchOracleDefinitionsDto.prototype, "limit", void 0);
exports.FetchOracleDefinitionsDto = FetchOracleDefinitionsDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Fetch Oracle definitions"
    })
], FetchOracleDefinitionsDto);
let FetchOracleAssertionsDto = class FetchOracleAssertionsDto extends dtos_1.ChainCallDTO {
};
exports.FetchOracleAssertionsDto = FetchOracleAssertionsDto;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "(optional). Provide a oracle name key to fetch a specific oracle definition"
    }),
    tslib_1.__metadata("design:type", Object)
], FetchOracleAssertionsDto.prototype, "oracle", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "(optional). Filter by identity"
    }),
    tslib_1.__metadata("design:type", Object)
], FetchOracleAssertionsDto.prototype, "identity", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "(optional). Filter by a specific txid"
    }),
    tslib_1.__metadata("design:type", Object)
], FetchOracleAssertionsDto.prototype, "txid", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "(optional). Bookmark for paginated results"
    }),
    tslib_1.__metadata("design:type", Object)
], FetchOracleAssertionsDto.prototype, "bookmark", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "(optional). Limit results set."
    }),
    tslib_1.__metadata("design:type", Object)
], FetchOracleAssertionsDto.prototype, "limit", void 0);
exports.FetchOracleAssertionsDto = FetchOracleAssertionsDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Fetch Oracle Assertions with pagination"
    })
], FetchOracleAssertionsDto);
let FetchOracleDefinitionsResponse = class FetchOracleDefinitionsResponse extends dtos_1.ChainCallDTO {
};
exports.FetchOracleDefinitionsResponse = FetchOracleDefinitionsResponse;
FetchOracleDefinitionsResponse.DEFAULT_LIMIT = 1000;
tslib_1.__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => OracleDefinition_1.OracleDefinition),
    tslib_1.__metadata("design:type", Array)
], FetchOracleDefinitionsResponse.prototype, "results", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", Object)
], FetchOracleDefinitionsResponse.prototype, "bookmark", void 0);
exports.FetchOracleDefinitionsResponse = FetchOracleDefinitionsResponse = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Paginated response DTO for Oracle definition chain objects."
    })
], FetchOracleDefinitionsResponse);
let OraclePriceAssertionDto = class OraclePriceAssertionDto extends dtos_1.ChainCallDTO {
};
exports.OraclePriceAssertionDto = OraclePriceAssertionDto;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Name of the oracle defined on chain."
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], OraclePriceAssertionDto.prototype, "oracle", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Signing identity making the assertion contained within the DTO."
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], OraclePriceAssertionDto.prototype, "identity", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "First currency in the described currency pair. Unit of exchange. " +
            "Optional, but required if externalBaseToken is not provided."
    }),
    (0, class_validator_1.ValidateIf)((assertion) => !!assertion.externalBaseToken),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => TokenInstance_1.TokenInstanceKey),
    tslib_1.__metadata("design:type", TokenInstance_1.TokenInstanceKey)
], OraclePriceAssertionDto.prototype, "baseToken", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "External token representing the first currency in the described currency pair. " +
            "Unit of exchange. Optional, but required if baseToken is not provided."
    }),
    (0, class_validator_1.ValidateIf)((assertion) => !!assertion.baseToken),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => OraclePriceAssertion_1.ExternalToken),
    tslib_1.__metadata("design:type", OraclePriceAssertion_1.ExternalToken)
], OraclePriceAssertionDto.prototype, "externalBaseToken", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Second token/currency in the pair. Token/Currency in which the baseToken is quoted. " +
            "Optional, but required if externalQuoteToken is not provided."
    }),
    (0, class_validator_1.ValidateIf)((o) => !!o.externalQuoteToken),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => TokenInstance_1.TokenInstanceKey),
    tslib_1.__metadata("design:type", TokenInstance_1.TokenInstanceKey)
], OraclePriceAssertionDto.prototype, "quoteToken", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Second token/currency in the pair. Token/Currency in which the baseToken is quoted. Optional, but required if quoteToken is not provided."
    }),
    (0, class_validator_1.ValidateIf)((o) => !!o.quoteToken),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => OraclePriceAssertion_1.ExternalToken),
    tslib_1.__metadata("design:type", OraclePriceAssertion_1.ExternalToken)
], OraclePriceAssertionDto.prototype, "externalQuoteToken", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "How much of the quoteToken is needed to purchase one unit of the baseToken."
    }),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.default)
], OraclePriceAssertionDto.prototype, "exchangeRate", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "(Optional) Source of price data. Name of Third Party data source."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], OraclePriceAssertionDto.prototype, "source", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "(Optional) URL referencing source data."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], OraclePriceAssertionDto.prototype, "sourceUrl", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Unix timestamp representing the date/time at which this price / exchange rate was calculated or estimated."
    }),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], OraclePriceAssertionDto.prototype, "timestamp", void 0);
exports.OraclePriceAssertionDto = OraclePriceAssertionDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Price data for exchanging two tokens/currenices signed by an Authoritative Oracle"
    })
], OraclePriceAssertionDto);
let FetchOraclePriceAssertionsResponse = class FetchOraclePriceAssertionsResponse extends dtos_1.ChainCallDTO {
};
exports.FetchOraclePriceAssertionsResponse = FetchOraclePriceAssertionsResponse;
FetchOraclePriceAssertionsResponse.DEFAULT_LIMIT = 1000;
tslib_1.__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => OraclePriceAssertion_1.OraclePriceAssertion),
    tslib_1.__metadata("design:type", Array)
], FetchOraclePriceAssertionsResponse.prototype, "results", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", Object)
], FetchOraclePriceAssertionsResponse.prototype, "bookmark", void 0);
exports.FetchOraclePriceAssertionsResponse = FetchOraclePriceAssertionsResponse = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Paginated response DTO for OraclePriceAssertions"
    })
], FetchOraclePriceAssertionsResponse);
let OraclePriceCrossRateAssertionDto = class OraclePriceCrossRateAssertionDto extends dtos_1.ChainCallDTO {
    validateCrossRateTokenKeys() {
        const crossRateToken = this.crossRateToken;
        const baseTokenCrossRateToken = this.baseTokenCrossRate.quoteToken;
        const quoteTokenCrossRateToken = this.quoteTokenCrossRate.quoteToken;
        const externalCrossRateToken = this.externalCrossRateToken;
        const baseTokenExternalCrossRateToken = this.baseTokenCrossRate.externalQuoteToken;
        const quoteTokenExternalCrossRateToken = this.quoteTokenCrossRate.externalQuoteToken;
        if (crossRateToken === undefined && externalCrossRateToken === undefined) {
            throw new utils_1.ValidationFailedError(`Neither crossRateToken nor externalCrossRateToken defined on OraclePriceCrossRateAssertionDto, both undefined`);
        }
        else if (crossRateToken !== undefined &&
            (baseTokenCrossRateToken === undefined ||
                quoteTokenCrossRateToken === undefined ||
                crossRateToken.toStringKey() !== (baseTokenCrossRateToken === null || baseTokenCrossRateToken === void 0 ? void 0 : baseTokenCrossRateToken.toStringKey()) ||
                crossRateToken.toStringKey() !== (quoteTokenCrossRateToken === null || quoteTokenCrossRateToken === void 0 ? void 0 : quoteTokenCrossRateToken.toStringKey()))) {
            throw new utils_1.ValidationFailedError(`Cross rate validation failed: ` +
                `baseToken cross-quoted in ${baseTokenCrossRateToken === null || baseTokenCrossRateToken === void 0 ? void 0 : baseTokenCrossRateToken.toStringKey()} but ` +
                `quoteToken cross-quoted in ${quoteTokenCrossRateToken === null || quoteTokenCrossRateToken === void 0 ? void 0 : quoteTokenCrossRateToken.toStringKey()}`);
        }
        else if (externalCrossRateToken !== undefined &&
            (baseTokenExternalCrossRateToken === undefined ||
                quoteTokenExternalCrossRateToken === undefined ||
                externalCrossRateToken.symbol !== baseTokenExternalCrossRateToken.symbol ||
                externalCrossRateToken.symbol !== quoteTokenExternalCrossRateToken.symbol)) {
            throw new utils_1.ValidationFailedError(`Cross rate validation failed: ` +
                `baseToken cross-quoted in ${baseTokenExternalCrossRateToken === null || baseTokenExternalCrossRateToken === void 0 ? void 0 : baseTokenExternalCrossRateToken.symbol} but ` +
                `quoteToken cross-quoted in ${quoteTokenExternalCrossRateToken === null || quoteTokenExternalCrossRateToken === void 0 ? void 0 : quoteTokenExternalCrossRateToken.symbol}`);
        }
    }
    calculateCrossRate() {
        this.validateCrossRateTokenKeys();
        const quoteTokenCrossRate = this.quoteTokenCrossRate.exchangeRate;
        const baseTokenCrossRate = this.baseTokenCrossRate.exchangeRate;
        const calculatedCrossRate = quoteTokenCrossRate.dividedBy(baseTokenCrossRate);
        return calculatedCrossRate;
    }
    validateCrossRate() {
        const calculatedCrossRate = this.calculateCrossRate();
        if (!this.crossRate.isEqualTo(calculatedCrossRate)) {
            throw new utils_1.ValidationFailedError(`Asserted cross rate (${this.crossRate} is not equal to calculated cross rate)`);
        }
    }
};
exports.OraclePriceCrossRateAssertionDto = OraclePriceCrossRateAssertionDto;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Name of the oracle defined on chain."
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], OraclePriceCrossRateAssertionDto.prototype, "oracle", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Signing identity making the assertion contained within the DTO."
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], OraclePriceCrossRateAssertionDto.prototype, "identity", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Cross rate for First currency in the described currency pair. Unit of exchange."
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => OraclePriceAssertionDto),
    tslib_1.__metadata("design:type", OraclePriceAssertionDto)
], OraclePriceCrossRateAssertionDto.prototype, "baseTokenCrossRate", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Cross rate for Second token/currency in the pair. Token/Currency in which the baseToken is quoted."
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => OraclePriceAssertionDto),
    tslib_1.__metadata("design:type", OraclePriceAssertionDto)
], OraclePriceCrossRateAssertionDto.prototype, "quoteTokenCrossRate", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Comparative token used to price both the base and quote tokens in order to " +
            "calculate an exchange cross-rate. Optional, but required if externalCrossRateToken is " +
            "not provided."
    }),
    (0, class_validator_1.ValidateIf)((assertion) => !!assertion.externalCrossRateToken),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => TokenInstance_1.TokenInstanceKey),
    tslib_1.__metadata("design:type", TokenInstance_1.TokenInstanceKey)
], OraclePriceCrossRateAssertionDto.prototype, "crossRateToken", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Comparative token used to price both the base and quote tokens in order to " +
            "calculate an exchange cross-rate. Optional, but required if crossRateToken is not provided."
    }),
    (0, class_validator_1.ValidateIf)((assertion) => !!assertion.crossRateToken),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => OraclePriceAssertion_1.ExternalToken),
    tslib_1.__metadata("design:type", OraclePriceAssertion_1.ExternalToken)
], OraclePriceCrossRateAssertionDto.prototype, "externalCrossRateToken", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Cross rate for baseToken and quoteToken, calculated from the crossRateToken exchange rates."
    }),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.default)
], OraclePriceCrossRateAssertionDto.prototype, "crossRate", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Exclude)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], OraclePriceCrossRateAssertionDto.prototype, "validateCrossRateTokenKeys", null);
tslib_1.__decorate([
    (0, class_transformer_1.Exclude)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], OraclePriceCrossRateAssertionDto.prototype, "calculateCrossRate", null);
tslib_1.__decorate([
    (0, class_transformer_1.Exclude)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], OraclePriceCrossRateAssertionDto.prototype, "validateCrossRate", null);
exports.OraclePriceCrossRateAssertionDto = OraclePriceCrossRateAssertionDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Cross Rate Exchange price assertion. E.g. compare $GALA to $ETH via price in $USD for each."
    })
], OraclePriceCrossRateAssertionDto);
class FetchOraclePriceCrossRateAssertionsResponse extends dtos_1.ChainCallDTO {
}
exports.FetchOraclePriceCrossRateAssertionsResponse = FetchOraclePriceCrossRateAssertionsResponse;
FetchOraclePriceCrossRateAssertionsResponse.DEFAULT_LIMIT = 1000;
tslib_1.__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => OraclePriceCrossRateAssertion_1.OraclePriceCrossRateAssertion),
    tslib_1.__metadata("design:type", Array)
], FetchOraclePriceCrossRateAssertionsResponse.prototype, "results", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], FetchOraclePriceCrossRateAssertionsResponse.prototype, "bookmark", void 0);
class DeleteOracleAssertionsDto extends dtos_1.ChainCallDTO {
}
exports.DeleteOracleAssertionsDto = DeleteOracleAssertionsDto;
DeleteOracleAssertionsDto.MAX_LIMIT = 1000;
tslib_1.__decorate([
    (0, class_validator_1.ArrayNotEmpty)(),
    tslib_1.__metadata("design:type", Array)
], DeleteOracleAssertionsDto.prototype, "chainKeys", void 0);
class DeleteOracleDefinitionDto extends dtos_1.ChainCallDTO {
}
exports.DeleteOracleDefinitionDto = DeleteOracleDefinitionDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], DeleteOracleDefinitionDto.prototype, "name", void 0);
let OracleBridgeFeeAssertionDto = class OracleBridgeFeeAssertionDto extends dtos_1.ChainCallDTO {
};
exports.OracleBridgeFeeAssertionDto = OracleBridgeFeeAssertionDto;
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Exchange Rate Price Assertion used to calculate Gas Fee"
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)((assertion) => !!assertion.galaExchangeCrossRate),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => OraclePriceAssertionDto),
    tslib_1.__metadata("design:type", OraclePriceAssertionDto)
], OracleBridgeFeeAssertionDto.prototype, "galaExchangeRate", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Cross-Rate Exchange Rate used to calculate Gas Fee"
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateIf)((assertion) => !!assertion.galaExchangeRate),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => OraclePriceCrossRateAssertionDto),
    tslib_1.__metadata("design:type", OraclePriceCrossRateAssertionDto)
], OracleBridgeFeeAssertionDto.prototype, "galaExchangeCrossRate", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Rounding decimals used for estimatedTotalTxFeeInGala. " +
            "Expected to match $GALA TokenClass.decimals."
    }),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(32),
    tslib_1.__metadata("design:type", Number)
], OracleBridgeFeeAssertionDto.prototype, "galaDecimals", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "The token requested to bridge. Token Class used to query the estimated " + "transaction fee units."
    }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => TokenClass_1.TokenClassKey),
    tslib_1.__metadata("design:type", TokenClass_1.TokenClassKey)
], OracleBridgeFeeAssertionDto.prototype, "bridgeToken", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Set to true if the query to the bridge validator for the bridge-request token " +
            "included ?nft=true. Otherwise false."
    }),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], OracleBridgeFeeAssertionDto.prototype, "bridgeTokenIsNonFungible", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Estimated number of gas units required for the transaction."
    }),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.default)
], OracleBridgeFeeAssertionDto.prototype, "estimatedTxFeeUnitsTotal", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Estimated price per unit of gas, as retrieved approximately " + "at the time of assertion."
    }),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.default)
], OracleBridgeFeeAssertionDto.prototype, "estimatedPricePerTxFeeUnit", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "The sum total of the estimated transaction fee " +
            "denominated in the destinaton chain's native currency, token, or unit. " +
            "The denomination used is identified in the `externalToken` property. " +
            "The unit, currency, and/or token used to denominate the " +
            "`estimatedTotalTxFeeInExternalToken` property is specified in the " +
            "galaExchangeRate.externalQuoteToken property. " +
            "This total is calculated by multiplying the `estimatedTxFeeUnitsTotal` " +
            "times the `estimatedPricePerTxFeeUnit`, and then, if necessary, converting " +
            "the result to the `galaExchangeRate.externalQuoteToken unit denomination.`"
    }),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.default)
], OracleBridgeFeeAssertionDto.prototype, "estimatedTotalTxFeeInExternalToken", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Conversion of the estimated transaction fee calculated for the " +
            "destination chain, converted to $GALA, for payment on GalaChain"
    }),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.default)
], OracleBridgeFeeAssertionDto.prototype, "estimatedTotalTxFeeInGala", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Unix timestamp representing the date/time at which this assertion " +
            "was calculated and/or estimated."
    }),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], OracleBridgeFeeAssertionDto.prototype, "timestamp", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Oracle identity / alias. Used with signature and GalaChain SDK " +
            "authorize() function for verification/validation."
    }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], OracleBridgeFeeAssertionDto.prototype, "signingIdentity", void 0);
exports.OracleBridgeFeeAssertionDto = OracleBridgeFeeAssertionDto = tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "Response with signed bridging fee data."
    })
], OracleBridgeFeeAssertionDto);
//# sourceMappingURL=oracle.js.map