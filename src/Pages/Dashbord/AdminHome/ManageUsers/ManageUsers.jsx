import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { FaSearch, FaUserShield, FaUserTie, FaBan, FaCheckCircle, FaUser, FaUserAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import PageTitle from '../../../../Components/PageTitle';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchUsers = async () => {
        try {
            const res = await axiosSecure.get(`/users?search=${searchTerm}`);
            setUsers(res.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [searchTerm, axiosSecure]);

    const handleRoleUpdate = (user, newRole) => {
        Swal.fire({
            title: `Make ${newRole}?`,
            text: `Do you want to change role of ${user.name} to ${newRole}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes, update it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.patch(`/users/admin/${user._id}`, { role: newRole });
                    if (res.data.modifiedCount > 0) {
                        toast.success(`${user.displayName} is now a ${newRole}!`);
                        fetchUsers();
                    }
                } catch (error) {
                    toast.error("Failed to update role");
                }
            }
        });
    };

    const handleSuspendUser = (user) => {
        if (user.status === 'suspended') {
            axiosSecure.patch(`/users/admin/${user._id}`, { status: 'active' })
                .then(() => {
                    toast.success("User activated successfully!");
                    fetchUsers();
                });
            return;
        }

        Swal.fire({
            title: 'Suspend User',
            input: 'textarea',
            inputLabel: 'Reason for suspension',
            inputPlaceholder: 'Type your reason here...',
            inputAttributes: {
                'aria-label': 'Type your reason here'
            },
            showCancelButton: true,
            confirmButtonText: 'Suspend',
            confirmButtonColor: '#d33',
            preConfirm: (reason) => {
                if (!reason) {
                    Swal.showValidationMessage('Please enter a reason');
                }
                return reason;
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.patch(`/users/admin/${user._id}`, { 
                        status: 'suspended',
                        suspensionReason: result.value
                    });
                    if (res.data.modifiedCount > 0) {
                        Swal.fire('Suspended!', 'User has been suspended.', 'success');
                        fetchUsers();
                    }
                } catch (error) {
                    toast.error("Error suspending user");
                }
            }
        });
    };

    if (loading) {
        return <div className="text-center mt-20"><span className="loading loading-bars loading-lg text-primary"></span></div>;
    }

    return (
        <div className="w-full bg-base-100 shadow-xl rounded-2xl p-4 md:p-6 border border-base-200">
            <PageTitle title="Manage User" />
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <div className="w-full md:w-auto">
                    <h2 className="text-3xl font-bold text-primary">Manage Users</h2>
                    <p className="text-base-content/60">Total Users: {users.length}</p>
                </div>
                <div className="relative w-full md:w-80">
                    <input
                        type="text"
                        placeholder="Search by Name or Email..."
                        className="input input-bordered w-full pl-10 focus:input-primary"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
            </div>

            <div className="hidden md:block overflow-x-auto">
                <table className="table table-zebra w-full align-middle">
                    <thead className="bg-base-200 text-base-content text-sm uppercase">
                        <tr>
                            <th>#</th>
                            <th>User Info</th>
                            <th>Current Role</th>
                            <th>Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id} className={user.status === 'suspended' ? 'bg-red-50' : ''}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={user.photoURL || "https://i.ibb.co/5GzXkwq/user.png"} alt={user.name} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{user.name}</div>
                                            <div className="text-xs opacity-50">{user.email}</div>
                                        </div>
                                    </div>
                                </td>
                                
                                <td>
                                    {user.role === 'admin' && <div className="badge badge-primary badge-outline gap-1"><FaUserShield/> Admin</div>}
                                    {user.role === 'manager' && <div className="badge badge-secondary badge-outline gap-1"><FaUserTie/> Manager</div>}
                                    {user.role === 'borrower' && <div className="badge badge-ghost badge-outline gap-1"><FaUser/> User</div>}
                                </td>

                                <td>
                                    <div className={`badge ${user.status === 'suspended' ? 'badge-error text-white' : 'badge-success text-white'}`}>
                                        {user.status === 'suspended' ? 'Suspended' : 'Active'}
                                    </div>
                                </td>

                                <td className="text-center">
                                    <div className="flex justify-center items-center gap-2">
                                        <div className="join">
                                            <button 
                                                onClick={() => handleRoleUpdate(user, 'borrower')}
                                                disabled={user.role === 'borrower'}
                                                className="btn btn-xs join-item btn-outline"
                                                title="Make User"
                                            >
                                                <FaUser />
                                            </button>
                                            <button 
                                                onClick={() => handleRoleUpdate(user, 'manager')}
                                                disabled={user.role === 'manager'}
                                                className="btn btn-xs join-item btn-outline btn-secondary"
                                                title="Make Manager"
                                            >
                                                <FaUserTie />
                                            </button>
                                            <button 
                                                onClick={() => handleRoleUpdate(user, 'admin')}
                                                disabled={user.role === 'admin'}
                                                className="btn btn-xs join-item btn-outline btn-primary"
                                                title="Make Admin"
                                            >
                                                <FaUserShield />
                                            </button>
                                        </div>

                                        <button 
                                            onClick={() => handleSuspendUser(user)}
                                            className={`btn btn-sm btn-circle ${user.status === 'suspended' ? 'btn-success text-white' : 'btn-error text-white'}`}
                                            title={user.status === 'suspended' ? 'Activate User' : 'Suspend User'}
                                        >
                                            {user.status === 'suspended' ? <FaCheckCircle /> : <FaBan />}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="md:hidden grid grid-cols-1 gap-4">
                {users.map((user) => (
                    <div key={user._id} className={`card bg-base-100 border shadow-sm p-4 ${user.status === 'suspended' ? 'border-red-300 bg-red-50' : 'border-base-200'}`}>
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="w-10 rounded-full">
                                        <img src={user.photoURL || "https://i.ibb.co/5GzXkwq/user.png"} alt="User" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">{user.name}</h3>
                                    <p className="text-xs text-base-content/60 break-all">{user.email}</p>
                                </div>
                            </div>
                            <div className={`badge text-xs ${user.status === 'suspended' ? 'badge-error text-white' : 'badge-success text-white'}`}>
                                {user.status === 'suspended' ? 'Suspended' : 'Active'}
                            </div>
                        </div>

                        <div className="flex justify-between items-center bg-base-200/50 p-2 rounded-lg mb-3">
                            <span className="text-xs opacity-70">Current Role:</span>
                            <span className="text-xs font-bold uppercase">{user.role}</span>
                        </div>

                        <div className="grid grid-cols-4 gap-2">
                            <button 
                                onClick={() => handleRoleUpdate(user, 'borrower')}
                                disabled={user.role === 'borrower'}
                                className="btn btn-sm btn-outline"
                            >
                                <FaUser />
                            </button>
                            <button 
                                onClick={() => handleRoleUpdate(user, 'manager')}
                                disabled={user.role === 'manager'}
                                className="btn btn-sm btn-outline btn-secondary"
                            >
                                <FaUserTie />
                            </button>
                            <button 
                                onClick={() => handleRoleUpdate(user, 'admin')}
                                disabled={user.role === 'admin'}
                                className="btn btn-sm btn-outline btn-primary"
                            >
                                <FaUserShield />
                            </button>
                            <button 
                                onClick={() => handleSuspendUser(user)}
                                className={`btn btn-sm ${user.status === 'suspended' ? 'btn-success text-white' : 'btn-error text-white'}`}
                            >
                                {user.status === 'suspended' ? <FaCheckCircle /> : <FaBan />}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageUsers;