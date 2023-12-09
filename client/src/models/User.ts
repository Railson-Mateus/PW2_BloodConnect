import { z } from "zod";

export interface User {
  id: string | undefined;
  email: string;
  password: string;
  name: string;
  bloodType: string;
  gender: string | null;
  photo: string | null;
  dateOfBirth: string | Date;
  phone: string;
  isAdmin: boolean;
  termsOfUseAccepted: boolean;
  privacyPolicy: boolean;
  createdAt: Date | string;
  updatedAt: Date | string | null;
}

export const UserSchemaSignIn = z.object({
  email: z.string().email({ message: "email inválido" }),
  password: z.string().min(6, { message: "password menor a 6 caracteres" }),
});

export type UserSignInType = z.infer<typeof UserSchemaSignIn>;

export const UserSchemaSignUp = z
  .object({
    name: z.string().min(1, { message: "nome obrigatório" }),
    email: z
      .string()
      .min(1, { message: "email obrigatório" })
      .email({ message: "email inválido" }),
    password: z
      .string()
      .min(6, { message: "password tem que ter 6 ou mais caracteres" }),
    confirmPassword: z
      .string()
      .min(6, { message: "confirmar senha obrigatório" }),
    phone: z.string().min(1, { message: "O telefone é obrigatorio" }),
    dateOfBirth: z
      .string()
      .min(1, { message: "Data de nascimento é obrigatorio" }),
    photo: z.optional(z.any()),
    gender: z.optional(z.string()),
    bloodType: z.string().min(2, { message: "Tipo sanguineo é obrigatorio" }),
    termsOfUseAccepted: z.boolean({
      required_error: "Termos de uso é obrigatorio",
    }),
    privacyPolicy: z.boolean({
      required_error: "Politica de privacidade é obrigatorio",
    }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords não são iguais",
    path: ["confirmPassword"],
  });

export type UserSignUpType = z.infer<typeof UserSchemaSignUp>;
