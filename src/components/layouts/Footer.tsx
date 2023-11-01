import { menu } from "@/config/menu";
import Logo from "../Logo";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-neutral-200 text-center dark:bg-neutral-700 lg:text-left">
      <div className="p-4 text-center text-neutral-700 dark:text-neutral-200">
        © 2023 jobayeer.me copyright: &nbsp;
        <a className="text-neutral-800 dark:text-neutral-400" href="#">
          Next Boilerplate
        </a>
      </div>
    </footer>
  );
}
