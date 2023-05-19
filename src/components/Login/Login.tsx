import { getCsrfToken, signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

import { useState, useRef, useEffect } from "react";

import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
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
  const { t } = useTranslation("login");

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
      if (signInRes.error === "auth/too-many-requests") {
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
            {mode === "sign-in" ? t("sign in") : t("sign up")}
          </DialogTitle>
          <DialogDescription>
            {mode === "sign-in" ? t("login") : t("create")}
          </DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col items-center justify-center gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p className="h-2 text-center">{t(formError)}</p>
          <input ref={csrfInput} name="csrfToken" type="hidden" />
          <Label className="flex flex-col gap-2">
            Email
            <Input
              className="h-10 w-80 bg-slate-200 p-2 dark:text-black"
              type="email"
              placeholder="Email"
              {...register("email", {
                required: t("please input email")!,
              })}
            />
            <span className="h-1">{errors.email && errors.email.message}</span>
          </Label>
          <Label className="flex flex-col gap-2">
            {t("password")!}
            <Input
              className="h-10 w-80 bg-slate-200 p-2 dark:text-black"
              type="password"
              placeholder={t("password")!}
              {...register("password", {
                required: t("please input pass")!,
                validate: (value) => {
                  if (mode === "sign-in") return;
                  if (value.length < 8) return t("too short")!;
                  if (!value.match(/(?=.*?[0-9])/)) return t("need digit")!;
                  if (
                    !value.match(/(?=.*[a-z])/) &&
                    !value.match(/(?=.*[A-Z])/)
                  )
                    return t("need letter")!;
                  if (!value.match(/(?=.*[!@#$%^&*])/))
                    return t("need special")!;
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
                {t("forgot pass")}&nbsp;
                <span
                  className={cn(
                    "font-semibold underline",
                    suggestReset && "cursor-pointer"
                  )}
                  onClick={suggestReset ? resetPassword : undefined}
                >
                  {t("can restore")}
                </span>
              </span>
            ) : (
              <span className={cn("text-center text-xs text-green-500")}>
                {t("sent an email")}
              </span>
            )}
          </Label>
          <DialogFooter>
            <Button className="w-[160px]" type="submit">
              {mode === "sign-in" ? t("sign in") : t("sign up")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
