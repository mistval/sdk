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
export default function serialize(object: unknown): string;
