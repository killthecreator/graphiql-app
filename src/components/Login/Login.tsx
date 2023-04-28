import { getCsrfToken, signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

import { useState, useRef, useEffect } from "react";

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

interface FormData {
  email: string;
  password: string;
  type: string;
}

import { auth } from "~/pages/api/auth/[...nextauth]";
import { sendPasswordResetEmail } from "firebase/auth";

const Login = () => {
  const [submitType, setSubmitType] = useState("sign-in");
  const [formError, setFormError] = useState(" ");
  const [wrongPassCount, setWrongPassCount] = useState(0);

  const csrfInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const csrfToken = await getCsrfToken();
      if (csrfInput.current) {
        csrfInput.current.value = csrfToken as string;
      }
    })();
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const signInRes = await signIn(submitType, { ...data, redirect: false });
    if (signInRes && signInRes.error) {
      if (signInRes.error === "Too many requests...") {
        setWrongPassCount(wrongPassCount + 1);
      }

      setFormError(signInRes.error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger>Sign in / Sign Up</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {submitType === "sign-in" ? "Sign In" : "Sign Up"}
          </DialogTitle>
          <DialogDescription>
            {submitType === "sign-in"
              ? "Login into existing account"
              : "Create a new account"}
          </DialogDescription>
        </DialogHeader>
        <form
          className="flex flex-col items-center justify-center gap-8"
          method="post"
          action="/api/auth/callback/credentials"
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
                required: "Please, input Email",
              })}
            />
            <span className="h-1">
              {errors.email ? errors.email.message : ""}
            </span>
          </Label>
          <Label className="flex flex-col gap-2">
            Password
            <Input
              className="h-10 w-80 bg-slate-200 p-2"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Please, input password",
                validate: (value) => {
                  if (submitType === "sign-in") return;
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
            <span className="h-1">
              {errors.password ? errors.password.message : ""}
            </span>
          </Label>
          <span
            className={
              "-mt8 text-center text-xs" +
              (wrongPassCount < 3 ? "opacity-0" : "opacity-100")
            }
          >
            Forgot password?&nbsp;
            <span className=" cursor-pointer font-semibold  underline">
              You can resotre it via email
            </span>
          </span>
          <DialogFooter className="-mt-4 flex items-center gap-10 ">
            <Button className="h-10 w-40" type="submit">
              {submitType === "sign-in" ? "Sign In" : "Sign Up"}
            </Button>
            <Switch
              value={submitType}
              onClick={() => {
                setFormError("");
                setSubmitType(submitType === "sign-in" ? "sign-up" : "sign-in");
              }}
            ></Switch>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Login;

/* export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      trigger: false,
      csrfToken: await getCsrfToken(context),
    },
  };
} */
