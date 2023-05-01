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
import { cn } from "~/lib/utils";

interface FormData {
  email: string;
  password: string;
  type: string;
}

const firebaseConfig = {
  apiKey: "AIzaSyDTYLMLx4me6RruOfkxb1TMqtucN2EbNGU",
  authDomain: "graphiql-app.firebaseapp.com",
  projectId: "graphiql-app",
  storageBucket: "graphiql-app.appspot.com",
  messagingSenderId: "581579745098",
  appId: "1:581579745098:web:cc718240e2f1df78ec43b3",
  measurementId: "G-W6HLFS6K4J",
};

const Login = () => {
  const [submitType, setSubmitType] = useState("sign-in");
  const [formError, setFormError] = useState("");
  const [wrongPassCount, setWrongPassCount] = useState(0);

  const csrfInput = useRef<HTMLInputElement>(null);

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
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    const signInRes = await signIn(submitType, { ...data, redirect: false });
    if (signInRes && signInRes.error) {
      if (signInRes.error === "The password is not correct") {
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
            <span className="mb-6 h-1">
              {errors.password && errors.password.message}
            </span>
            <span
              className={cn(
                "cursor-default text-center text-xs opacity-0",
                wrongPassCount > 3 && "cursor-auto opacity-100"
              )}
            >
              Forgot password?&nbsp;
              <span
                className={cn(
                  "font-semibold underline",
                  wrongPassCount > 3 && "cursor-pointer"
                )}
                onClick={() => console.log(1)}
              >
                You can resotre it via email
              </span>
            </span>
          </Label>

          <DialogFooter className="w-6/12 items-center gap-10 ">
            <Button className="grow" type="submit">
              {submitType === "sign-in" ? "Sign In" : "Sign Up"}
            </Button>
            <Switch
              className="grow-0"
              value={submitType}
              onClick={() => {
                setWrongPassCount(0);
                reset();
                setFormError("");
                setSubmitType(submitType === "sign-in" ? "sign-up" : "sign-in");
              }}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
