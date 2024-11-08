"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const opts = {
// do NOT use enableImplicitConversion, since the benefits are lost when the library is imported
};
function customDeserialize(constructor, object) {
    if (typeof object === "string") {
        const parsed = JSON.parse(object);
        if (Array.isArray(parsed)) {
            return parsed.map((o) => (0, class_transformer_1.plainToInstance)(constructor, o, opts));
        }
        else {
            return (0, class_transformer_1.plainToInstance)(constructor, parsed, opts);
        }
    }
    else {
        return (0, class_transformer_1.plainToInstance)(constructor, object, opts);
    }
}
exports.default = customDeserialize;
//# sourceMappingURL=deserialize.js.map