import { SetMetadata } from '@nestjs/common';
import { PolicyMetadata } from '../interfaces/policy.interface';

export const POLICY_KEY = 'policy';

export const RequirePolicy = (policy: PolicyMetadata) =>
  SetMetadata(POLICY_KEY, policy);
