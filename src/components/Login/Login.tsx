import { getCsrfToken, signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

import { useState, useRef, useEffect } from "react";

import * as Switch from "@radix-ui/react-switch";

interface FormData {
  email: string;
  password: string;
  type: string;
}

const Login = ({ trigger }: { trigger: boolean }) => {
  const [submitType, setSubmitType] = useState("sign-in");
  const [formError, setFormError] = useState(" ");

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
    console.log(data);
    const signInRes = await signIn(submitType, { ...data, redirect: false });
    if (signInRes && signInRes.error) setFormError(signInRes.error);
  };
  return (
    <>
      {trigger && (
        <form
          className="fixed left-1/2 top-1/2 flex -translate-x-1/2 
          -translate-y-1/2 flex-col items-center justify-center 
          gap-8 rounded-md bg-slate-600 p-8 shadow-lg"
          method="post"
          action="/api/auth/callback/credentials"
          onSubmit={handleSubmit(onSubmit)}
        >
          <p>{formError}</p>
          <input ref={csrfInput} name="csrfToken" type="hidden" />
          <label className="flex flex-col gap-2">
            Email
            <input
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
          </label>
          <label className="flex flex-col gap-2">
            Password
            <input
              className="h-10  w-80 bg-slate-200 p-2"
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
          </label>
          <button className="h-10 w-40 rounded bg-cyan-700" type="submit">
            {submitType === "sign-in" ? "Sign In" : "Sign Up"}
          </button>
          <p>Sign In</p>
          <input
            type="radio"
            value="sign-in"
            defaultChecked
            name="type"
            onChange={(e) => setSubmitType(e.target.value)}
          />
          <p>Sign Up</p>
          <input
            type="radio"
            value="sign-up"
            name="type"
            onChange={(e) => setSubmitType(e.target.value)}
          />
          <Switch.Root className="SwitchRoot" id="airplane-mode">
            <Switch.Thumb className="SwitchThumb" />
          </Switch.Root>
        </form>
      )}
    </>
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
