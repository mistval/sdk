"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicKeyApi = void 0;
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
const class_transformer_1 = require("class-transformer");
const GalaChainBaseApi_1 = require("./GalaChainBaseApi");
class PublicKeyApi extends GalaChainBaseApi_1.GalaChainBaseApi {
    constructor(chainCodeUrl, connection) {
        super(chainCodeUrl, connection);
    }
    // PublicKey Chaincode calls:
    GetMyProfile(message, signature) {
        return this.connection.submit({
            method: "GetMyProfile",
            payload: (0, class_transformer_1.plainToInstance)(api_1.GetMyProfileDto, {
                ...(message ? { message } : {}),
                ...(signature ? { signature } : {})
            }),
            sign: true,
            url: this.chainCodeUrl
        });
    }
    RegisterUser(dto) {
        return this.connection.submit({
            method: "RegisterUser",
            payload: dto,
            sign: true,
            url: this.chainCodeUrl,
            requestConstructor: api_1.RegisterUserDto
        });
    }
    RegisterEthUser(dto) {
        return this.connection.submit({
            method: "RegisterEthUser",
            payload: dto,
            sign: true,
            url: this.chainCodeUrl,
            requestConstructor: api_1.RegisterEthUserDto
        });
    }
    UpdatePublicKey(dto) {
        return this.connection.submit({
            method: "UpdatePublicKey",
            payload: dto,
            sign: true,
            url: this.chainCodeUrl,
            requestConstructor: api_1.UpdatePublicKeyDto
        });
    }
}
exports.PublicKeyApi = PublicKeyApi;
//# sourceMappingURL=PublicKeyApi.js.map