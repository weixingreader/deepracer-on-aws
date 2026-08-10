// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { SageMakerClient } from '@aws-sdk/client-sagemaker';
import { logger, tracer } from '@deepracer-indy/utils';
import { getCustomUserAgent } from '@deepracer-indy/utils/src/customUserAgent';

export const sageMakerClient = tracer.captureAWSv3Client(
  new SageMakerClient({
    logger,
    customUserAgent: getCustomUserAgent(),
    // ListTrainingJobs 的账号级速率上限为 2 次/秒且不可调整，突发调用极易触发
    // ThrottlingException。使用自适应重试模式（客户端侧限速 + 指数退避）并提高重试
    // 次数，避免限流直接导致 JobDispatcher 失败、进而堵塞 FIFO 队列。
    retryMode: 'adaptive',
    maxAttempts: 10,
  }),
);
