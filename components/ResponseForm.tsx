"use client";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { SuccessMessage } from "./SuccessMessage";
interface Inquiry {
  id: number;
  First_Name: string;
  Last_Name: string;
  email: string;
  message: string | null;
  created_at: string;
}

interface ResponseFormProps {
  inquiry: Inquiry;
}

export default function ResponseForm({ inquiry }: ResponseFormProps) {
  const [rSuccess, setRSuccess] = useState(false);
  const formSchema = z.object({
    subject: z.string().min(1, { message: "Can't be empty" }),
    response: z.string().min(1, { message: "Response message is required" }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: `[Re]: Your Inquiry`,
      response: `Hello ${inquiry.First_Name} ${inquiry.Last_Name}, \n\n `,
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const supabase = createClient();

    const { error } = await supabase.from("Responses").insert({
      InquiryID: inquiry.id,
      Message: data.response,
      subject: data.subject,
    });

    if (error) {
      console.error("Error inserting response:", error);
      alert("Failed to send response. Please try again.");
    } else {
      setRSuccess(true);
      // You might want to redirect or reset the form here
    }
  };

  return (
    <Form {...form}>
      {rSuccess && <SuccessMessage className="mb-4" />}
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          disabled={rSuccess}
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel className="text-sm font-medium text-gray-700">
                Subject Line
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="[Re]: Your Inquiry"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          disabled={rSuccess}
          control={form.control}
          name="response"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                Response Message
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Enter your response message"
                  className="min-h-[300px] resize-none"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          {!rSuccess ? (
            <>
              <Button type="submit" size="lg" className="w-1/2">
                Send Response
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="lg"
                className="w-1/2"
                asChild
              >
                <Link href={`/inquries/${inquiry.id}`}>Cancel</Link>
              </Button>
            </>
          ) : (
            <>
              <Button type={"button"} size="lg" asChild className="w-1/2">
                <Link href={"/"}> Back to Inquries</Link>
              </Button>
            </>
          )}
        </div>
      </form>
    </Form>
  );
}
