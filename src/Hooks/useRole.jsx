import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthContext";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [role, setRole] = useState(null);
    const [status, setStatus] = useState(null);
    const [roleLoading, setRoleLoading] = useState(true);

    useEffect(() => {
        if (user && user.email) {
            setRoleLoading(true);
            axiosSecure.get(`/users/${user.email}`)
                .then(res => {
                    setRole(res.data.role);
                    setStatus(res.data.status); 
                    setRoleLoading(false);
                })
                .catch(error => {
                    console.error(error);
                    setRoleLoading(false);
                });
        } else {
            setRoleLoading(false);
        }
    }, [user, axiosSecure]);

    return [role, roleLoading, status];
};

export default useRole;