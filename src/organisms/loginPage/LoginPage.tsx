import Link from "next/link";
import Button from "~/atoms/button/Button";

const LoginPage = () => {
  return (
    <main className="h-screen w-screen">
      <div className="flex h-full w-full items-center justify-center rounded-t-xl bg-[#f9f1f1] px-3 text-white">
        <div
          className="flex h-32 w-full flex-col items-center justify-center gap-3 rounded-md px-3 py-2 sm:mt-0 sm:w-1/3"
          style={{
            background: "linear-gradient(to top, #9890e3 0%, #b1f4cf 100%)",
          }}
        >
          <Button>
            <Link href="/api/auth/login">Login</Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
