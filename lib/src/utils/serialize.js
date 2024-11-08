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
const class_transformer_1 = require("class-transformer");
const json_stringify_deterministic_1 = tslib_1.__importDefault(require("json-stringify-deterministic"));
/**
 * @description
 *
 * Serialze the provided object to a string in a determinsitic fashion.
 * See Hyperledger Fabric's documentation on
 * [JSON Determinism](https://hyperledger-fabric.readthedocs.io/en/release-2.5/chaincode4ade.html#json-determinism)
 * for more details.
 *
 * @param object
 * @returns unknown
 */
function serialize(object) {
    return (0, json_stringify_deterministic_1.default)((0, class_transformer_1.instanceToPlain)(object));
}
exports.default = serialize;
//# sourceMappingURL=serialize.js.map