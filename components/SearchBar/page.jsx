'use client';

import { useEffect, useState } from 'react'
import { useShop } from '@/context/ShopContext'
import { assets } from '@/lib/assets';
import { usePathname } from 'next/navigation';

const SearchBar = () => {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const { search, setSearch, showSearch, setShowSearch } = useShop();

  useEffect(() => {
    if (pathname.includes('collection') && showSearch) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [pathname, showSearch])

  return showSearch && visible ? (
    <div className='border-t border-b bg-gray-50 text-center'>
      <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
        <input className='flex-1 outline-none bg-inherit text-sm' onChange={(e) => setSearch(e.target.value)} value={search} type="text" placeholder='Search' />
        <img className='w-4' src={'/assets/icons/search-icon.png'} alt="search" />
      </div>
      <img onClick={() => setShowSearch(false)} className='inline w-3 cursor-pointer' src={'/assets/icons/cross-icon.png'} alt="close" />
    </div>
  ) : null
}

export default SearchBar
