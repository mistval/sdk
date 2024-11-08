"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const TokenClass_1 = require("./TokenClass");
const existingToken = (0, class_transformer_1.plainToClass)(TokenClass_1.TokenClass, {
    network: "GC",
    decimals: 32,
    maxCapacity: new bignumber_js_1.default("50000000000"),
    maxSupply: new bignumber_js_1.default("50000000000"),
    collection: "Platform",
    category: "Currency",
    type: "TEST123",
    additionalKey: "none",
    name: "TestCoin",
    symbol: "TEST",
    description: "string",
    isNonFungible: false,
    contractAddress: "test-address",
    metadataAddress: "test-metadata",
    rarity: "common",
    totalBurned: new bignumber_js_1.default("0"),
    totalSupply: new bignumber_js_1.default("50000000000"),
    totalMintAllowance: new bignumber_js_1.default("50000000000"),
    image: "https://app.gala.games/_nuxt/img/gala-logo_horizontal_white.8b0409c.png",
    authorities: ["client|old-admin"]
});
it("should update properties that are allowed to be updated", async () => {
    // Given - an update with redundant properties
    const update = {
        network: "QQ",
        decimals: 0,
        maxCapacity: new bignumber_js_1.default("1"),
        maxSupply: new bignumber_js_1.default("1"),
        collection: "UpdatedPlatform",
        category: "UpdatedCurrency",
        type: "UPDTEST123",
        additionalKey: "upd-none",
        name: "UpdatedTestCoin",
        symbol: "UPDTEST",
        description: "updated-string",
        isNonFungible: true,
        contractAddress: "updated-test-address",
        metadataAddress: "updated-test-metadata",
        rarity: "updated-common",
        totalBurned: new bignumber_js_1.default("999"),
        totalSupply: new bignumber_js_1.default("998"),
        totalMintAllowance: new bignumber_js_1.default("997"),
        image: "https://app.gala.games/_nuxt/img/updated-gala-logo_horizontal_white.8b0409c.png",
        authorities: ["client|new-admin"]
    };
    // When
    const updatedToken = existingToken.updatedWith(update);
    // Then
    expect(updatedToken.toPlainObject()).toEqual({
        ...existingToken.toPlainObject(),
        name: update.name,
        symbol: update.symbol,
        description: update.description,
        rarity: update.rarity,
        image: update.image,
        contractAddress: update.contractAddress,
        metadataAddress: update.metadataAddress,
        authorities: ["client|new-admin", "client|old-admin"] // sorted
    });
});
it("should allow to override authorities", async () => {
    // Given
    const update = {
        authorities: ["client|new-admin"],
        overwriteAuthorities: true
    };
    // When
    const updatedToken = existingToken.updatedWith(update);
    // Then
    expect(updatedToken.toPlainObject()).toEqual({
        ...existingToken.toPlainObject(),
        authorities: ["client|new-admin"]
    });
});
//# sourceMappingURL=TokenClass.spec.js.map