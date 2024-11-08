import { ChainObject } from "./ChainObject";
/**
 * @description
 *
 * Configure properties that may be used in conjunction with
 * a `TokenMintConfiguration` to lock some percentage of
 * tokens minted as a post-mint action.
 *
 */
export declare class PostMintLockConfiguration extends ChainObject {
    /**
     * @description
     *
     * This property will be used to create the `name` property
     * of the `TokenHold` created on the user's balance.
     *
     */
    lockName: string;
    /**
     * @description
     *
     * This property will be used to create the `lockAuthority`
     * property of the `TokenHold` created on the user's balance.
     *
     */
    lockAuthority: string;
    /**
     * @description
     *
     * This value will be used to set the `expires` property of
     * the `TokenHold` property created on the user's balance.
     *
     * It will be added to the GalaChainContext.txUnixTime value
     * which, at the time of this writing (Oct 2024), is
     * represented in milliseconds.
     *
     * @example
     *
     * 2592000000 = 30 days (1000 * 60 * 60 * 24 * 30)
     */
    expirationModifier: number;
    /**
     * @description
     *
     * Set the percentage of tokens that should be locked,
     * post-mint.
     *
     * @example
     *
     * 0.25 = 25%
     */
    lockPercentage: number;
}
/**
 * @description
 *
 * Configure properties that may be used in conjunction with
 * a `TokenMintConfiguration` to specify a pre-mint or post-mint
 * burn of the token quantity being minted as part of the
 * mint action.
 */
export declare class BurnToMintConfiguration extends ChainObject {
    /**
     * @description
     *
     * Percentage of tokens to be burned in conjunction with each
     * mint action, expressed as a value between 0 and 1.
     *
     * @example
     *
     * 0.25 = 25%
     */
    burnPercentage: number;
}
/**
 * @description
 *
 * Configure mint configurations for specific token classes.
 * The chain key properties are expected to match a token
 * class.
 *
 * On mint actions, the `@GalaTransaction` decorator's
 * `before` and/or `after`
 * property can potentially be configured with custom functions
 * that will look for these configuration options.
 *
 * If present,  they can execute myriad additional actions
 * atomically with the mint, such as post-mint fees,
 * nft crafting (e.g. burn three common parts to assemble one rare) etc.
 *
 */
export declare class TokenMintConfiguration extends ChainObject {
    static INDEX_KEY: string;
    collection: string;
    category: string;
    type: string;
    additionalKey: string;
    /**
     * @description
     *
     * (optional) specify a `BurnToMintConfiguration` to configure a specific
     * token class to potentially burn some amount of
     * the quantity to-be-minted prior to executing
     * the mint.
     *
     */
    preMintBurn?: BurnToMintConfiguration;
    /**
     * @description
     *
     * (optional) specify a `BurnToMintConfiguration` to configure a specific
     * token class to potentially burn some amount of
     * minted quantity post-mint.
     *
     */
    postMintBurn?: BurnToMintConfiguration;
    /**
     * @description
     *
     * (optional) set a quantity to configure a specific
     * token class to lock some amount of
     * minted quantity post-mint.
     *
     * @remarks
     *
     * Use in conjucntion with `FeeCodeDefintion` chain objects
     * and Fee Exit Gates to set specific amounts and/or percentages
     * to be burned.
     *
     */
    postMintLock?: PostMintLockConfiguration;
    validatePostProcessingTotals(): void;
}
