'use client';

export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="mb-3 font-bold">{children}</header>
    </>
  );
}
