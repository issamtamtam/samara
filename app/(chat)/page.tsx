export default function Page() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-[var(--color-background)]">
      <main className="flex flex-1 flex-col md:flex-row md:pl-[250px] lg:pl-[300px]">
        <div className="flex flex-1 flex-col">
          <div className="grid flex-1 items-center gap-4 px-4 py-12 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex items-center gap-3 text-4xl font-bold text-[var(--color-primary)]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span>ChatBot AI</span>
              </div>
              <p className="text-base text-[var(--color-muted-foreground)]">
                مخصص لفريق الدعم الفني
              </p>
              <div className="mt-4 flex items-center justify-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-[var(--color-muted-foreground)]">
                  جاهز للاستخدام
                </span>
              </div>
            </div>

            {/* Feature cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-muted)] p-4">
                <div className="text-lg font-semibold">🤖 ذكاء اصطناعي متقدم</div>
                <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                  مدعوم بـ OpenRouter بأفضل النماذج اللغوية
                </p>
              </div>
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-muted)] p-4">
                <div className="text-lg font-semibold">📚 قاعدة معرفة</div>
                <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                  نظام RAG يجيب بناءً على وثائق شركتك
                </p>
              </div>
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-muted)] p-4">
                <div className="text-lg font-semibold">🔧 لوحة تحكم</div>
                <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                  واجهة إدارية لإدارة الملفات والمستخدمين
                </p>
              </div>
            </div>

            {/* Info box */}
            <div className="mt-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-muted)]/50 p-4">
              <h3 className="text-lg font-medium">🚀 كيفية الاستخدام</h3>
              <ul className="mt-2 space-y-1 text-sm text-[var(--color-muted-foreground)]">
                <li>1. ابدأ دردشة جديدة من الشريط الجانبي</li>
                <li>2. اطرح任何 سؤال عن شركتك أو منتجاتك</li>
                <li>3. البوت سيجيب بناءً على قاعدة المعرفة</li>
                <li>4. استخدم لوحة الإدارة لإضافة معلومات جديدة</li>
              </ul>
            </div>

            {/* Demo notice */}
            <div className="mt-4 rounded-lg border border-green-500/30 bg-green-500/10 p-4">
              <p className="text-sm text-green-600">
                ℹ️ هذا الوضع DEMO - لا حاجة لتسجيل دخول
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
