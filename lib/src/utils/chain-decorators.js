"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainKey = void 0;
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
require("reflect-metadata");
function ChainKey(chainKeyConfig) {
    return (target, key) => {
        const fields = Reflect.getOwnMetadata("galachain:chainkey", target) || [];
        const existingField = fields.find((field) => field.position === chainKeyConfig.position);
        if (existingField === undefined) {
            fields.push({ key, ...chainKeyConfig });
            Reflect.defineMetadata("galachain:chainkey", fields, target);
        }
    };
}
exports.ChainKey = ChainKey;
//# sourceMappingURL=chain-decorators.js.map