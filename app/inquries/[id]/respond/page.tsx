import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  CalendarDays,
  Mail,
  User,
  MessageSquare,
  ArrowLeft,
} from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";
import dayjs from "dayjs";
import ResponseForm from "@/components/ResponseForm";

export default async function RespondToInquiryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: inquiry, error } = await supabase
    .from("Inquries")
    .select("*")
    .eq("id", parseInt(id))
    .single();

  if (error || !inquiry) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-6">
        <Link
          href={`/inquries/${id}`}
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Inquiry Details
        </Link>
        <h1 className="text-3xl font-bold text-gray-200 mb-2">
          Respond to Inquiry
        </h1>
        <p className="text-gray-600">
          Compose and send a response to {inquiry.First_Name}{" "}
          {inquiry.Last_Name}
        </p>
      </div>

      <div className="grid gap-6">
        {/* Inquiry Summary */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Inquiry Summary</CardTitle>
              <Badge variant="secondary" className="text-sm">
                ID: {inquiry.id}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-3 gap-3">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">From</p>
                  <p className="font-medium">
                    {inquiry.First_Name} {inquiry.Last_Name}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 ">
                <Mail className="w-5 h-5 text-gray-500" />
                <div className="">
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{inquiry.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CalendarDays className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Submitted</p>
                  <p className="font-medium">
                    {dayjs(inquiry.created_at).format("MMM D, YYYY h:mma")}
                  </p>
                </div>
              </div>
            </div>
            {inquiry.message && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-4 h-4 text-blue-400" />
                  <p className="text-lg text-blue-400 font-medium">
                    Original Message
                  </p>
                </div>
                <div className="bg-blue-950/40  rounded-lg p-4 ">
                  <p className="text-white whitespace-pre-wrap leading-relaxed">
                    {inquiry.message}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Response Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Your Response</CardTitle>
            <p className="text-sm text-gray-600">
              This response will be sent to {inquiry.email}
            </p>
          </CardHeader>
          <CardContent>
            <ResponseForm inquiry={inquiry} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
