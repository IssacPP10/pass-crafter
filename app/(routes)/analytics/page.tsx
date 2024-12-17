import { getServerSession } from "next-auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import { countPasswords } from "@/lib/countPasswords";
import { RepeatedPasswordsChart } from "./components/RepeatedPasswordsChart";
import { ViewsAnalyticsChart } from "./components/ViewsAnalyticsChart";

export default async function AnalyticsPage() {
  const session = await getServerSession();

  if (!session || !session.user?.email) {
    return redirect("/");
  }

  const user = await db.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      elements: {
        orderBy: {
          createdAt: "desc"
        },
      },
    },
  });

  if (!user || !user.elements) {
    return redirect("/");
  }

  const { unique, repeated } = countPasswords(user.elements);

  return (
    <div>
      <div className="">
        <h1 className="text-xl md:text-3xl font-semibold">Page Analytics</h1>
        <p className="my-3">In this section, you can view metrics and information about your passwords. You will see the total number of unique and repeated passwords.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-5 mb-4">
        <RepeatedPasswordsChart repeated={repeated} unique={unique} />
        <ViewsAnalyticsChart repeated={repeated} unique={unique} />
      </div>
      {/* <div>Block</div> */}
    </div>
  )
}
