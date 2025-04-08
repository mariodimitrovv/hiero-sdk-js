import {
    PrivateKey,
    TokenDeleteTransaction,
    AccountId,
    Wallet,
} from "../../../src/exports.js";
import LocalProvider from "../../../src/LocalProvider.js";

/**
 * @typedef {import("../../../src/exports.js").TokenId} TokenId
 * @typedef {import("../../../src/client/Client.js").Client<*, *>} Client
 */

export default class BaseIntegrationTestEnv {
    /**
     * @param {object} options
     * @property {Client} props.client
     * @property {PublicKey} options.originalOperatorKey
     * @property {AccountId} options.originalOperatorId
     * @property {PrivateKey} options.originalOperatorKey
     * @property {AccountId} options.operatorKey
     * @property {AccountId[]} options.operatorId
     * @property {Wallet} options.wallet
     */
    constructor(options) {
        /** @type {Client} */
        this.client = options.client;

        /** @type {PrivateKey} */
        this.operatorKey = options.operatorKey;

        /** @type {AccountId} */
        this.operatorId = options.operatorId;

        this.throwaway = options.throwaway;

        /** @type {Wallet} */
        this.wallet = options.wallet;

        Object.freeze(this);
    }

    /**
     * @param {object} [options]
     * @property {Client<*, *>} options.client
     * @property {{ [key: string]: string}} options.env
     * @property {number} [options.nodeAccountIds]
     * @property {boolean} [options.throwaway]
     */
    static async new(options = {}) {
        let client, wallet, operatorId, operatorKey;

        client = await options.client.fromConfigFile(options.env.CONFIG_FILE);
        client
            .setMaxNodeAttempts(1)
            .setNodeMinBackoff(0)
            .setNodeMaxBackoff(0)
            .setNodeMinReadmitPeriod(0)
            .setNodeMaxReadmitPeriod(0);

        const network = {};
        const nodeAccountIds =
            options.nodeAccountIds != null ? options.nodeAccountIds : 1;
        for (const [key, value] of Object.entries(client.network)) {
            network[key] = value;

            if (Object.keys(network).length >= nodeAccountIds) {
                break;
            }
        }
        console.log(network);
        client.setNetwork(network);

        return new BaseIntegrationTestEnv({
            client: client,
            wallet: wallet,
            operatorKey,
            operatorId,
            throwaway: options.throwaway,
        });
    }

    /**
     * @param {object} [options]
     * @property {TokenId | TokenId[]} token
     */
    async close(options = {}) {
        if (options.token != null) {
            if (!Array.isArray(options.token)) {
                options.token = [options.token];
            }

            for (const token of options.token) {
                await (
                    await new TokenDeleteTransaction()
                        .setTokenId(token)
                        .execute(this.client)
                ).getReceipt(this.client);
            }
        }

        // if (!this.throwaway && this.operatorId.toString() !== this.originalOperatorId.toString()) {
        //     await (await new AccountDeleteTransaction()
        //         .setAccountId(this.operatorId)
        //         .setTransferAccountId(this.originalOperatorId)
        //         .execute(this.client)
        //     ).getReceipt(this.client);
        // }

        this.client.close();
    }
}
