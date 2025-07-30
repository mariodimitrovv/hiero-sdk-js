export interface TopicCreateParams {
    readonly memo?: string;
    readonly adminKey?: string;
    readonly submitKey?: string;
    readonly autoRenewPeriod: string;
    readonly autoRenewAccountId?: string;
    readonly feeScheduleKey?: string;
    readonly feeExemptKeys?: string[];
    readonly customFees?: CustomFee[];
    readonly commonTransactionParams?: Record<string, any>;
}

export interface TopicUpdateParams {
    readonly topicId: string;
    readonly memo?: string;
    readonly adminKey?: string;
    readonly submitKey?: string;
    readonly autoRenewPeriod: string;
    readonly autoRenewAccountId?: string;
    readonly expirationTime?: string;
    readonly feeScheduleKey?: string;
    readonly feeExemptKeys?: string[];
    readonly customFees?: CustomFee[];
    readonly commonTransactionParams?: Record<string, any>;
}

export interface TopicDeleteParams {
    readonly topicId: string;
    readonly commonTransactionParams?: Record<string, any>;
}

export interface TopicSubmitMessageParams {
    readonly topicId: string;
    readonly message: string;
    readonly maxChunks?: number;
    readonly chunkSize?: number;
    readonly commonTransactionParams?: Record<string, any>;
}

export interface CustomFee {
    readonly feeCollectorAccountId: string;
    readonly feeCollectorsExempt: boolean;
    readonly fixedFee: FixedFee;
}

export interface FixedFee {
    readonly amount: string;
    readonly denominatingTokenId?: string;
}
