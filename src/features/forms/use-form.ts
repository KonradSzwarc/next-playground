import { useForm as useReactHookForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { infer as InferValuesFromSchema, ZodSchema } from 'zod';

export const useForm = <Schema extends ZodSchema<any, any>>(props: {
  schema: Schema;
  defaultValues?: InferValuesFromSchema<Schema>;
}) => useReactHookForm({ resolver: zodResolver(props.schema), defaultValues: props.defaultValues });
