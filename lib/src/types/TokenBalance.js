"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenHold = exports.TokenBalance = exports.TokenNotInUseError = exports.TokenInUseError = exports.TokenQuantityNotUnlockedError = exports.TokenNotLockedError = exports.TokenLockedError = exports.TokenNotInBalanceError = void 0;
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
const bignumber_js_1 = require("bignumber.js");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const class_validator_jsonschema_1 = require("class-validator-jsonschema");
const utils_1 = require("../utils");
const validators_1 = require("../validators");
const ChainObject_1 = require("./ChainObject");
const TokenClass_1 = require("./TokenClass");
const TokenInstance_1 = require("./TokenInstance");
class TokenNotInBalanceError extends utils_1.ValidationFailedError {
    constructor(owner, tokenClass, instanceId) {
        const tokenInstanceKey = TokenInstance_1.TokenInstanceKey.nftKey(tokenClass, instanceId).toStringKey();
        super(`Token instance ${tokenInstanceKey} not found in balance`, { owner, tokenInstanceKey });
    }
}
exports.TokenNotInBalanceError = TokenNotInBalanceError;
class TokenLockedError extends utils_1.ValidationFailedError {
    constructor(owner, tokenClass, instanceId, name) {
        const tokenInstanceKey = TokenInstance_1.TokenInstanceKey.nftKey(tokenClass, instanceId).toStringKey();
        const lockNameInfo = name === undefined ? "" : `, lock name: ${name}`;
        const message = `Token instance ${tokenInstanceKey} is locked${lockNameInfo}.`;
        super(message, { owner, tokenInstanceKey, name });
    }
}
exports.TokenLockedError = TokenLockedError;
class TokenNotLockedError extends utils_1.ValidationFailedError {
    constructor(owner, tokenClass, instanceId) {
        const tokenInstanceKey = TokenInstance_1.TokenInstanceKey.nftKey(tokenClass, instanceId).toStringKey();
        super(`Token instance ${tokenInstanceKey} is not locked`, { owner, tokenInstanceKey });
    }
}
exports.TokenNotLockedError = TokenNotLockedError;
class TokenQuantityNotUnlockedError extends utils_1.ValidationFailedError {
    constructor(owner, tokenClass, quantity, name) {
        const tokenClassKey = TokenClass_1.TokenClassKey.toStringKey(tokenClass);
        super(`Failed to unlock quantity ${quantity} of Fungible token ${tokenClassKey} for TokenHold.name = ${name}.`, { owner, tokenClassKey });
    }
}
exports.TokenQuantityNotUnlockedError = TokenQuantityNotUnlockedError;
class TokenInUseError extends utils_1.ValidationFailedError {
    constructor(owner, tokenClass, instanceId) {
        const tokenInstanceKey = TokenInstance_1.TokenInstanceKey.nftKey(tokenClass, instanceId).toStringKey();
        super(`Token instance ${tokenInstanceKey} is in use`, { owner, tokenInstanceKey });
    }
}
exports.TokenInUseError = TokenInUseError;
class TokenNotInUseError extends utils_1.ValidationFailedError {
    constructor(owner, tokenClass, instanceId) {
        const tokenInstanceKey = TokenInstance_1.TokenInstanceKey.nftKey(tokenClass, instanceId).toStringKey();
        super(`Token instance ${tokenInstanceKey} is not in use`, { owner, tokenInstanceKey });
    }
}
exports.TokenNotInUseError = TokenNotInUseError;
class TokenBalance extends ChainObject_1.ChainObject {
    constructor(params) {
        super();
        if (params) {
            this.owner = params.owner;
            this.collection = params.collection;
            this.category = params.category;
            this.type = params.type;
            this.additionalKey = params.additionalKey;
            this.quantity = new bignumber_js_1.BigNumber(0);
            this.instanceIds = [];
            this.lockedHolds = [];
            this.inUseHolds = [];
        }
    }
    //
    // NFT
    //
    getNftInstanceCount() {
        return this.getNftInstanceIds().length;
    }
    getUnexpiredLockedHolds(currentTime) {
        var _a;
        return ((_a = this.lockedHolds) !== null && _a !== void 0 ? _a : []).filter((h) => !h.isExpired(currentTime));
    }
    getUnexpiredLockedHoldsSortedByAscendingExpiration(currentTime) {
        const unexpiredHolds = this.getUnexpiredLockedHolds(currentTime);
        return unexpiredHolds.sort(TokenHold.sortByAscendingExpiration);
    }
    getUnexpiredInUseHolds(currentTime) {
        var _a;
        return ((_a = this.inUseHolds) !== null && _a !== void 0 ? _a : []).filter((h) => !h.isExpired(currentTime));
    }
    ensureCanAddInstance(instanceId) {
        this.ensureInstanceIsNft(instanceId);
        if (this.containsInstance(instanceId)) {
            throw new utils_1.ValidationFailedError(`Token instance ${instanceId} already exists in balance`, {
                balanceKey: TokenClass_1.TokenClassKey.toStringKey(this),
                instanceId: instanceId.toString()
            });
        }
        const add = () => {
            if (this.instanceIds === undefined) {
                this.instanceIds = [];
            }
            // add instance ID to array
            this.instanceIds.push(instanceId);
            this.instanceIds.sort((i) => i.comparedTo(i));
            // update quantity
            this.quantity = new bignumber_js_1.BigNumber(this.instanceIds.length);
        };
        return { add };
    }
    ensureCanRemoveInstance(instanceId, currentTime) {
        this.ensureInstanceIsNft(instanceId);
        this.ensureInstanceIsInBalance(instanceId);
        this.ensureInstanceIsNotLocked(instanceId, currentTime);
        this.ensureInstanceIsNotUsed(instanceId, currentTime);
        const remove = () => {
            var _a;
            // remove instance ID from array
            this.instanceIds = ((_a = this.instanceIds) !== null && _a !== void 0 ? _a : []).filter((id) => !id.eq(instanceId));
            // update quantity
            this.quantity = new bignumber_js_1.BigNumber(this.instanceIds.length);
        };
        return { remove };
    }
    ensureCanLockInstance(hold, currentTime) {
        this.ensureInstanceIsNft(hold.instanceId);
        this.ensureInstanceIsInBalance(hold.instanceId);
        this.ensureInstanceIsNotLockedWithTheSameName(hold.instanceId, hold.name, currentTime);
        this.ensureInstanceIsNotUsed(hold.instanceId, currentTime);
        const lock = () => {
            this.lockedHolds = [...this.getUnexpiredLockedHolds(currentTime), hold];
        };
        return { lock };
    }
    ensureCanUnlockInstance(instanceId, name, currentTime) {
        const unexpiredLockedHolds = this.getUnexpiredLockedHolds(currentTime);
        const updated = unexpiredLockedHolds.filter((h) => !h.matches(instanceId, name));
        if (unexpiredLockedHolds.length === updated.length) {
            throw new TokenNotLockedError(this.owner, this, instanceId);
        }
        const unlock = () => {
            this.lockedHolds = updated;
        };
        return { unlock };
    }
    ensureCanUseInstance(hold, currentTime) {
        this.ensureInstanceIsNft(hold.instanceId);
        this.ensureInstanceIsInBalance(hold.instanceId);
        this.ensureInstanceIsNotLocked(hold.instanceId, currentTime);
        this.ensureInstanceIsNotUsed(hold.instanceId, currentTime);
        const use = () => {
            this.inUseHolds = [...this.getUnexpiredInUseHolds(currentTime), hold];
        };
        return { use };
    }
    ensureCanReleaseInstance(instanceId, name, currentTime) {
        const unexpiredInUseHolds = this.getUnexpiredInUseHolds(currentTime);
        const updated = unexpiredInUseHolds.filter((h) => !h.matches(instanceId, name));
        if (unexpiredInUseHolds.length === updated.length) {
            throw new TokenNotInUseError(this.owner, this, instanceId);
        }
        const release = () => {
            this.inUseHolds = updated;
        };
        return { release };
    }
    clearHolds(instanceId, currentTime) {
        this.ensureInstanceIsNft(instanceId);
        this.lockedHolds = this.getUnexpiredLockedHolds(currentTime).filter((h) => !h.instanceId.isEqualTo(instanceId));
        this.inUseHolds = this.getUnexpiredInUseHolds(currentTime).filter((h) => !h.instanceId.isEqualTo(instanceId));
    }
    findLockedHold(instanceId, name, currentTime) {
        this.ensureInstanceIsNft(instanceId);
        return this.getUnexpiredLockedHolds(currentTime).find((h) => h.matches(instanceId, name));
    }
    findInUseHold(instanceId, currentTime) {
        this.ensureInstanceIsNft(instanceId);
        return this.getUnexpiredInUseHolds(currentTime).find((h) => h.matches(instanceId, undefined));
    }
    containsAnyNftInstanceId() {
        return this.getNftInstanceIds().length > 0;
    }
    isInstanceSpendable(instanceId, currentTime) {
        return (this.containsInstance(instanceId) &&
            !this.isInstanceLocked(instanceId, currentTime) &&
            !this.isInstanceInUse(instanceId, currentTime));
    }
    getNftInstanceIds() {
        var _a, _b;
        return (_b = (_a = this.instanceIds) === null || _a === void 0 ? void 0 : _a.filter((id) => !TokenInstance_1.TokenInstance.isFungible(id))) !== null && _b !== void 0 ? _b : [];
    }
    cleanupExpiredHolds(currentTime) {
        this.lockedHolds = this.getUnexpiredLockedHolds(currentTime);
        this.inUseHolds = this.getUnexpiredInUseHolds(currentTime);
        return this;
    }
    containsInstance(instanceId) {
        var _a, _b;
        return (_b = (_a = this.instanceIds) === null || _a === void 0 ? void 0 : _a.some((id) => id.isEqualTo(instanceId))) !== null && _b !== void 0 ? _b : false;
    }
    isInstanceLocked(instanceId, currentTime) {
        return this.getUnexpiredLockedHolds(currentTime).some((h) => h.instanceId.isEqualTo(instanceId));
    }
    isInstanceInUse(instanceId, currentTime) {
        return this.getUnexpiredInUseHolds(currentTime).some((h) => h.instanceId.isEqualTo(instanceId));
    }
    ensureInstanceIsNft(instanceId) {
        if (instanceId.isNegative() || instanceId.isZero() || !instanceId.isInteger()) {
            const message = `Instance ID must be positive integer, but got ${instanceId.toFixed()}`;
            throw new utils_1.ValidationFailedError(message, { instanceId: instanceId.toFixed() });
        }
    }
    ensureInstanceIsInBalance(instanceId) {
        if (!this.containsInstance(instanceId)) {
            throw new TokenNotInBalanceError(this.owner, this, instanceId);
        }
    }
    ensureInstanceIsNotLockedWithTheSameName(instanceId, name, currentTime) {
        const hold = this.findLockedHold(instanceId, name, currentTime);
        if (hold !== undefined) {
            throw new TokenLockedError(this.owner, this, instanceId, name);
        }
    }
    ensureInstanceIsNotLocked(instanceId, currentTime) {
        const hold = this.getUnexpiredLockedHolds(currentTime).find((h) => h.instanceId.isEqualTo(instanceId));
        if (hold !== undefined) {
            throw new TokenLockedError(this.owner, this, instanceId, hold === null || hold === void 0 ? void 0 : hold.name);
        }
    }
    ensureInstanceIsNotUsed(instanceId, currentTime) {
        if (this.isInstanceInUse(instanceId, currentTime)) {
            throw new TokenInUseError(this.owner, this, instanceId);
        }
    }
    //
    // Fungible API
    //
    getQuantityTotal() {
        this.ensureContainsNoNftInstances();
        return this.quantity;
    }
    getSpendableQuantityTotal(currentTime) {
        this.ensureContainsNoNftInstances();
        const lockedQuantity = this.getCurrentLockedQuantity(currentTime);
        return this.quantity.minus(lockedQuantity);
    }
    getLockedQuantityTotal(currentTime) {
        this.ensureContainsNoNftInstances();
        const lockedQuantity = this.getCurrentLockedQuantity(currentTime);
        return lockedQuantity;
    }
    ensureCanAddQuantity(quantity) {
        this.ensureContainsNoNftInstances();
        this.ensureIsValidQuantityForFungible(quantity);
        const add = () => {
            this.quantity = this.quantity.plus(quantity);
        };
        return { add };
    }
    ensureCanSubtractQuantity(quantity, currentTime) {
        this.ensureContainsNoNftInstances();
        this.ensureIsValidQuantityForFungible(quantity);
        this.ensureQuantityIsSpendable(quantity, currentTime);
        const subtract = () => {
            this.quantity = this.quantity.minus(quantity);
        };
        return { subtract };
    }
    ensureQuantityIsSpendable(quantity, currentTime) {
        // in use not supported for fungibles
        const lockedQuantity = this.getCurrentLockedQuantity(currentTime);
        const spendableQuantity = this.quantity.minus(lockedQuantity);
        if (spendableQuantity.isLessThan(quantity)) {
            throw new utils_1.ValidationFailedError("Insufficient balance", {
                balanceKey: this.getCompositeKey(),
                total: this.quantity.toFixed(),
                lockedQuantity: lockedQuantity.toFixed()
            });
        }
    }
    ensureTokenQuantityHoldIsFungible(hold) {
        if (!hold.instanceId.isEqualTo(TokenInstance_1.TokenInstance.FUNGIBLE_TOKEN_INSTANCE)) {
            const message = `Attempted to perform FT-specific operation on balance containing NFT instances`;
            throw new utils_1.ValidationFailedError(message, {
                balanceKey: this.getCompositeKey(),
                tokenHold: hold
            });
        }
    }
    ensureCanLockQuantity(hold) {
        this.ensureTokenQuantityHoldIsFungible(hold);
        this.ensureQuantityIsSpendable(hold.quantity, hold.created);
        const lock = () => {
            this.lockedHolds = [...this.getUnexpiredLockedHolds(hold.created), hold];
        };
        return { lock };
    }
    isMatchingHold(hold, name, lockAuthority) {
        return ((hold.name === name || (hold.name === undefined && name === undefined)) &&
            (hold.lockAuthority === lockAuthority ||
                (hold.lockAuthority === undefined && lockAuthority === undefined)));
    }
    ensureCanUnlockQuantity(quantity, currentTime, name, lockAuthority) {
        const unexpiredLockedHolds = this.getUnexpiredLockedHoldsSortedByAscendingExpiration(currentTime);
        const updated = [];
        let remainingQuantityToUnlock = quantity;
        for (const hold of unexpiredLockedHolds) {
            // if neither the authority nor the name match, just leave this hold alone
            if (!this.isMatchingHold(hold, name, lockAuthority)) {
                updated.push(hold);
                continue;
            }
            if (hold.quantity.isLessThanOrEqualTo(remainingQuantityToUnlock)) {
                remainingQuantityToUnlock = remainingQuantityToUnlock.minus(hold.quantity);
                // this hold's full quantity can be unlocked, drop it from updated array
                continue;
            }
            else {
                const remainingHoldQuantity = hold.quantity.minus(remainingQuantityToUnlock);
                remainingQuantityToUnlock = new bignumber_js_1.BigNumber(0);
                const partialQuantityHold = new TokenHold({
                    createdBy: hold.createdBy,
                    created: hold.created,
                    instanceId: hold.instanceId,
                    expires: hold.expires,
                    name: hold.name,
                    lockAuthority: hold.lockAuthority,
                    quantity: remainingHoldQuantity
                });
                updated.push(partialQuantityHold);
            }
        }
        if (remainingQuantityToUnlock.isGreaterThan("0")) {
            throw new TokenQuantityNotUnlockedError(this.owner, this, quantity, name);
        }
        const unlock = () => {
            this.lockedHolds = updated;
        };
        return { unlock };
    }
    getCurrentLockedQuantity(currentTime) {
        return this.getUnexpiredLockedHolds(currentTime).reduce((sum, h) => sum.plus(h.quantity), new bignumber_js_1.BigNumber(0));
    }
    ensureContainsNoNftInstances() {
        if (this.containsAnyNftInstanceId()) {
            const message = `Attempted to perform FT-specific operation on balance containing NFT instances`;
            throw new utils_1.ValidationFailedError(message, {
                currentInstanceIds: this.instanceIds,
                tokenClassKey: TokenClass_1.TokenClassKey.toStringKey(this)
            });
        }
    }
    ensureIsValidQuantityForFungible(quantity) {
        if (quantity.isNegative()) {
            throw new utils_1.ValidationFailedError(`FT quantity must be positive`, {
                balanceKey: this.getCompositeKey(),
                quantity: quantity.toString()
            });
        }
    }
}
exports.TokenBalance = TokenBalance;
TokenBalance.INDEX_KEY = "GCTB";
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 0 }),
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], TokenBalance.prototype, "owner", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 1 }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenBalance.prototype, "collection", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 2 }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenBalance.prototype, "category", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 3 }),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], TokenBalance.prototype, "type", void 0);
tslib_1.__decorate([
    (0, utils_1.ChainKey)({ position: 4 }),
    (0, class_validator_1.IsDefined)(),
    tslib_1.__metadata("design:type", String)
], TokenBalance.prototype, "additionalKey", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, validators_1.BigNumberArrayProperty)(),
    tslib_1.__metadata("design:type", Array)
], TokenBalance.prototype, "instanceIds", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => TokenHold),
    tslib_1.__metadata("design:type", Array)
], TokenBalance.prototype, "lockedHolds", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => TokenHold),
    tslib_1.__metadata("design:type", Array)
], TokenBalance.prototype, "inUseHolds", void 0);
tslib_1.__decorate([
    (0, validators_1.BigNumberIsNotNegative)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.BigNumber)
], TokenBalance.prototype, "quantity", void 0);
tslib_1.__decorate([
    (0, class_transformer_1.Exclude)(),
    tslib_1.__metadata("design:type", Object)
], TokenBalance, "INDEX_KEY", void 0);
class TokenHold {
    constructor(params) {
        var _a;
        if (params) {
            this.createdBy = params.createdBy;
            this.instanceId = params.instanceId;
            this.quantity = params.quantity;
            this.created = params.created;
            this.expires = (_a = params.expires) !== null && _a !== void 0 ? _a : TokenHold.DEFAULT_EXPIRES;
            if (params.name) {
                this.name = params.name;
            }
            if (params.lockAuthority) {
                this.lockAuthority = params.lockAuthority;
            }
        }
    }
    static async createValid(params) {
        const hold = new TokenHold({ ...params });
        const errors = await (0, class_validator_1.validate)(hold);
        if (errors.length > 0) {
            throw new ChainObject_1.ObjectValidationFailedError(errors);
        }
        return hold;
    }
    matches(instanceId, name) {
        return this.instanceId.isEqualTo(instanceId) && this.name === name;
    }
    isExpired(currentTime) {
        return this.expires !== 0 && currentTime > this.expires;
    }
    // sort holds in order of ascending expiration, 0 = no expiration date
    static sortByAscendingExpiration(a, b) {
        if (b.expires === 0 && a.expires === 0) {
            return 0;
        }
        else if (b.expires === 0) {
            return -1;
        }
        else if (a.expires === 0 || a.expires > b.expires) {
            return 1;
        }
        else {
            return -1;
        }
    }
}
exports.TokenHold = TokenHold;
TokenHold.DEFAULT_EXPIRES = 0;
tslib_1.__decorate([
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], TokenHold.prototype, "createdBy", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, validators_1.BigNumberIsPositive)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.BigNumber)
], TokenHold.prototype, "instanceId", void 0);
tslib_1.__decorate([
    (0, validators_1.BigNumberIsNotNegative)(),
    (0, validators_1.BigNumberProperty)(),
    tslib_1.__metadata("design:type", bignumber_js_1.BigNumber)
], TokenHold.prototype, "quantity", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsPositive)(),
    (0, class_validator_1.IsInt)(),
    tslib_1.__metadata("design:type", Number)
], TokenHold.prototype, "created", void 0);
tslib_1.__decorate([
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsInt)(),
    tslib_1.__metadata("design:type", Number)
], TokenHold.prototype, "expires", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], TokenHold.prototype, "name", void 0);
tslib_1.__decorate([
    (0, class_validator_jsonschema_1.JSONSchema)({
        description: "User who will be able to unlock token. " +
            "If the value is missing, then token owner and lock creator can unlock " +
            "in all cases token authority can unlock token."
    }),
    (0, class_validator_1.IsOptional)(),
    (0, validators_1.IsUserAlias)(),
    tslib_1.__metadata("design:type", String)
], TokenHold.prototype, "lockAuthority", void 0);
//# sourceMappingURL=TokenBalance.js.map