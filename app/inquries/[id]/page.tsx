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
import RespondDiv from "@/components/RespondDiv";
import dayjs from "dayjs";
import Link from "next/link";
import DeleteInquiryButton from "@/components/DeleteInquiryButton";

export default async function InquiryDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  let hasResponse = true;
  const { data: inquiry } = await supabase
    .from("Inquries")
    .select("*")
    .eq("id", parseInt(id))
    .single();
  const { data: responseData } = await supabase
    .from("Responses")
    .select("*")
    .eq("InquiryID", parseInt(id));
  const response = responseData || [];
  console.log(response);
  if (!inquiry) {
    notFound();
  }
  if (response.length === 0) {
    hasResponse = false;
  }
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Inquries
        </Link>
        <h1 className="text-3xl font-bold text-gray-200 mb-2">
          Inquiry Details
        </h1>
        {hasResponse ? (
          <p className="text-green-600">
            Response Submitted:{" "}
            {dayjs(response[0].created_at).format("MMM D, YYYY h:mm A")}
          </p>
        ) : (
          <p className="text-gray-600">
            Review and respond to customer {inquiry.First_Name}{" "}
            {inquiry.Last_Name}
          </p>
        )}
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Contact Information</CardTitle>
              <Badge variant="secondary" className="text-sm">
                ID: {inquiry.id}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <User className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium">
                    {inquiry.First_Name} {inquiry.Last_Name}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{inquiry.email}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CalendarDays className="w-5 h-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Submitted</p>
                <p className="font-medium">
                  {dayjs(inquiry.created_at).format("MMM D, YYYY h:mm a")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-gray-700" />
              <CardTitle className="text-xl">Message</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {inquiry.message ? (
              <div className="bg-blue-950/40 rounded-lg p-4">
                <p className="text-white whitespace-pre-wrap leading-relaxed">
                  {inquiry.message}
                </p>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-500 italic">No message provided</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            {!hasResponse ? (
              <CardTitle className="text-xl">Actions</CardTitle>
            ) : (
              <CardTitle className="text-xl">Response Message:</CardTitle>
            )}
          </CardHeader>
          <CardContent>
            <RespondDiv response={response} inquiryId={id} />
          </CardContent>
        </Card>
        {hasResponse && (
          <DeleteInquiryButton
            deleteBoth={true}
            name="Delete Inquiry"
            inquiryId={id}
          />
        )}
      </div>
    </div>
  );
}
