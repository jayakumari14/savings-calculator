"use client";

import Link from "next/link";
import styles from "../components/InterestCalculator/styles.module.css";

const Navbar = () => {
  return (
    <header className={`${styles.navbar} text-white shadow-md`}>
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo Section */}
        <div className="text-xl font-bold">
          <Link href="/" className="hover:text-blue-400">
            Interest Calculator
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-6">
          <Link href="/savings" className="hover:text-blue-400">
            Savings Calculator
          </Link>
          <Link href="/compound" className="hover:text-blue-400">
            Compound Calculator
          </Link>
        </nav>

        {/* Logout Button */}
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-all"
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/auth/login";
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
