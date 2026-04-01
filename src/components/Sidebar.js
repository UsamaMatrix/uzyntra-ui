"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const links = [
  { href: "/", label: "Dashboard" },
  { href: "/events", label: "Events" },
  { href: "/mitigations", label: "Mitigations" },
  { href: "/reputation", label: "Reputation" },
  { href: "/audits", label: "Audits" },
  { href: "/policy", label: "Policy" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger button (mobile) */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white p-2 rounded bg-gray-800/70"
        >
          {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-72 shrink-0 flex-col border-r border-white/10 bg-[#06101c] text-white
          transform transition-transform duration-300 ease-in-out z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:flex
        `}
      >
        <div className="border-b border-white/10 px-6 py-6">
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
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4">
          <ul className="space-y-2">
            {links.map((link) => {
              const active = pathname === link.href;

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block rounded-2xl px-4 py-3 text-sm font-medium transition ${
                      active
                        ? "bg-emerald-400/12 text-emerald-300 ring-1 ring-emerald-400/25"
                        : "text-slate-200 hover:bg-white/5 hover:text-white"
                    }`}
                    onClick={() => setIsOpen(false)} // close sidebar on link click
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

      {/* Overlay when sidebar is open (mobile) */}
      {isOpen && (
        <div
          className="inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}