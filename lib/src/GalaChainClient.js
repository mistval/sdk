"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSigner = exports.CustomClient = exports.GalaChainProvider = void 0;
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
const ethers_1 = require("ethers");
const helpers_1 = require("./helpers");
const types_1 = require("./types");
const utils_1 = require("./utils");
class GalaChainProvider {
    constructor(options) {
        this.options = options;
        if (options === null || options === void 0 ? void 0 : options.legacyCredentials) {
            this.legacyCredentials = {
                "X-Identity-Lookup-Key": options.legacyCredentials.identityLookupKey,
                "X-User-Encryption-Key": options.legacyCredentials.userEncryptionKey
            };
        }
    }
    async submit(_a) {
        var _b, _c, _d;
        var { url, method, payload, sign, headers = {}, requestConstructor, responseConstructor, signingType = (_c = (_b = this.options) === null || _b === void 0 ? void 0 : _b.signingType) !== null && _c !== void 0 ? _c : types_1.SigningType.SIGN_TYPED_DATA } = _a;
        // Throws error if class validation fails
        if (requestConstructor) {
            await (0, api_1.createValidDTO)(requestConstructor, payload);
        }
        let newPayload = (0, class_transformer_1.instanceToPlain)(payload);
        if (sign === true) {
            //Only try signing if signature is not already present
            if (typeof payload !== "object" ||
                payload === null ||
                !("signature" in payload) ||
                payload.signature === null) {
                try {
                    newPayload = await this.sign(method, newPayload, signingType);
                }
                catch (error) {
                    throw new Error(error.message);
                }
            }
        }
        const fullUrl = `${url}/${method}`;
        const response = await fetch(fullUrl, {
            method: "POST",
            body: (0, api_1.serialize)(newPayload),
            headers: {
                "Content-Type": "application/json",
                ...this.legacyCredentials,
                ...headers
            }
        });
        const hash = (_d = response.headers.get("x-transaction-id")) !== null && _d !== void 0 ? _d : undefined;
        // Check if the content-length is not zero and try to parse JSON
        if (response.headers.get("content-length") !== "0") {
            let data;
            try {
                data = await response.json();
            }
            catch (error) {
                throw new Error("Invalid JSON response");
            }
            if (!response.ok || data.error) {
                throw new types_1.GalaChainResponseError(data);
            }
            else {
                const transformedDataResponse = responseConstructor
                    ? (0, class_transformer_1.plainToInstance)(responseConstructor, data.Data)
                    : data.Data;
                return new types_1.GalaChainResponseSuccess({ ...data, Data: transformedDataResponse }, hash);
            }
        }
        throw new Error(`Unable to get data. Received response: ${JSON.stringify(response)}`);
    }
}
exports.GalaChainProvider = GalaChainProvider;
class CustomClient extends GalaChainProvider {
    constructor(options) {
        super(options);
    }
    calculatePersonalSignPrefix(payload) {
        const payloadLength = api_1.signatures.getPayloadToSign(payload).length;
        const prefix = "\u0019Ethereum Signed Message:\n" + payloadLength;
        const newPayload = { ...payload, prefix };
        const newPayloadLength = api_1.signatures.getPayloadToSign(newPayload).length;
        if (payloadLength === newPayloadLength) {
            return prefix;
        }
        return this.calculatePersonalSignPrefix(newPayload);
    }
}
exports.CustomClient = CustomClient;
class WebSigner extends CustomClient {
    constructor(options) {
        super(options);
        this.eventEmitter = new helpers_1.EventEmitter();
    }
    set ethereumAddress(val) {
        this.address = (0, utils_1.galaChainToEthereumAddress)(val);
    }
    get ethereumAddress() {
        return this.address;
    }
    get galaChainAddress() {
        return (0, utils_1.ethereumToGalaChainAddress)(this.address);
    }
    on(event, listener) {
        this.eventEmitter.on(event, listener);
        return this;
    }
    off(event, listener) {
        this.eventEmitter.off(event, listener);
        return this;
    }
    emit(event, data) {
        return this.eventEmitter.emit(event, data);
    }
    async getPublicKey() {
        const message = "Sign this to retrieve your public key";
        const signature = await this.signMessage(message);
        const messageHash = (0, ethers_1.hashMessage)(message);
        const publicKey = ethers_1.SigningKey.recoverPublicKey((0, ethers_1.getBytes)(messageHash), signature);
        const recoveredAddress = (0, ethers_1.computeAddress)(publicKey);
        return { publicKey, recoveredAddress };
    }
    async signMessage(message) {
        if (!this.provider) {
            throw new Error("Ethereum provider not found");
        }
        if (!this.address) {
            throw new Error("No account connected");
        }
        try {
            const signer = await this.provider.getSigner();
            const signature = await signer.signMessage(message);
            return signature;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.WebSigner = WebSigner;
//# sourceMappingURL=GalaChainClient.js.map