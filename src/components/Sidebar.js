"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/events", label: "Events" },
  { href: "/mitigations", label: "Mitigations" },
  { href: "/reputation", label: "Reputation" },
  { href: "/audits", label: "Audits" },
  { href: "/policy", label: "Policy" },
];

export default function Sidebar({ open = false, onClose = () => {} }) {
  const pathname = usePathname();
  const isOpen = Boolean(open);

  return (
    <>
      <button
        type="button"
        aria-label="Close sidebar"
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-slate-950/50 transition-opacity md:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 shrink-0 flex-col border-r border-white/10 bg-[#06101c] text-white transition-transform duration-200 md:static md:z-auto md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="border-b border-white/10 px-5 py-5 sm:px-6 sm:py-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="brand-glow overflow-hidden rounded-2xl bg-white/5 p-1">
                <Image
                  src="/uzyntra-logo-mark.png"
                  alt="UZYNTRA"
                  width={52}
                  height={52}
                  className="rounded-xl object-cover"
                />
              </div>

              <div>
                <h1 className="text-xl font-semibold tracking-[0.18em] text-white">
                  UZYNTRA
                </h1>
                <p className="mt-1 text-xs text-cyan-100/70">
                  Threat Control Console
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/80 transition hover:bg-white/10 md:hidden"
            >
              Close
            </button>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4">
          <ul className="space-y-2">
            {links.map((link) => {
              const active = pathname === link.href;

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={`block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                      active
                        ? "bg-emerald-400/12 text-emerald-300 ring-1 ring-emerald-400/25"
                        : "text-slate-200 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="border-t border-white/10 px-4 py-4">
          <div className="rounded-2xl bg-white/5 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.18em] text-cyan-100/60">
              UZYNTRA
            </p>
            <p className="mt-1 text-xs text-slate-300/70">
              Operator Console v1
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
