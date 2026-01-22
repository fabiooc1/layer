"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/password-input";
import { signInUserAction } from "@/app/actions/sign-in-user-action";
import {
  SignInFormData,
  signInFormSchema,
} from "@/app/schemas/sign-in-form-schema";
import { keys } from "@/mapping/errorKeys";

export function SignInForm() {
  const router = useRouter();
  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  async function handleFormSubmit(data: SignInFormData) {
    try {
      await signInUserAction(data);
      router.replace("/");
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === keys.INVALID_CREDENTIALS
      ) {
        form.setError("login", {
          message: "Login ou senha inválidos",
        });

        form.setError("password", {
          message: "Login ou senha inválidos",
        });

        return;
      }

      console.error(error);
    }
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Acesse sua conta</CardTitle>
        <CardDescription>Entre para continuar</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          className="space-y-6"
          onSubmit={form.handleSubmit(handleFormSubmit)}
        >
          <Form {...form}>
            <FormField
              name="login"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Login</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <PasswordInput {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>

          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
