export const metadata = {
  title: "Auth | Social App",
};

export default function AuthLayout({ children }) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        {children}
      </div>
    </section>
  );
}
