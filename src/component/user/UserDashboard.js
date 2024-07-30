import React from 'react';
import UserSidebar from './UserSidebar';
import { Line } from "react-chartjs-2";
import "./UserDashboard.css";

import { Chart, CategoryScale, LinearScale, Title, Legend, BarController, LineController, PointElement, BarElement, LineElement, ArcElement } from 'chart.js';
// Register necessary controllers and elements
Chart.register(CategoryScale, LinearScale, Title, Legend, BarController, LineController, PointElement, BarElement, LineElement, ArcElement);


const UserDashboard = () => {

    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["DeepPink"],
                hoverBackgroundColor: ["red"],
                data: [0, 4000],
            },
        ],
    };

    return (
        <div className='dashboard min-h-screen'>
            <UserSidebar />
            <div className="dashboardContainer">
                <h1>Dashboard</h1>
                <div> <h1 className='text-4xl font-bold text-center border-b-2 py-5'> Total Earned Amount </h1> </div>
                <div className='lineChart'>
                    <Line data={lineState} />
                </div>
                
            </div>
        </div>
    );
};

export default UserDashboard;