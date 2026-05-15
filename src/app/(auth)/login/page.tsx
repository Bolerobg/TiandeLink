import Link from "next/link";
import { loginUser } from "@/app/(auth)/actions";

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error } = await searchParams;

  return (
    <main className="auth-shell">
      <section className="auth-panel">
        <Link className="brand" href="/">
          <span className="brand-mark">S</span>
          <span>SaasLink</span>
        </Link>
        <div>
          <p className="eyebrow">Вход</p>
          <h1>Влез в dashboard-а.</h1>
          <p className="lede">Управлявай профила, линковете и аналитиката си от едно място.</p>
        </div>
        {error === "invalid" ? <p className="form-error">Невалиден email или парола.</p> : null}
        <form className="form-grid" action={loginUser}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required />
          </div>
          <div className="field">
            <label htmlFor="password">Парола</label>
            <input id="password" name="password" type="password" required />
          </div>
          <button className="button primary" type="submit">
            Вход
          </button>
        </form>
        <p className="auth-switch">
          Нямаш акаунт? <Link href="/register">Създай акаунт</Link>
        </p>
      </section>
    </main>
  );
}
