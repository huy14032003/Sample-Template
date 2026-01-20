import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginFormValues } from "@/features/auth/types/auth.types";
import React from "react";
import { useForm } from "react-hook-form";
import { Form, FormItem, FormLabel, FormControl, FormMessage, FormField } from "@components/ui/form";
import useLogin from "@/features/auth/hooks/useLogin";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Spinner } from "@/components/ui/spinner";

const FormLogin = () => {
  const formLogin = useForm<LoginFormValues>();
  const { formSubmit, loadingLogin } = useLogin();
  return (
    <div className="flex  justify-center items-center min-w-screen  min-h-screen">
      <Form {...formLogin}>
        <form
          onSubmit={formLogin.handleSubmit(formSubmit)}
          id="login"
          action=""
          className="flex flex-col gap-2 justify-center items-center min-w-60">
          <FormField
            control={formLogin.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Tài khoản</FormLabel>
                <FormControl>
                  <Input placeholder="Username..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={formLogin.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl>
                  <PasswordInput placeholder="password..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button form="login" className="w-full bg-primary" type="submit" disabled={loadingLogin}>
            {loadingLogin ? (
              <>
                <Spinner />
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FormLogin;
