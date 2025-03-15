import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-[url('https://eproshop.vn/img/error/error.png')] bg-cover bg-center text-center h-screen w-screen flex items-center justify-center flex-col gap-y-4">
      <h2 className="text-9xl font-bold">404</h2>
      <p className="text-white font-bold">PAGE NOT FOUND</p>
      <button className="bg-purple-600 text-white py-2 px-8 rounded-lg hover:bg-purple-700">
        <Link href="/">Go to home</Link>
      </button>
    </div>
  );
}
