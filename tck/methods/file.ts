import {
    FileCreateTransaction,
    FileAppendTransaction,
    FileUpdateTransaction,
    FileDeleteTransaction,
    Timestamp,
} from "@hashgraph/sdk";
import Long from "long";

import { applyCommonTransactionParams } from "../params/common-tx-params";
import {
    FileCreateParams,
    FileAppendParams,
    FileDeleteParams,
} from "../params/file";

import { sdk } from "../sdk_data";
import { FileResponse } from "../response/file";

import { DEFAULT_GRPC_DEADLINE } from "../utils/constants/config";
import { getKeyFromString } from "../utils/key";

export const createFile = async ({
    keys,
    contents,
    expirationTime,
    memo,
    commonTransactionParams,
}: FileCreateParams): Promise<FileResponse> => {
    const transaction = new FileCreateTransaction().setGrpcDeadline(
        DEFAULT_GRPC_DEADLINE,
    );

    if (keys?.length && keys.length > 0) {
        transaction.setKeys(keys.map((key: string) => getKeyFromString(key)));
    }

    if (contents != null) {
        transaction.setContents(contents);
    }

    if (expirationTime != null) {
        transaction.setExpirationTime(
            new Timestamp(Long.fromString(expirationTime), 0),
        );
    }

    if (memo != null) {
        transaction.setFileMemo(memo);
    }

    if (commonTransactionParams != null) {
        applyCommonTransactionParams(
            commonTransactionParams,
            transaction,
            sdk.getClient(),
        );
    }

    const response = await transaction.execute(sdk.getClient());
    const receipt = await response.getReceipt(sdk.getClient());

    return {
        fileId: receipt.fileId.toString(),
        status: receipt.status.toString(),
    };
};

export const updateFile = async ({
    fileId,
    keys,
    contents,
    expirationTime,
    memo,
    commonTransactionParams,
}: any): Promise<FileResponse> => {
    const transaction = new FileUpdateTransaction().setGrpcDeadline(
        DEFAULT_GRPC_DEADLINE,
    );

    if (fileId != null) {
        transaction.setFileId(fileId);
    }

    if (keys != null) {
        transaction.setKeys(keys.map((key: string) => getKeyFromString(key)));
    }

    if (contents != null) {
        transaction.setContents(contents);
    }

    if (expirationTime != null) {
        transaction.setExpirationTime(
            new Timestamp(Long.fromString(expirationTime), 0),
        );
    }

    if (memo != null) {
        transaction.setFileMemo(memo);
    }

    if (commonTransactionParams != null) {
        applyCommonTransactionParams(
            commonTransactionParams,
            transaction,
            sdk.getClient(),
        );
    }

    const response = await transaction.execute(sdk.getClient());
    const receipt = await response.getReceipt(sdk.getClient());

    return {
        status: receipt.status.toString(),
    };
};

export const appendFile = async ({
    fileId,
    contents,
    maxChunks,
    chunkSize,
    commonTransactionParams,
}: FileAppendParams): Promise<FileResponse> => {
    const transaction = new FileAppendTransaction().setGrpcDeadline(
        DEFAULT_GRPC_DEADLINE,
    );

    if (fileId != null) {
        transaction.setFileId(fileId);
    }

    if (contents != null) {
        transaction.setContents(contents);
    }

    if (maxChunks != null) {
        transaction.setMaxChunks(maxChunks);
    }

    if (chunkSize != null) {
        transaction.setChunkSize(chunkSize);
    }

    if (commonTransactionParams != null) {
        applyCommonTransactionParams(
            commonTransactionParams,
            transaction,
            sdk.getClient(),
        );
    }

    const response = await transaction.execute(sdk.getClient());
    const receipt = await response.getReceipt(sdk.getClient());

    return {
        status: receipt.status.toString(),
    };
};

export const deleteFile = async ({
    fileId,
    commonTransactionParams,
}: FileDeleteParams): Promise<FileResponse> => {
    const transaction = new FileDeleteTransaction().setGrpcDeadline(
        DEFAULT_GRPC_DEADLINE,
    );

    if (fileId != null) {
        transaction.setFileId(fileId);
    }

    if (commonTransactionParams != null) {
        applyCommonTransactionParams(
            commonTransactionParams,
            transaction,
            sdk.getClient(),
        );
    }

    const response = await transaction.execute(sdk.getClient());
    const receipt = await response.getReceipt(sdk.getClient());

    return {
        status: receipt.status.toString(),
    };
};
