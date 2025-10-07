import { z } from 'zod';

export const createUserSchema = z.object({
  firstName: z.string()
    .min(2, 'Primeiro nome deve ter pelo menos 2 caracteres')
    .max(50, 'Primeiro nome deve ter no máximo 50 caracteres')
    .trim(),

  lastName: z.string()
    .min(2, 'Sobrenome deve ter pelo menos 2 caracteres')
    .max(50, 'Sobrenome deve ter no máximo 50 caracteres')
    .trim(),

  cpf: z.string()
    .length(11, 'CPF deve ter exatamente 11 dígitos')
    .regex(/^\d+$/, 'CPF deve conter apenas números')
    .refine((cpf) => {
      if (cpf.length !== 11) return false;

      if (/^(\d)\1+$/.test(cpf)) return false;

      let sum = 0;
      for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
      }
      let remainder = (sum * 10) % 11;
      if (remainder === 10 || remainder === 11) remainder = 0;
      if (remainder !== parseInt(cpf.charAt(9))) return false;

      sum = 0;
      for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
      }
      remainder = (sum * 10) % 11;
      if (remainder === 10 || remainder === 11) remainder = 0;
      return remainder === parseInt(cpf.charAt(10));
    }, 'CPF inválido'),

  password: z.string()
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .max(100, 'Senha deve ter no máximo 100 caracteres')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Senha deve conter pelo menos uma letra minúscula, uma maiúscula e um número'),
  role: z.enum(['USER', 'ADMIN'], {
    message: 'Função deve ser USER ou ADMIN',
  }).optional(),
});

export type CreateUserDto = z.infer<typeof createUserSchema>;