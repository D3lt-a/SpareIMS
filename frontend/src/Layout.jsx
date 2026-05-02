import React from 'react'
import { Outlet } from 'react-router-dom'
import TopBar from './components/TopBar.jsx'
import SideBar from './components/SideBar.jsx'

function Layout() {
    return (
        <div className="min-h-screen flex">
            <SideBar />

            <div className="flex-1 flex flex-col">
                <TopBar />
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default Layout
