// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import type { DeepRacerIndyUserPoolConfig } from '#types/userPoolConfig.js';

import { DEFAULT_NAMESPACE } from './commonDefaults.js';

export const BASE_USER_POOL_NAME = 'DeepRacerIndyUserPool';

const namespace = (typeof process !== 'undefined' && process.env?.NAMESPACE) || DEFAULT_NAMESPACE;

export const userPoolDefaults = {
  userPoolName: `${namespace}-${BASE_USER_POOL_NAME}`,
  enableMFA: false,
  // 本部署关闭自助注册：仅允许管理员邀请、批量导入或现场注册角色创建账号。
  // v1.3.0 起上游默认改为 true，且新用户额度为不限，开放注册会带来不可控的训练费用。
  enableSignups: false,
} as const satisfies DeepRacerIndyUserPoolConfig;
