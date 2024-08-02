import Image from "next/image";

export async function WIP () {
  return (
    <main className="flex flex-col justify-between min-h-full">
      <header className="font-pixel font-bold text-3xl text-center p-6">
        <h1>We are under construction!</h1>
      </header>

      <footer className="flex justify-between items-end p-6">
        <a
          href="https://twitter.com/QSMPGlobal"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/qsmp-logo.png"
            alt="QSMP Logo"
            width={150}
            height={179}
            className="object-contain"
          />
        </a>
        <a
          href="https://twitter.com/QuackityStudios"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/studios-logo.png"
            alt="Quackity Studio Logo"
            width={150}
            height={179}
            className="invert object-contain mb-4"
          />
        </a>
      </footer>
    </main>
  );
}
