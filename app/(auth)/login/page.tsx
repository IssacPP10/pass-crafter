import React from "react";
import { ImageAuth } from "./components/ImageAuth";
import { TabsForms } from './components/TabsForms/TabsForms';
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerSession();
  // Check if there is a session currently active.
  if (session) {
    redirect("/");
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-full max-h-screen overflow-hidden">
      <div className="flex justify-center h-full">
        <div className="text-white flex flex-col items-center justify-center p-6">
          <h1 className="text-blue-500 text-2xl text-center mb-5">
            PasswordManager
          </h1>
          <h2 className="text-4xl font-medium text-black">Welcome back</h2>
          <p className="text-center mt-4 mb-6 text-slate-400 text-sm">
            Welcome back, Please enter your details
          </p>
          <TabsForms />
        </div>
      </div>
      <ImageAuth />
    </div>
  );
}
