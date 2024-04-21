import React from 'react';

interface NavbarProps {
  username?: string;  // Optional username prop
}

const Navbar: React.FC<NavbarProps> = ({ username }) => {
  return (
    <nav>
      <h1>Wiz Checklist App: React, Ruby on Rails, MongoDB, Terraform, GCP</h1>
      {username && <p>Checked in as: {username}</p>}
    </nav>
  );
};

export default Navbar;
