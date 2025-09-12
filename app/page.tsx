import { createClient } from "@/lib/supabase/server";
import ITable from "@/components/ITable";
export default async function Inquries() {
  const supabase = await createClient();
  const { data: inqueries } = await supabase.from("Inquries").select();
  const { data: responses } = await supabase.from("Responses").select();
  return (
    <div className="max-w-7xl mx-auto flex flex-col items-center pt-5 p-4">
      <h1 className="text-3xl">Inquiries</h1>
      <ITable responses={responses || []} inqueries={inqueries || []} />
    </div>
  );
}
