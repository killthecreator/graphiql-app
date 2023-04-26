import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getCsrfToken, signIn } from "next-auth/react";
import { useForm } from "react-hook-form";

import { useState } from "react";

import * as Switch from "@radix-ui/react-switch";

interface FormData {
  email: string;
  password: string;
  type: string;
}

export default function SignIn({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [submitType, setSubmitType] = useState("sign-in");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    signIn(submitType, { ...data });
  };
  return (
    <form
      className="flex flex-col items-center justify-center gap-8 p-8"
      method="post"
      action="/api/auth/callback/credentials"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <label className="flex flex-col gap-2">
        Email
        <input
          className="h-10 w-80 bg-slate-200 p-2"
          type="email"
          {...register("email")}
        />
      </label>
      <label className="flex flex-col gap-2">
        Password
        <input
          className="h-10  w-80 bg-slate-200 p-2"
          type="password"
          {...register("password")}
        />
      </label>
      <button className="h-10 w-40 rounded bg-cyan-700" type="submit">
        {submitType}
      </button>
      <p>sign in</p>
      <input
        type="radio"
        value="sign-in"
        defaultChecked
        name="type"
        onChange={(e) => setSubmitType(e.target.value)}
      />
      <p>sign up</p>
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
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
