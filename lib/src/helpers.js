"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEmitter = exports.calculatePersonalSignPrefix = void 0;
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
function calculatePersonalSignPrefix(payload) {
    let payloadLength = api_1.signatures.getPayloadToSign(payload).length;
    let prefix = "\u0019Ethereum Signed Message:\n" + payloadLength;
    let previousLength = -1;
    while (payloadLength !== previousLength) {
        previousLength = payloadLength;
        prefix = "\u0019Ethereum Signed Message:\n" + payloadLength;
        const newPayload = { ...payload, prefix };
        payloadLength = api_1.signatures.getPayloadToSign(newPayload).length;
    }
    return prefix;
}
exports.calculatePersonalSignPrefix = calculatePersonalSignPrefix;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
class EventEmitter {
    constructor() {
        this.listeners = {};
    }
    on(event, listener) {
        var _a;
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        (_a = this.listeners[event]) === null || _a === void 0 ? void 0 : _a.push(listener);
        return this;
    }
    off(event, listener) {
        var _a;
        if (!this.listeners[event])
            return this;
        this.listeners[event] = (_a = this.listeners[event]) === null || _a === void 0 ? void 0 : _a.filter((l) => l !== listener);
        return this;
    }
    emit(event, data) {
        var _a;
        if (!this.listeners[event])
            return false;
        (_a = this.listeners[event]) === null || _a === void 0 ? void 0 : _a.forEach((listener) => listener(data));
        return true;
    }
}
exports.EventEmitter = EventEmitter;
//# sourceMappingURL=helpers.js.map