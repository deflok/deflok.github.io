import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-8xl font-bold mb-4">404</h1>
      <p className="text-lg mb-8 text-center">
        К сожалению, мы не можем найти запрашиваемую страницу.
      </p>
      <Link href="/" className="btn">
        Вернуться на главную
      </Link>
    </div>
  );
}