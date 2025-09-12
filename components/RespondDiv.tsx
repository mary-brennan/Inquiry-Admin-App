"use client";
import React from "react";
import { Button } from "./ui/button";
import DeleteInquiryButton from "./DeleteInquiryButton";
import Link from "next/link";
type response = {
  created_at: string;
  id: number;
  InquiryID: number;
  Message: string;
  subject: string;
};
type RespondDivProps = {
  inquiryId: string;
  response: response[];
};

export default function RespondDiv({ inquiryId, response }: RespondDivProps) {
  console.log(response);

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {response.length === 0 ? (
        <>
          {" "}
          <Button asChild size="lg" className="w-1/4">
            <Link href={`/inquries/${inquiryId}/respond`}>
              Respond to Inquiry
            </Link>
          </Button>
          <DeleteInquiryButton deleteBoth={true} inquiryId={inquiryId} />
        </>
      ) : (
        <div className="">{response[0].Message}</div>
      )}
    </div>
  );
}
