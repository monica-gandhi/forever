// 'use client';
// import { useState } from 'react'

// export default function Login() {
//     const [currentState, setCurrentState] = useState('Login');

//     const onSubmitHandler = (e) => {
//         e.preventDefault();
//     }

//     return (
//         <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
//             <div className='inline-flex items-center gap-2 mb-2 mt-10'>
//                 <p className='text-3xl font-serif'>{currentState}</p>
//                 <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
//             </div>
//             {currentState === 'Login' ? null : <input className='w-full px-3 py-2 border border-gray-800' type="text" placeholder='Name' required />}
//             <input className='w-full px-3 py-2 border border-gray-800' type="email" placeholder='Email' required />
//             <input className='w-full px-3 py-2 border border-gray-800' type="password" placeholder='Password' required />
//             <div className='w-full flex justify-between text-sm mt-[-8px]'>
//                 {currentState ==='Login'
//                 ?                <p className='cursor-pointer'>Not registered yet?</p>
//                 :                <p className='cursor-pointer'>Already signed up?</p>
//                 }
//                 {
//                     currentState === 'Login'
//                         ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create account</p>
//                         : <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login here</p>
//                 }
//             </div>
//             <button type='submit' className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Login' ? 'Sign in' : 'Sign up'}</button>
//         </form>
//     )
// }
// 'use client';
// import { useState } from "react";
// import { useShop } from "@/context/ShopContext";
// import apiRoutes from "@/common/constants/apiRoutes";
// import { apiRequest } from "@/common/api/apiService";
// import { showError, showSuccess } from "@/common/toast/toastService";

// export default function Login() {
//     const [currentState, setCurrentState] = useState("Login");
//     const [loading, setLoading] = useState(false);
//     const { setUser, setToken, navigate } = useShop();

//     const onSubmitHandler = async (e) => {
//         console.log("Submit handler called");
//         e.preventDefault();
//         setLoading(true);

//         const email = e.target.email.value;
//         const password = e.target.password.value;

//         try {
//             if (currentState === "Sign Up") {
//                 const name = e.target.name.value;
//                 const mobile = e.target.mobile.value;

//                 // API call
//                 const res = await apiRequest(apiRoutes.userRegister, "POST", { name, email, mobile, password });

//                 // Handle response only once
//                 if (!res || !res.response) {
//                     throw new Error(res?.message || "Registration failed");
//                 }

//                 showSuccess("Registration successful!");

//                 // Clear fields
//                 e.target.name.value = "";
//                 e.target.mobile.value = "";
//                 e.target.email.value = "";
//                 e.target.password.value = "";

//                 // Switch to login page
//                 setCurrentState("Login");
//                 navigate("/login");
//             } else {
//                 // LOGIN MODE
//                 const res = await apiRequest(apiRoutes.userLogin, "POST", { username: email, password });

//                 if (!res || !res.data) {
//                     throw new Error("Login failed");
//                 }

//                 const userData = res.data;

//                 if (userData.email === email && userData.password === password) {
//                     showSuccess(res.message || "Login successful!");
//                     setUser({ name: userData.name, email: userData.email, mobile: userData.mobile });
//                     setToken(userData.token);
//                     navigate("/");
//                 } else {
//                     throw new Error("Invalid username or password");
//                 }
//             }
//         } catch (err) {
//             // Only ONE showError for any kind of failure
//             // showError(err.message || "Something went wrong");
//         } finally {
//             setLoading(false); // Ensure loading is stopped
//         }
//     };

//     return (
//         <form
//             onSubmit={onSubmitHandler}
//             className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
//         >
//             <div className="inline-flex items-center gap-2 mb-2 mt-10">
//                 <p className="text-3xl font-serif">{currentState}</p>
//                 <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
//             </div>

//             {currentState === "Sign Up" && (
//                 <>
//                     <input
//                         name="name"
//                         className="w-full px-3 py-2 border border-gray-800"
//                         type="text"
//                         placeholder="Name"
//                         required
//                     />
//                     <input
//                         name="mobile"
//                         className="w-full px-3 py-2 border border-gray-800"
//                         type="text"
//                         placeholder="Mobile"
//                         required
//                     />
//                 </>
//             )}

//             <input
//                 name="email"
//                 className="w-full px-3 py-2 border border-gray-800"
//                 type="text"
//                 placeholder="Email / Username"
//                 required
//             />

//             <input
//                 name="password"
//                 className="w-full px-3 py-2 border border-gray-800"
//                 type="password"
//                 placeholder="Password"
//                 required
//             />

//             <div className="w-full flex justify-between text-sm mt-[-8px]">
//                 {currentState === "Login" ? (
//                     <p>Not registered yet?</p>
//                 ) : (
//                     <p>Already signed up?</p>
//                 )}

//                 {currentState === "Login" ? (
//                     <p
//                         onClick={() => setCurrentState("Sign Up")}
//                         className="cursor-pointer"
//                     >
//                         Create account
//                     </p>
//                 ) : (
//                     <p
//                         onClick={() => setCurrentState("Login")}
//                         className="cursor-pointer"
//                     >
//                         Login here
//                     </p>
//                 )}
//             </div>

//             <button
//                 type="submit"
//                 className="bg-black text-white font-light px-8 py-2 mt-4"
//                 disabled={loading}
//             >
//                 {loading
//                     ? currentState === "Login"
//                         ? "Signing in..."
//                         : "Signing up..."
//                     : currentState === "Login"
//                         ? "Sign in"
//                         : "Sign up"}
//             </button>
//         </form>
//     );
// }

'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import apiRoutes from "@/common/constants/apiRoutes";
import { apiRequest } from "@/common/api/apiService";
import { showError, showSuccess } from "@/common/toast/toastService";
import { loginSuccess } from "@/common/store/auth/authSlice";
// 🔥 Redux
import { useDispatch } from "react-redux";

export default function Login() {
    const [currentState, setCurrentState] = useState("Login");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const router = useRouter();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            // SIGN UP
            if (currentState === "Sign Up") {
                const name = e.target.name.value;
                const mobile = e.target.mobile.value;

                const res = await apiRequest(apiRoutes.userRegister, "POST", {
                    name, email, mobile, password
                });

                if (!res?.response) throw new Error("Registration failed");

                showSuccess("Registration successful!");

                // Clear form
                e.target.reset();

                // Switch to Login
                setCurrentState("Login");
                return;
            }

            // LOGIN
            const res = await apiRequest(apiRoutes.userLogin, "POST", {
                username: email,
                password
            });

            if (!res?.data) throw new Error("Invalid credentials");

            const userData = res.data;

            // 🔥 Save to Redux
            dispatch(loginSuccess({
                token: userData.token,
                user: {
                    name: userData.name,
                    email: userData.email,
                    mobile: userData.mobile
                }
            }));

            // 🔥 Save in localStorage for persistence
            localStorage.setItem("token", userData.token);
            localStorage.setItem("user", JSON.stringify({
                name: userData.name,
                email: userData.email,
                mobile: userData.mobile
            }));

            showSuccess("Login successful!");
            router.push("/");

        } catch (err) {
            showError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form 
            onSubmit={onSubmitHandler} 
            className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
        >
            <div className="inline-flex items-center gap-2 mb-2 mt-10">
                <p className="text-3xl font-serif">{currentState}</p>
                <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
            </div>

            {currentState === "Sign Up" && (
                <>
                    <input name="name" className="w-full px-3 py-2 border border-gray-800" placeholder="Name" required />
                    <input name="mobile" className="w-full px-3 py-2 border border-gray-800" placeholder="Mobile" required />
                </>
            )}

            <input name="email" className="w-full px-3 py-2 border border-gray-800" placeholder="Email / Username" required />
            <input name="password" className="w-full px-3 py-2 border border-gray-800" type="password" placeholder="Password" required />

            <div className="w-full flex justify-between text-sm mt-[-8px]">
                {currentState === "Login" ? <p>Not registered yet?</p> : <p>Already signed up?</p>}
                <p 
                    onClick={() => setCurrentState(currentState === "Login" ? "Sign Up" : "Login")} 
                    className="cursor-pointer"
                >
                    {currentState === "Login" ? "Create account" : "Login here"}
                </p>
            </div>

            <button 
                type="submit"
                disabled={loading}
                className="bg-black text-white font-light px-8 py-2 mt-4"
            >
                {loading 
                    ? currentState === "Login" ? "Signing in..." : "Signing up..."
                    : currentState === "Login" ? "Sign in" : "Sign up"
                }
            </button>
        </form>
    );
}

