const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiRoutes = {
    userLogin: `${BASE_URL}/auth/login`,
    userRegister: `${BASE_URL}/auth/register`,
    userLogout:`${BASE_URL}/auth/logout`,
};
export default apiRoutes;
