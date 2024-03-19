import React from "react";

// Footer Component
export function Footer() {
  return (
    <footer className="flex justify-center items-center py-5 bg-black text-white" style={{ height: '8%' }}>
      <p className="text-center text-xl">
        © {new Date().getFullYear()} Virtual Marketplace. All rights reserved.
      </p>
    </footer>
  );
}
