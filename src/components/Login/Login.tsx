import { getCsrfToken, signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

import { useState, useRef, useEffect } from "react";

import { useRouter } from "next/router";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  Switch,
  Input,
  Label,
  Button,
} from "~/components/ui";
import { cn } from "~/lib/utils";

interface FormData {
  email: string;
  password: string;
  type: string;
}

interface LoginProps {
  children: React.ReactNode;
  mode: "sign-in" | "sign-up";
}

const Login = ({ children, mode }: LoginProps) => {
  const [formError, setFormError] = useState("");
  const [suggestReset, setSuggestReset] = useState(false);
  const [isPassSent, setIsPassSent] = useState(false);
  const csrfInput = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const csrfToken = await getCsrfToken();
      if (csrfInput.current) {
        csrfInput.current.value = csrfToken as string;
      }
    })();
  }, []);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const signInRes = await signIn(mode, { ...data, redirect: false });
    if (signInRes && signInRes.error) {
      if (signInRes.error === "Too many attempts with incorrect password...") {
        setSuggestReset(true);
      }
      setFormError(signInRes.error);
    } else {
      router.push("/editor");
    }
  };

  const resetPassword = async () => {
    const curEmail = getValues("email");
    await signIn("reset", { email: curEmail, redirect: false });

    setSuggestReset(false);
    setIsPassSent(true);

    setTimeout(() => {
      setIsPassSent(false);
    }, 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "sign-in" ? "Sign In" : "Sign Up"}
          </DialogTitle>
          <DialogDescription>
            {mode === "sign-in"
              ? "Login into an existing account"
              : "Create a new account"}
          </DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col items-center justify-center gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="h-2 text-center">{formError}</p>
          <input ref={csrfInput} name="csrfToken" type="hidden" />
          <Label className="flex flex-col gap-2">
            Email
            <Input
              className="h-10 w-80 bg-slate-200 p-2"
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Please, input email",
              })}
            />
            <span className="h-1">{errors.email && errors.email.message}</span>
          </Label>
          <Label className="flex flex-col gap-2">
            Password
            <Input
              className="h-10 w-80 bg-slate-200 p-2 dark:text-black"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Please, input password",
                validate: (value) => {
                  if (mode === "sign-in") return;
                  if (value.length < 8)
                    return "Password should be at least 8 characters long";
                  if (!value.match(/(?=.*?[0-9])/))
                    return "Password requires at least one digit";
                  if (
                    !value.match(/(?=.*[a-z])/) &&
                    !value.match(/(?=.*[A-Z])/)
                  )
                    return "Password requires at least one letter";
                  if (!value.match(/(?=.*[!@#$%^&*])/))
                    return "Password requires at least one special character";
                },
              })}
            />
            <span className="mb-6 h-1">
              {errors.password && errors.password.message}
            </span>
            {!isPassSent ? (
              <span
                className={cn(
                  "cursor-default text-center text-xs opacity-0",
                  suggestReset && "cursor-text opacity-100"
                )}
              >
                Forgot password?&nbsp;
                <span
                  className={cn(
                    "font-semibold underline",
                    suggestReset && "cursor-pointer"
                  )}
                  onClick={suggestReset ? resetPassword : undefined}
                >
                  You can resotre it via email
                </span>
              </span>
            ) : (
              <span className={cn("text-center text-xs text-green-500")}>
                We sent you an email to restore your password
              </span>
            )}
          </Label>
          <DialogFooter className="w-4/12">
            <Button className="grow" type="submit">
              {mode === "sign-in" ? "Sign In" : "Sign Up"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
