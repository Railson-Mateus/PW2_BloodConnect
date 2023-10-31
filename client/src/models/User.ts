import { z } from "zod";

export interface User {
  id: string | undefined;
  email: string;
  password: string;
  fullName: string;
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
  email: z.string().email({ message: "error: email inválido" }),
  password: z
    .string()
    .min(6, { message: "Error: password menor a 6 caracteres" }),
});

export type UserSignInType = z.infer<typeof UserSchemaSignIn>;

export const UserSchemaSignUp = z
  .object({
    name: z.string().min(1, { message: "nome obrigatório" }),
    email: z
      .string()
      .min(1, { message: "email obrigatório" })
      .email({ message: "error: email inválido" }),
    password: z
      .string()
      .min(6, { message: "Error: password tem que ter 6 ou mais caracteres" }),
    confirmPassword: z
      .string()
      .min(6, { message: "confirmar senha obrigatório" }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Errors: Passwords não são iguais",
    path: ["confirmPassword"],
  });

export type UserSignUpType = z.infer<typeof UserSchemaSignUp>;
