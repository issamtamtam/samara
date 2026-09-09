"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SignInContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6 pb-4">
            <h3 className="text-2xl font-semibold tracking-tight">تسجيل الدخول</h3>
            <p className="text-sm text-muted-foreground">
              أدخل بريدك الإلكتروني وكلمة المرور للبدء
            </p>
          </div>
          <div className="p-4 pb-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                signIn("credentials", {
                  email: formData.get("email"),
                  password: formData.get("password"),
                  callbackUrl,
                });
              }}
            >
              <div className="space-y-2">
                <input
                  name="email"
                  type="email"
                  placeholder="البريد الإلكتروني"
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  required
                />
                <input
                  name="password"
                  type="password"
                  placeholder="كلمة المرور"
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  required
                />
                <button
                  type="submit"
                  className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  تسجيل الدخول
                </button>
              </div>
            </form>
            <div className="mt-4 flex items-center justify-between text-xs">
              <a
                href={callbackUrl}
                className="text-muted-foreground underline hover:text-foreground"
              >
                العودة للصفحة الرئيسية
              </a>
              <button
                onClick={() => signIn("guest", { callbackUrl })}
                className="text-primary underline hover:text-primary/90"
              >
                دخول كزائر
              </button>
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-4">
          DEMO: استخدم أي بريد إلكتروني وكلمة مرور
        </p>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense>
      <SignInContent />
    </Suspense>
  );
}
