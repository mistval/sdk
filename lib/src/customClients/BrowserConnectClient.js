"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserConnectClient = void 0;
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
const ethers_1 = require("ethers");
const api_1 = require("@gala-chain/api");
const GalaChainClient_1 = require("../GalaChainClient");
const types_1 = require("../types");
const utils_1 = require("../utils");
class BrowserConnectClient extends GalaChainClient_1.WebSigner {
    constructor(provider, options) {
        super(options);
        this.isInitialized = false;
        this.address = "";
        this.onAccountsChanged = this.onAccountsChanged.bind(this);
        if (provider) {
            this.provider = new ethers_1.BrowserProvider(provider);
        }
        else if (window.ethereum) {
            this.provider = new ethers_1.BrowserProvider(window.ethereum);
        }
        else {
            throw new Error("Ethereum provider not found");
        }
    }
    /**
     * Initializes the listeners to watch for events from the provider. Not all providers may support every event
     */
    initializeListeners() {
        if (!window.ethereum) {
            return;
        }
        if (!this.isInitialized) {
            window.ethereum.on("accountsChanged", this.onAccountsChanged);
            this.isInitialized = true;
        }
    }
    onAccountsChanged(accounts) {
        if (accounts.length > 0) {
            this.ethereumAddress = (0, ethers_1.getAddress)(accounts[0]);
            this.emit("accountChanged", this.galaChainAddress);
            this.emit("accountsChanged", accounts);
        }
        else {
            this.ethereumAddress = "";
            this.emit("accountChanged", null);
            this.emit("accountsChanged", null);
        }
    }
    async connect() {
        if (!this.provider) {
            throw new Error("Ethereum provider not found");
        }
        this.initializeListeners();
        try {
            const accounts = (await this.provider.send("eth_requestAccounts", []));
            this.ethereumAddress = (0, ethers_1.getAddress)(accounts[0]);
            return this.galaChainAddress;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    disconnect() {
        if (this.isInitialized && window.ethereum) {
            window.ethereum.removeListener("accountsChanged", this.onAccountsChanged);
            this.isInitialized = false;
        }
        this.ethereumAddress = "";
    }
    async sign(method, payload, signingType = types_1.SigningType.SIGN_TYPED_DATA) {
        if (!this.provider) {
            throw new Error("Ethereum provider not found");
        }
        if (!this.address) {
            throw new Error("No account connected");
        }
        try {
            const domain = { name: "GalaChain" };
            const types = (0, utils_1.generateEIP712Types)(method, payload);
            const prefix = this.calculatePersonalSignPrefix(payload);
            const prefixedPayload = { ...payload, prefix };
            const signer = await this.provider.getSigner();
            if (signingType === types_1.SigningType.SIGN_TYPED_DATA) {
                const signature = await signer.signTypedData(domain, types, prefixedPayload);
                return { ...prefixedPayload, signature, types, domain };
            }
            else if (signingType === types_1.SigningType.PERSONAL_SIGN) {
                const signature = await signer.signMessage((0, api_1.serialize)(prefixedPayload));
                return { ...prefixedPayload, signature };
            }
            else {
                throw new Error("Unsupported signing type");
            }
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
exports.BrowserConnectClient = BrowserConnectClient;
//# sourceMappingURL=BrowserConnectClient.js.map