"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenApi = void 0;
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
const api_1 = require("@gala-chain/api");
const types_1 = require("../types");
const GalaChainBaseApi_1 = require("./GalaChainBaseApi");
class TokenApi extends GalaChainBaseApi_1.GalaChainBaseApi {
    constructor(chainCodeUrl, connection) {
        super(chainCodeUrl, connection);
    }
    // Token Chaincode Calls:
    CreateTokenClass(dto) {
        return this.connection.submit({
            method: "CreateTokenClass",
            payload: dto,
            sign: true,
            url: this.chainCodeUrl,
            requestConstructor: api_1.CreateTokenClassDto,
            responseConstructor: types_1.TokenClass
        });
    }
    UpdateTokenClass(dto) {
        return this.connection.submit({
            method: "UpdateTokenClass",
            payload: dto,
            sign: true,
            url: this.chainCodeUrl,
            requestConstructor: api_1.UpdateTokenClassDto,
            responseConstructor: types_1.TokenClassKey
        });
    }
    FetchTokenClasses(dto) {
        return this.connection.submit({
            method: "FetchTokenClasses",
            payload: dto,
            url: this.chainCodeUrl,
            requestConstructor: api_1.FetchTokenClassesDto,
            responseConstructor: types_1.TokenClass
        });
    }
    FetchTokenClassesWithSupply(dto) {
        return this.connection.submit({
            method: "FetchTokenClassesWithSupply",
            payload: dto,
            sign: true,
            url: this.chainCodeUrl,
            requestConstructor: api_1.FetchTokenClassesDto,
            responseConstructor: types_1.TokenClass
        });
    }
    FetchTokenClassesWithPagination(dto) {
        return this.connection.submit({
            method: "FetchTokenClassesWithPagination",
            payload: dto,
            sign: true,
            url: this.chainCodeUrl,
            requestConstructor: api_1.FetchTokenClassesWithPaginationDto,
            responseConstructor: types_1.FetchTokenClassesResponse
        });
    }
    GrantAllowance(dto) {
        return this.connection.submit({
            method: "GrantAllowance",
            payload: dto,
            sign: true,
            url: this.chainCodeUrl,
            requestConstructor: api_1.GrantAllowanceDto,
            responseConstructor: types_1.TokenAllowance
        });
    }
    RefreshAllowances(dto) {
        return this.connection.submit({
            method: "RefreshAllowances",
            payload: dto,
            sign: true,
            url: this.chainCodeUrl,
            requestConstructor: api_1.RefreshAllowanceDto,
            responseConstructor: types_1.TokenAllowance
        });
    }
    FullAllowanceCheck(dto) {
        return this.connection.submit({
            method: "FullAllowanceCheck",
            payload: dto,
            sign: true,
            url: this.chainCodeUrl,
            requestConstructor: api_1.FullAllowanceCheckDto,
            responseConstructor: types_1.FullAllowanceCheckResponse
        });
    }
    FetchAllowances(dto) {
        return this.connection.submit({
            method: "FetchAllowances",
            payload: dto,
            sign: true,
            url: this.chainCodeUrl,
            requestConstructor: api_1.FetchAllowancesDto,
            responseConstructor: types_1.FetchAllowancesResponse
        });
    }
    DeleteAllowances(dto) {
        return this.connection.submit({
            method: "DeleteAllowances",
            payload: dto,
            sign: true,
            url: this.chainCodeUrl,
            requestConstructor: api_1.DeleteAllowancesDto
        });
    }
    FetchBalances(dto) {
        return this.connection.submit({
            method: "FetchBalances",
            payload: dto,
            url: this.chainCodeUrl,
            requestConstructor: api_1.FetchBalancesDto,
            responseConstructor: types_1.TokenBalance
        });
    }
    FetchBalancesWithTokenMetadata(dto) {
        return this.connection.submit({
            method: "FetchBalancesWithTokenMetadata",
            payload: dto,
            url: this.chainCodeUrl,
            requestConstructor: api_1.FetchBalancesWithPaginationDto,
            responseConstructor: types_1.FetchBalancesWithTokenMetadataResponse
        });
    }
    RequestMint(dto) {
        return this.connection.submit({
            method: "RequestMint",
            payload: dto,
            sign: true,
            url: this.chainCodeUrl,
            requestConstructor: api_1.HighThroughputMintTokenDto,
            responseConstructor: types_1.HighThroughputMintTokenResponse
        });
    }
    FulfillMint(dto) {
        return this.connection.submit({
            method: "FulfillMint",
            payload: dto,
            sign: true,
            url: this.chainCodeUrl,
            requestConstructor: api_1.FulfillMintDto,
            responseConstructor: types_1.TokenInstanceKey
        });
    }
    FetchMintRequests(dto) {
        return this.connection.submit({
            method: "FetchMintRequests",
            payload: dto,
            url: this.chainCodeUrl,
            requestConstructor: api_1.FetchMintRequestsDto,
            responseConstructor: api_1.MintRequestDto
        });
    }
    MintToken(dto) {
        return this.connection.submit({
            method: "MintToken",
            payload: dto,
            sign: true,
            url: this.chainCodeUrl,
            requestConstructor: api_1.MintTokenDto,
            responseConstructor: types_1.TokenInstanceKey
        });
    }
    MintTokenWithAllowance(dto) {
        return this.connection.submit({
            method: "MintTokenWithAllowance",
            payload: dto,
            sign: true,
            url: this.chainCodeUrl,
            requestConstructor: api_1.MintTokenWithAllowanceDto,
            responseConstructor: types_1.TokenInstanceKey
        });
    }
    BatchMintToken(dto) {
        return this.connection.submit({
            method: "BatchMintToken",
            payload: dto,
            sign: true,
            url: this.chainCodeUrl,
            requestConstructor: api_1.BatchMintTokenDto,
            responseConstructor: types_1.TokenInstanceKey
        });
    }
    UseToken(dto) {
        return this.connection.submit({
            method: "UseToken",
            payload: dto,
            sign: true,
            url: this.chainCodeUrl,
            requestConstructor: api_1.UseTokenDto,
            responseConstructor: types_1.TokenBalance
        });
    }
    ReleaseToken(dto) {
        return this.connection.submit({
            method: "ReleaseToken",
            payload: dto,
            sign: true,
            url: this.chainCodeUrl,
            requestConstructor: api_1.ReleaseTokenDto,
            responseConstructor: types_1.TokenBalance
        });
    }
    LockToken(dto) {
        return this.connection.submit({
            method: "LockToken",
            payload: dto,
            sign: true,
            url: this.chainCodeUrl,
            requestConstructor: api_1.LockTokenDto,
            responseConstructor: types_1.TokenBalance
        });
    }
    LockTokens(dto) {
        return this.connection.submit({
            method: "LockTokens",
            payload: dto,
            sign: true,
            url: this.chainCodeUrl,
            requestConstructor: api_1.LockTokensDto,
            responseConstructor: types_1.TokenBalance
        });
    }
    UnlockToken(dto) {
        return this.connection.submit({
            method: "UnlockToken",
            payload: dto,
            sign: true,
            url: this.chainCodeUrl,
            requestConstructor: api_1.UnlockTokenDto,
            responseConstructor: types_1.TokenBalance
        });
    }
    UnlockTokens(dto) {
        return this.connection.submit({
            method: "UnlockTokens",
            payload: dto,
            sign: true,
            url: this.chainCodeUrl,
            requestConstructor: api_1.UnlockTokensDto,
            responseConstructor: types_1.TokenBalance
        });
    }
    TransferToken(dto) {
        return this.connection.submit({
            method: "TransferToken",
            payload: dto,
            sign: true,
            url: this.chainCodeUrl,
            requestConstructor: api_1.TransferTokenDto,
            responseConstructor: types_1.TokenBalance
        });
    }
    BurnTokens(dto) {
        return this.connection.submit({
            method: "BurnTokens",
            payload: dto,
            sign: true,
            url: this.chainCodeUrl,
            requestConstructor: api_1.BurnTokensDto,
            responseConstructor: types_1.TokenBurn
        });
    }
    FetchBurns(dto) {
        return this.connection.submit({
            method: "FetchBurns",
            payload: dto,
            url: this.chainCodeUrl,
            requestConstructor: api_1.FetchBurnsDto,
            responseConstructor: types_1.TokenBurn
        });
    }
}
exports.TokenApi = TokenApi;
//# sourceMappingURL=TokenApi.js.map