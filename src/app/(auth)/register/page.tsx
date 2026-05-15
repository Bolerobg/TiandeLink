import Link from "next/link";
import { registerUser } from "@/app/(auth)/actions";

type RegisterPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const { error } = await searchParams;

  return (
    <main className="auth-shell">
      <section className="auth-panel">
        <Link className="brand" href="/">
          <span className="brand-mark">S</span>
          <span>SaasLink</span>
        </Link>
        <div>
          <p className="eyebrow">Нов акаунт</p>
          <h1>Създай своя link-in-bio профил.</h1>
          <p className="lede">Избери username, който ще стане публичният ти адрес.</p>
        </div>
        {error === "exists" ? <p className="form-error">Email или username вече съществува.</p> : null}
        <form className="form-grid" action={registerUser}>
          <div className="field">
            <label htmlFor="name">Име</label>
            <input id="name" name="name" required />
          </div>
          <div className="field">
            <label htmlFor="username">Username</label>
            <input id="username" name="username" pattern="[a-z0-9-]{3,32}" placeholder="my-brand" required />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required />
          </div>
          <div className="field">
            <label htmlFor="password">Парола</label>
            <input id="password" name="password" type="password" minLength={8} required />
          </div>
          <button className="button primary" type="submit">
            Създай акаунт
          </button>
        </form>
        <p className="auth-switch">
          Имаш акаунт? <Link href="/login">Влез</Link>
        </p>
      </section>
    </main>
  );
}
