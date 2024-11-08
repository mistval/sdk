/**
 *  Property helper functions.
 *
 *  @_subsection api/utils:Properties  [about-properties]
 */
/**
 *  Assigns the %%values%% to %%target%% as read-only values.
 *
 *  It %%types%% is specified, the values are checked.
 */
export declare function defineProperties<T>(target: T, values: {
    [K in keyof T]?: T[K];
}, types?: {
    [K in keyof T]?: string;
}): void;
