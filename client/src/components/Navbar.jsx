import { Disclosure } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import mainlogo from '../img/download.webp';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Disclosure as="nav" className="bg-[#000] shadow-md shadow-slate-700 max-w-[100%]">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                  <Link to="/" >
                    <img className="h-[60px] w-18" src={mainlogo} alt="Your Company" />
                    </Link>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      <ul className="flex">
                        <li className="mr-6">
                          <Link to="/" className="text-white hover:text-gray-300">
                            Home
                          </Link>
                        </li>
                        <li className="mr-6">
                          <Link to="/about" className="text-white hover:text-gray-300">
                          AboutMe
                          </Link>
                        </li>
                        <li className="mr-6">
                          <Link to="/privacy-policy" className="text-white hover:text-gray-300">
                          PrivacyPolicy
                          </Link>
                        </li>
                        <li className="mr-6">
                          <Link to="/contactus" className="text-white hover:text-gray-300">
                          Contact Us
                          </Link>
                        </li>
                        <li className="mr-6">
                          <Link to="/Whiteboard" className="text-white hover:text-gray-300">
                          Whiteboard
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <button
                      type="button"
                      className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    {/* Profile dropdown */}
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {isOpen ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
            {/* Mobile menu */}
            {isOpen && (
              <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  <Link
                    to="/about"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    About
                  </Link>
                  <Link
                    to="/"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Home
                  </Link>
                  <Link
                    to="/privacy-policy"
                    className="text-blue-500 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    to="/contactus"
                    className="text-blue-500 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Contact Us
                  </Link>
                  
                
               
                </div>
              </div>
            )}
          </>
        )}
      </Disclosure>
    </>
  );
};

export default Navbar;
