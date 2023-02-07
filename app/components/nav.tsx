import { Link, NavLink } from '@remix-run/react';
import { useState, Fragment } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid';
import { Dialog, Transition } from '@headlessui/react';

const navigation = [
  { id: 1, name: 'Home', to: '/' },
  { id: 2, name: 'Freebies', to: '/freebies' },
  { id: 3, name: 'Plugins', to: '/plugins' },
];

export default function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header>
      {/* Mobile Menu */}
      <Transition.Root show={mobileMenuOpen} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-40 lg:hidden'
          onClose={setMobileMenuOpen}>
          <Transition.Child
            as={Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 z-40 flex'>
            <Transition.Child
              as={Fragment}
              enter='transition ease-in-out duration-300 transform'
              enterFrom='-translate-x-full'
              enterTo='translate-x-0'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='translate-x-0'
              leaveTo='-translate-x-full'>
              <Dialog.Panel className='relative flex w-full max-w-xs flex-col overflow-y-auto bg-black pb-12 shadow-xl '>
                <div className='flex px-4 pt-5 pb-2'>
                  <button
                    type='button'
                    className='-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400'
                    onClick={() => setMobileMenuOpen(false)}>
                    <span className='sr-only'>Close menu</span>
                    <XMarkIcon className='h-6 w-6 ' aria-hidden='true' />
                  </button>
                </div>
                <nav className='mt-2 space-y-6  py-6 px-4'>
                  {navigation.map((link) => (
                    <div key={link.id} className='flow-root'>
                      <NavLink
                        className={({ isActive }) =>
                          isActive
                            ? 'rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text px-4 py-2 font-medium text-transparent'
                            : 'px-4 py-2 font-medium text-gray-100 '
                        }
                        to={link.to}>
                        {link.name}
                      </NavLink>
                    </div>
                  ))}
                </nav>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop Menu */}
      <nav className='flex items-center justify-between bg-black py-6 px-4 shadow-md shadow-zinc-100'>
        <Link
          className='text-2xl font-bold tracking-tighter text-gray-100 md:ml-4'
          to='/'>
          OSC
        </Link>
        <ul className='flex space-x-5  md:mr-10'>
          {navigation.map((link) => {
            return (
              <li key={link.id} className='hidden lg:block'>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? 'rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text px-4 py-2 font-medium text-transparent '
                      : 'px-4 py-2 font-medium text-gray-100 '
                  }
                  to={link.to}>
                  {link.name}
                </NavLink>
              </li>
            );
          })}
          <div className='flex flex-1 items-center lg:hidden'>
            <button
              type='button'
              className='-ml-2 p-2 text-white'
              onClick={() => setMobileMenuOpen(true)}>
              <span className='sr-only'>Open menu</span>
              <Bars3Icon className='h-6 w-6 text-gray-100' aria-hidden='true' />
            </button>
          </div>
        </ul>
      </nav>
    </header>
  );
}
