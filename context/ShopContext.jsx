// 'use client';
// import { createContext, useContext, useState } from "react";
// import { useRouter } from "next/navigation";
// import { products } from "../lib/assets";
// import { toast } from "react-hot-toast";

// export const ShopContext = createContext();

// export function ShopContextProvider({ children }) {
//     const currency = '$';
//     const delivery_fee = 10;
//     const router = useRouter();
//     const [search, setSearch] = useState('');
//     const [showSearch, setShowSearch] = useState(false);
//     const [cartItems, setCartItems] = useState({});


//     const navigate = (path) => {
//         router.push(path);
//     };

//     const addToCart = (itemId, size) => {
//         if (!size) {
//             toast.error('Select product size');
//             return;
//         }

//         let cartData = structuredClone(cartItems);

//         if (cartData[itemId]) {
//             if (cartData[itemId][size]) {
//                 cartData[itemId][size] += 1;
//             }
//             else {
//                 cartData[itemId][size] = 1;
//             }
//         }
//         else {
//             cartData[itemId] = {};
//             cartData[itemId][size] = 1
//         }
//         setCartItems(cartData)
//     }

//     const updateQuantity = (itemId, size, quantity) => {
//         let cartData = structuredClone(cartItems);
//         cartData[itemId][size] = quantity;
//         setCartItems(cartData);
//     }

//     const getCartCount = () => {
//         let totalCount = 0;
//         for (const items in cartItems) {
//             for (const item in cartItems[items]) {
//                 try {
//                     if (cartItems[items][item] > 0) {
//                         totalCount += cartItems[items][item];
//                     }
//                 } catch (error) {
//                 }
//             }
//         }
//         return totalCount;
//     }

//     const getCartAmount = () => {
//         let totalAmount = 0;
//         for (const items in cartItems) {
//             let itemInfo = products.find((product) => product._id === items);
//             for (const item in cartItems[items]) {
//                 try {
//                     if (cartItems[items][item] > 0) {
//                         totalAmount += itemInfo.price * cartItems[items][item];
//                     }
//                 } catch (error) {
//                 }
//             }
//         }
//         return totalAmount;
//     }

//     const value = {
//         currency, delivery_fee,
//         products,
//         navigate,
//         search, setSearch,
//         showSearch, setShowSearch,
//         addToCart, updateQuantity,
//         cartItems,
//         getCartCount, getCartAmount
//     }

//     return (
//         <ShopContext.Provider value={value}>
//             {children}
//         </ShopContext.Provider>
//     )
// }

// export function useShop() {
//     const context = useContext(ShopContext);
//     if (!context) {
//         throw new Error('useShop must be used within ShopContextProvider');
//     }
//     return context;
// }


'use client';
import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { products } from "../lib/assets";
import { toast } from "react-hot-toast";

export const ShopContext = createContext();

export function ShopContextProvider({ children }) {
    const currency = '$';
    const delivery_fee = 10;
    const router = useRouter();

    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});

    // 🟦 NEW — user and token state
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const navigate = (path) => {
        router.push(path);
    };

    // 🟦 NEW — logout function
    const logout = () => {
        setUser(null);
        setToken(null);
        navigate('/');
        toast.success("Logged out successfully");
    };

    // ---------------- CART FUNCTIONS ----------------

    const addToCart = (itemId, size) => {
        if (!size) {
            toast.error('Select product size');
            return;
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData);
    };

    const updateQuantity = (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) { }
            }
        }
        return totalCount;
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) { }
            }
        }
        return totalAmount;
    };

    // ---------------- CONTEXT VALUE ----------------
    const value = {
        currency, delivery_fee,
        navigate,
        products,

        search, setSearch,
        showSearch, setShowSearch,

        cartItems,
        addToCart, updateQuantity,
        getCartCount, getCartAmount,

        // 🟦 ADD user + token + logout
        user, setUser,
        token, setToken,
        logout,
    };

    return (
        <ShopContext.Provider value={value}>
            {children}
        </ShopContext.Provider>
    );
}

export function useShop() {
    const context = useContext(ShopContext);
    if (!context) {
        throw new Error('useShop must be used within ShopContextProvider');
    }
    return context;
}
