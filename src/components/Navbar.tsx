import React from 'react';
import { Header, HeaderProps } from './Header';

export type NavbarProps = HeaderProps;

/**
 * Navbar component - re-exports the unified responsive Header component.
 */
export const Navbar: React.FC<NavbarProps> = (props) => {
  return <Header {...props} />;
};

export default Navbar;
