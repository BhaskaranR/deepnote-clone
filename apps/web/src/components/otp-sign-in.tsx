"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@deepnote-clone/supabase/client";

import { Button } from "@deepnote-clone/ui/button";
import { cn } from "@deepnote-clone/ui/cn";
import { Form, FormControl, FormField, FormItem } from "@deepnote-clone/ui/form";
import { Input } from "@deepnote-clone/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@deepnote-clone/ui/input-otp";
import { useToast } from "@deepnote-clone/ui/use-toast";
import { Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signInAction } from "@/actions/sign-in-action";

async function checkEmailisBusiness(email: string) {
  const response = await fetch(`/api/auth/validate?email=${email}`);
  const data = await response.json();
  return data.exists;
}

const formSchema = z.object({
  email: z.string().email(),
});

type Props = {
  className?: string;
  inviteCode?: string;
  email?: string;
};

export function OTPSignIn({
  className,
  email: defaultEmail,
}: Props) {

  const signIn = useAction(signInAction);

  const [isLoading, setLoading] = useState(false);
  const [isSent, setSent] = useState(false);
  const [email, setEmail] = useState<string | null>(defaultEmail);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit({ email }: z.infer<typeof formSchema>) {
    setLoading(true);
    setEmail(email);
   
    signIn.execute({ email })
    setSent(true);
    setLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className={cn("flex flex-col space-y-4", className)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Enter email address"
                    {...field}
                    autoCapitalize="false"
                    autoCorrect="false"
                    spellCheck="false"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          

          <Button
            type="submit"
            className="active:scale-[0.98] bg-primary px-6 py-4 text-secondary font-medium flex space-x-2 h-[40px] w-full"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <span>Continue</span>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
