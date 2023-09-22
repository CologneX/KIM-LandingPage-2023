export default function TentangKamiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4 h-full w-full">
      <h1 className="text-4xl font-bold">Tentang Kami</h1>
      {children}
    </section>
  );
}
