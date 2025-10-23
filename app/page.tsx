import Link from "next/link";

export default async function Home() {
  return (
    <div>
      <Link href={"/dashboard?id=1"}>Dashboard</Link>
    </div>
  );
}
