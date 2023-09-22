import Title from "./Title";

export default function ProdukLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4 h-full w-full">
      <Title />
      {children}
    </section>
  );
}
