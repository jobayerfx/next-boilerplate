import { menu } from "@/config/menu";
import Logo from "../Logo";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 bg-theme-light py-6">
      <div className="container text-center">
        <div className="row items-center">
          <div className="lg:col-4">
            <Logo />
          </div>
          <div className="mt-8 lg:col-4 lg:mt-0">
            {/* footer menu */}
            <ul className="space-x-4">
              {menu.footer.map((menu) => (
                <li className="inline-block">
                  <Link
                    href={menu.url}
                    className="text-[#343a40] hover:underline lg:p-4"
                  >
                    {menu.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* social icons */}
        {/* copyright */}
        <p className="footer-copyright-text mt-10">copy © 2023 jobayeer.me</p>
      </div>
    </footer>
  );
}
