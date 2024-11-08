import { ethers } from "ethers";
export declare class WalletUtils {
    static createRandom(): {
        galachainAddress: string;
        privateKey: string;
        publicKey: string;
        ethAddress: string;
        mnemonic: ethers.Mnemonic | null;
    };
    /**
     * Registers a new wallet.
     *
     * @param {string} uri - The URI to register the wallet.
     * @param {string} walletPublicKey - The public key of the wallet to be registered.
     *
     * Usage:
     *
     * - For Stage: `https://dex-api-platform-dex-stage-gala.gala.com/v1/CreateHeadlessWallet`
     * - For Prod: `https://api-galaswap.gala.com/v1/CreateHeadlessWallet`
     *
     * @returns {Promise<string>} - A promise that resolves to a success message if the wallet is registered successfully, or an error message otherwise.
     */
    static registerWallet(uri: string, walletPublicKey: string): Promise<string>;
    /**
     * Registers a new wallet.
     *
     * @param {string} uri - The URI to register the wallet.
     *
     * Usage:
     *
     * - For Stage: `https://stage-galaswap.gala.com/v1/CreateHeadlessWallet`
     * - For Prod: `https://api-galaswap.gala.com/v1/CreateHeadlessWallet`
     *
     */
    static createAndRegisterRandomWallet(uri: string): Promise<{
        galachainAddress: string;
        privateKey: string;
        publicKey: string;
        ethAddress: string;
        mnemonic: ethers.Mnemonic | null;
    }>;
}
