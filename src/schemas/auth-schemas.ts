import * as z from "zod";

export const RegisterFormSchema = z
  .object({
    fullName: z
      .string({
        message: "Your full name is required.",
      })
      .min(2, {
        message: "Minimum 2 characters is needed.",
      })
      .max(30, {
        message: "Not more than 30 characters allowed.",
      }),

    email: z.string().email({
      message: "A valid email address is required.",
    }),

    password: z
      .string({
        message: "Password is absolutely important.",
      })
      .min(6, {
        message: "A password of minimum 6 characters is needed.",
      }),

    confirmPassword: z.string({
      message: "Enter the same password for confirmation.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password did not match, please check and re-type.",
    path: ["confirmPassword"],
  });

export const LoginFormSchema = z.object({
  email: z.string().email({
    message: "This field is for a valid email.",
  }),
  password: z
    .string({
      message: "Password is needed for login.",
    })
    .min(6, {
      message: "Minimum 6 characters is needed.",
    }),
});
