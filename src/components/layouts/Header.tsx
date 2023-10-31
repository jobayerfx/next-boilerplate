"use client";
import Logo from "../Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menu } from "../../config/menu";
// export interface ChildNavigationLink {
//   name: string;
//   url: string;
// }
// export interface NavigationLink {
//   name: string;
//   url: string;
//   hasChildren?: boolean;
//   children?: ChildNavigationLink[];
// }

const main = menu.main;
// const currentPath = usePathname();
console.log(main);
const currentPath = "/";
function Header() {
  return (
    <header className="fixed">
      <nav className="navbar container">
        {/* <!-- logo --> */}
        <div className="order-0">
          <Logo />
        </div>
        {/* <!-- navbar toggler --> */}
        <input id="nav-toggle" type="checkbox" className="hidden" />
        <label
          id="show-button"
          for="nav-toggle"
          className="order-2 flex cursor-pointer items-center md:order-1 md:hidden"
        >
          <svg className="h-6 fill-current" viewBox="0 0 20 20">
            <title>Menu Open</title>
            <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z"></path>
          </svg>
        </label>
        <label
          id="hide-button"
          for="nav-toggle"
          className="order-2 hidden cursor-pointer items-center md:order-1"
        >
          <svg className="h-6 fill-current" viewBox="0 0 20 20">
            <title>Menu Close</title>
            <polygon
              points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
              transform="rotate(45 10 10)"
            ></polygon>
          </svg>
        </label>
        {/* <!-- /navbar toggler --> */}

        <ul
          id="nav-menu"
          className="navbar-nav order-3 hidden w-full items-center md:order-1 md:flex md:w-auto md:space-x-2"
        >
          {main.map((menu) => (
            <>
              {menu.hasChildren ? (
                <li className="nav-item nav-dropdown group relative">
                  <span className="nav-link inline-flex items-center">
                    {menu.name}
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </span>
                  <ul className="nav-dropdown-list hidden group-hover:block md:invisible md:absolute md:block md:opacity-0 md:group-hover:visible md:group-hover:opacity-100">
                    {menu.children?.map((child) => (
                      <li className="nav-dropdown-item">
                        <Link
                          href={child.url}
                          className={`nav-dropdown-link block ${
                            currentPath === child.url && "active"
                          }`}
                        >
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li className="nav-item">
                  <Link
                    href={menu.url}
                    className={`nav-link block ${
                      currentPath === menu.url && "active"
                    }`}
                  >
                    {menu.name}
                  </Link>
                </li>
              )}
            </>
          ))}
          <li className="nav-item">
            <Link
              className="inline-block cursor-pointer p-2 text-xl text-dark hover:text-primary md:block"
              href="/search"
            >
              <i className=""></i>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Header;
