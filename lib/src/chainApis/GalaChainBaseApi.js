"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GalaChainBaseApi = void 0;
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
class GalaChainBaseApi {
    constructor(chainCodeUrl, connection) {
        this.chainCodeUrl = chainCodeUrl;
        this.connection = connection;
    }
    async DryRun(dto) {
        await (0, api_1.createValidDTO)(api_1.DryRunDto, dto);
        const stringifiedDto = {
            ...dto,
            dto: JSON.stringify(dto.dto)
        };
        return this.connection.submit({
            method: "DryRun",
            payload: stringifiedDto,
            sign: false,
            url: this.chainCodeUrl,
            responseConstructor: types_1.DryRunResult
        });
    }
    GetObjectByKey(dto) {
        return this.connection.submit({
            method: "GetObjectByKey",
            payload: dto,
            sign: false,
            url: this.chainCodeUrl,
            requestConstructor: api_1.GetObjectDto
        });
    }
    GetObjectHistory(dto) {
        return this.connection.submit({
            method: "GetObjectHistory",
            payload: dto,
            sign: false,
            url: this.chainCodeUrl,
            requestConstructor: api_1.GetObjectHistoryDto
        });
    }
}
exports.GalaChainBaseApi = GalaChainBaseApi;
//# sourceMappingURL=GalaChainBaseApi.js.map