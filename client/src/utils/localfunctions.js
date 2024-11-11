import { jwtDecode } from 'jwt-decode';

//FOR ROLE BASED AUTHENTICATION-->

export const getRole = () => {
    const token = localStorage.getItem('token');
    try {
        const decoded = jwtDecode(token);
        return decoded.role;
    } catch (e) {
        console.log(e)
        return null;
    }
};