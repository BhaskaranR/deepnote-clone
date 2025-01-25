"use client";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

type FormContextProps = {
  id?: string | null;
  children: React.ReactNode;
};

export function FormContext({
  id,
  children,
}: FormContextProps) {

  const form = useForm({
    mode: "onChange",
  });

  return <FormProvider {...form}>{children}</FormProvider>;
}
