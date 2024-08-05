"use client";

import { LoginFormSchema } from "@/schemas/auth-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import AuthFormCardWrapper from "@/components/cards/auth-form-card-wrapper";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleFormSubmit = (values: z.infer<typeof LoginFormSchema>) => {
    console.log(values);
  };

  return (
    <AuthFormCardWrapper
      backButtonHref="/register"
      backButtonLabel="Don't have an account ? Register"
      cardDescription="Hey ! Great to see you back. Just login to your account and continue from where you left."
      cardTitle="Login"
    >
      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit(handleFormSubmit)}
        >
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="johndoe@mail.com"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="cf3cd4db96f4ce59e336"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="flex w-full items-center gap-1"
            variant={"default"}
          >
            Register
          </Button>
        </form>
      </Form>
    </AuthFormCardWrapper>
  );
}
