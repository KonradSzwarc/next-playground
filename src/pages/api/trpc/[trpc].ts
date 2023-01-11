// Requires full-path import to not cause circular dependency with the trpc router.
import { createTrpcApiHandler } from '@/features/trpc/server/api-handler';

export default createTrpcApiHandler();
