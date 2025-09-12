"use client";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";

export default function DeleteInquiryButton({
  inquiryId,
  name = "Delete",
  deleteBoth = false,
}: {
  inquiryId: string;
  name?: string;
  deleteBoth?: boolean;
}) {
  const supabase = createClient();
  const router = useRouter();
  const deleteInquiry = async () => {
    const { error } = await supabase
      .from("Inquries")
      .delete()
      .eq("id", Number(inquiryId))
      .select();
    if (error) {
      console.log(error);
    } else {
      router.push("/");
    }
  };
  const deleteBothInquiryResponse = async () => {
    const { error } = await supabase.rpc("delete_inquiry_with_responses", {
      inquiry_id: Number(inquiryId),
    });

    if (error) {
      console.log("Delete error:", error);
    } else {
      router.push("/");
    }
  };
  return (
    <Button
      variant="destructive"
      size="lg"
      className="w-1/4"
      onClick={deleteBoth ? deleteBothInquiryResponse : deleteInquiry}
    >
      {name}
    </Button>
  );
}
