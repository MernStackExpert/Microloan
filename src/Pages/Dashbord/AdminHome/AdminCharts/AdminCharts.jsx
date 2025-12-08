import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const AdminCharts = ({ roleStats }) => {
    const pieData = [
        { name: 'Borrowers', value: roleStats.borrowers, color: '#0088FE' },
        { name: 'Managers', value: roleStats.managers, color: '#00C49F' },
        { name: 'Admins', value: roleStats.admins, color: '#FFBB28' },
    ];

    const barData = [
        { name: 'Users', count: roleStats.borrowers + roleStats.managers + roleStats.admins },
        { name: 'Managers', count: roleStats.managers },
        { name: 'Borrowers', count: roleStats.borrowers },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="card bg-base-100 shadow-xl border border-base-200 p-6 h-[400px]">
                <h3 className="text-xl font-bold mb-4 text-center">User Role Distribution</h3>
                <div className="h-full w-full">
                    <ResponsiveContainer width="100%" height="90%">
                        <PieChart>
                            <Pie 
                                data={pieData} 
                                cx="50%" 
                                cy="50%" 
                                innerRadius={60} 
                                outerRadius={100} 
                                paddingAngle={5} 
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36}/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="card bg-base-100 shadow-xl border border-base-200 p-6 h-[400px]">
                <h3 className="text-xl font-bold mb-4 text-center">User Statistics</h3>
                <div className="h-full w-full">
                    <ResponsiveContainer width="100%" height="90%">
                        <BarChart data={barData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="#8884d8" barSize={50} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default AdminCharts;