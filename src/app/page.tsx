import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <div className="space-x-3 p-3 flex">
        <Link href={"/auth/login"}>Login</Link>
        <Link href={"/auth/register"}>Register</Link>
      </div>
    </main>
  );
}
