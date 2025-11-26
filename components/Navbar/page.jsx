'use client';

import { useState } from 'react'
import Link from 'next/link'
import { useShop } from '@/context/ShopContext'
import { assets } from '@/lib/assets'
import Image from 'next/image'

const Navbar = () => {
    const [visible, setVisible] = useState(false)
    const { setShowSearch, navigate, getCartCount ,user ,logout } = useShop();

    return (
        <div className='flex items-center justify-between py-5 font-medium' >
            <Link href='/'><img className='w-36' src={'/assets/images/logo.png'} alt="Forever Logo" /></Link>

            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                <Link href="/" className='flex flex-col items-center gap-1 hover:text-black'>
                    <p>HOME</p>
                </Link>
                <Link href='/collection' className='flex flex-col items-center gap-1 hover:text-black'>
                    <p>COLLECTION</p>
                </Link>
                <Link href='/about' className='flex flex-col items-center gap-1 hover:text-black'>
                    <p>ABOUT</p>
                </Link>
                <Link href='/contact' className='flex flex-col items-center gap-1 hover:text-black'>
                    <p>CONTACT</p>
                </Link>
            </ul>

            <div className='flex items-center gap-6'>
                <img onClick={() => { setShowSearch(true); navigate('/collection') }} className='w-5 cursor-pointer' src={'/assets/icons/search-icon.png'} alt="Search" />
                <div className='group relative'>
                    <img
                        onClick={() => {
                            if (!user) navigate('/login');
                        }}
                        className='w-5 cursor-pointer'
                        src={'/assets/icons/profile-icon.png'}
                        alt="Profile"
                    />

                    {/* Dropdown Menu */}
                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                        <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>

                            {!user ? (
                                <>
                                    <p onClick={() => navigate('/login')} className='cursor-pointer hover:text-black'>Login</p>
                                </>
                            ) : (
                                <>
                                    <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>

                                    <p
                                        onClick={logout}
                                        className='cursor-pointer hover:text-black'>
                                        Logout
                                    </p>
                                </>
                            )}

                        </div>
                    </div>
                </div>

                <Link href='/cart' className='relative'>
                    <img className='w-5 min-w-5' src={'/assets/icons/cart-icon.png'} alt="Cart" />
                    <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
                </Link>
                <img onClick={() => setVisible(true)} className='w-5 cursor-pointer sm:hidden' src={'/assets/icons/menu-icon.png'} alt="Menu" />
            </div>

            {/* Sidebar Menu For Small Screens */}
            <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`} >
                <div className='flex flex-col text-gray-600'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 '>
                        <img className='h-4 rotate-180' src={'/assets/icons/back-icon.png'} alt="" />
                        <p>Back</p>
                    </div>
                    <Link onClick={() => setVisible(false)} href="/" className='py-2 pl-6 border block'>HOME</Link>
                    <Link onClick={() => setVisible(false)} href='/collection' className='py-2 pl-6 border block'>COLLECTION</Link>
                    <Link onClick={() => setVisible(false)} href='/about' className='py-2 pl-6 border block'>ABOUT</Link>
                    <Link onClick={() => setVisible(false)} href='/contact' className='py-2 pl-6 border block'>CONTACT</Link>
                </div>
            </div>
        </div>
    )
}

export default Navbar
