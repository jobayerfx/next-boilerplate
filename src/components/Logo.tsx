import Image from "next/image";
import Link from "next/link";
export default function Logo() {
  return (
    <Link href="/" className="navbar-brand inline-block">
      <Image
        src="/images/logo.svg"
        alt="Logo"
        className="dark:invert"
        width={100}
        height={24}
        priority
      />
    </Link>
  );
}
