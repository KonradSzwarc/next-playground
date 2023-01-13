import { useRouter } from 'next/router';
import { useAsync } from 'react-use';
import { z } from 'zod';

import { trpc } from '@/features/trpc/client';
import { emailSchema } from '@/models';
import { ConfirmEmailForm, ConfirmEmailFormProps } from '@/modules/auth';

const querySchema = z.object({
  email: emailSchema,
});

const ConfirmEmailPage = () => {
  const router = useRouter();
  const confirmEmailMutation = trpc.auth.confirmEmail.useMutation();

  const query = querySchema.safeParse(router.query);
  const shouldRedirect = router.isReady && !query.success;

  useAsync(async () => {
    if (shouldRedirect) await router.push('/auth/login');
  }, [shouldRedirect]);

  if (shouldRedirect) return null;

  const handleSubmit: ConfirmEmailFormProps['onSubmit'] = async (values) => {
    if (query.success) {
      await confirmEmailMutation.mutateAsync({
        code: values.code,
        email: query.data.email,
      });
      await router.push('/auth/login');
    }
  };

  return <ConfirmEmailForm onSubmit={handleSubmit} />;
};

export default ConfirmEmailPage;
