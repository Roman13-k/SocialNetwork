import React, { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../shared/buttons/button";
import { Input } from "../../shared/inputs/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema } from "@/utils/validate/authSchema";
import { LoginFormType } from "@/types/login";
import { useAppSelector } from "@/store/hooks";
import P from "../../shared/text/P";

interface EmailRegOrLogProps {
  handleLoginOrRegUser: (data: LoginFormType) => void;
  isRegister: boolean;
  setIsRegister: Dispatch<SetStateAction<boolean>>;
}

export default function EmailRegOrLog({
  isRegister,
  setIsRegister,
  handleLoginOrRegUser,
}: EmailRegOrLogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>({ resolver: zodResolver(authSchema), mode: "onSubmit" });
  const onSubmit: SubmitHandler<LoginFormType> = (data) => handleLoginOrRegUser(data);
  const { error, loading } = useAppSelector((state) => state.user);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-3 w-[300px]'>
      <Input
        error={errors?.email?.message}
        type='email'
        placeholder='Email'
        {...register("email", { required: true })}
      />
      <Input
        error={errors?.password?.message}
        type='password'
        placeholder='Password'
        {...register("password", { required: true })}
      />
      <Button loading={loading} disabled={loading} variant={"secondary"} type='submit'>
        {isRegister ? "Register" : "Login"}
      </Button>
      {(error?.code === "invalid_credentials" || error?.code === "user_already_exists") && (
        <P className='text-center' variant={"error"} size={"xs"}>
          {error?.code === "invalid_credentials"
            ? "Incorrect login or password"
            : "User already registered"}
        </P>
      )}
      <button
        type='button'
        onClick={() => setIsRegister(!isRegister)}
        className='text-sm text-accent underline cursor-pointer'>
        {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
      </button>
    </form>
  );
}
