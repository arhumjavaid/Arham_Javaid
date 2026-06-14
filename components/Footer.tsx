import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/lib/data";

export function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-6 py-10">
      <div className="surface flex flex-col items-center justify-between gap-4 rounded-2xl px-6 py-5 sm:flex-row">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {profile.name} · Full-Stack &amp; AI Engineer
        </p>
        <div className="flex items-center gap-1">
          {[
            { Icon: Github, href: profile.links.github, label: "GitHub" },
            { Icon: Linkedin, href: profile.links.linkedin, label: "LinkedIn" },
            { Icon: Mail, href: profile.links.email, label: "Email" },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="grid h-9 w-9 place-items-center rounded-lg text-muted transition-colors hover:bg-[var(--bg-soft)] hover:text-[var(--color-accent)]"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
