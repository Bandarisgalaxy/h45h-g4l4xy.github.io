import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="border border-[#00ff4133] rounded-lg p-10 bg-[#111] max-w-md">
        <div className="text-[#00ff41] font-mono text-6xl font-bold mb-4">
          404
        </div>
        <div className="text-[#4a7c4a] text-sm font-mono mb-6 space-y-1">
          <p>&gt; Page not found</p>
          <p>&gt; Target host unreachable</p>
          <p className="text-[#00ff41]">
            &gt; Redirecting to base...
            <span className="animate-[blink_1s_step-end_infinite]">█</span>
          </p>
        </div>
        <Link
          href="/"
          className="inline-block px-6 py-2.5 bg-[#00ff41] text-black font-bold rounded-lg hover:bg-[#00cc33] transition-colors text-sm"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
