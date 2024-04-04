import { object, string, TypeOf } from 'zod';

export const notifyOwnerValidationSchema = object({
  email: string().email().min(1, { message: 'Email is required' }),
  location: string().min(1, { message: 'Location is required' }),
  message: string().min(1, { message: 'Message body is required' }),
  mobileNumber: string().min(1, { message: 'Mobile number is required' }),
});

export type notifyOwnerPayload = TypeOf<typeof notifyOwnerValidationSchema>;
