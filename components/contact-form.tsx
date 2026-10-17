"use client";

import { useState, type FormEvent } from "react";
import { SITE } from "@/lib/site";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [opened, setOpened] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();
    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setOpened(false);
      setError("Add your name, email, and a message.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setOpened(false);
      setError("Enter an email address so KeepRatio can reply.");
      return;
    }
    const subject = `KeepRatio: message from ${trimmedName}`;
    const body = `${trimmedMessage}\n\nFrom: ${trimmedName} <${trimmedEmail}>\nSite: ${SITE.canonical}`;
    const href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setError(null);
    setOpened(true);
    window.location.href = href;
  }

  return (
    <form onSubmit={submit} className="mt-8 grid gap-4" noValidate>
      <label className="grid gap-2 text-sm" htmlFor="contact-name">
        Name
        <input
          id="contact-name"
          name="name"
          className="field text-base"
          autoComplete="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </label>
      <label className="grid gap-2 text-sm" htmlFor="contact-email">
        Email
        <input
          id="contact-email"
          name="email"
          type="email"
          className="field text-base"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </label>
      <label className="grid gap-2 text-sm" htmlFor="contact-message">
        Message
        <textarea
          id="contact-message"
          name="message"
          className="field min-h-36 text-base"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
        />
      </label>
      <button type="submit" className="copy-btn w-fit px-4 py-3 text-xs">
        Open email app
      </button>
      {error ? (
        <p className="text-sm text-signal" role="alert">
          {error}
        </p>
      ) : null}
      {opened ? (
        <p className="text-sm text-muted" role="status">
          Your email app should open with a message to {SITE.email}. If it does
          not, send the note yourself.
        </p>
      ) : null}
    </form>
  );
}
