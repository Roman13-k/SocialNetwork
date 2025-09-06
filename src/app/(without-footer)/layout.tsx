import "../globals.css";
import Header from "@/components/ui/layout/header/Header";

export default function LayoutWithoutFooter({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex relative w-full'>
      <Header />
      <main className='w-full'>{children}</main>
    </div>
  );
}
