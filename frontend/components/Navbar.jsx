import React from 'react';
import ModeToogle from './ModeToogle';
import { Button } from './ui/button';
import Link from 'next/link';

const Navbar = () => {
  const isAuthenticated = false; // Replace with actual authentication logic
  const user = null; // Replace with actual user data if authenticated
  return (
    <div className="flex flex-row justify-between p-7">
      <span>Personal Finances</span>
      <div className="flex flex-row gap-4">
        <ModeToogle />
        {isAuthenticated ? (
          <div className="flex flex-row gap-4">
            <span>{user.name}</span>
            <Button variant="outline">Logout</Button>
          </div>
        ) : (
          <div className="flex flex-row gap-4">
            <Link href="/login">
              <Button variant="outline" className="cursor-pointer">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="cursor-pointer">Register</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
