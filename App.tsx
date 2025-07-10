
import React, { useState, useCallback } from 'react';
import { HashRouter, Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { ScriptGeneratorTab } from './components/ScriptGeneratorTab';
import { MessageTemplatesTab } from './components/MessageTemplatesTab';
import { TrainingTab } from './components/TrainingTab';
import { OverviewTab } from './components/OverviewTab';
import { CustomerJourneyTab } from './components/CustomerJourneyTab';

const Header = () => (
    <div className="bg-gradient-to-br from-brand-primary-dark to-brand-primary text-white p-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10">
            <h1 className="text-4xl font-extrabold mb-2 tracking-tight">🚀 Sales Process Manual</h1>
            <p className="text-lg opacity-90">Blockchain Summit LATAM 2025 - AI-Powered Prospecting System</p>
        </div>
    </div>
);

const Nav = () => {
    const navItems = [
        { path: '/', label: '📋 Overview' },
        { path: '/journey', label: '🌊 Customer Journey' },
        { path: '/generator', label: '⚡ Script Generator' },
        { path: '/templates', label: '📝 Message Templates' },
        { path: '/training', label: '🎓 Training Guide' },
    ];
    const location = useLocation();

    return (
        <nav className="flex flex-wrap bg-gray-100 border-b-2 border-gray-200">
            {navItems.map(item => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                        `py-4 px-6 font-semibold text-gray-600 border-b-4 transition-colors duration-300 ease-in-out whitespace-nowrap
                        ${isActive ? 'border-brand-primary text-brand-primary bg-white' : 'border-transparent hover:bg-gray-200 hover:text-brand-primary'}`
                    }
                >
                    {item.label}
                </NavLink>
            ))}
        </nav>
    );
};


const CopyNotification = ({ message, show }: { message: string, show: boolean }) => (
    <div className={`fixed top-5 right-5 bg-brand-accent-green text-white py-2 px-5 rounded-lg shadow-lg transition-all duration-300 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}`}>
        {message}
    </div>
);

export default function App() {
    const [notification, setNotification] = useState({ show: false, message: '' });

    const showCopyNotification = useCallback((message = '✅ Copied to clipboard!') => {
        setNotification({ show: true, message });
        setTimeout(() => {
            setNotification({ show: false, message: '' });
        }, 2000);
    }, []);

    return (
        <HashRouter>
            <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 font-sans text-gray-800">
                <div className="max-w-7xl mx-auto my-0 sm:my-8 bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <Header />
                    <Nav />
                    <main className="p-4 sm:p-8 bg-white">
                         <Routes>
                            <Route path="/" element={<OverviewTab />} />
                            <Route path="/journey" element={<CustomerJourneyTab showCopyNotification={showCopyNotification} />} />
                            <Route path="/generator" element={<ScriptGeneratorTab showCopyNotification={showCopyNotification} />} />
                            <Route path="/templates" element={<MessageTemplatesTab showCopyNotification={showCopyNotification} />} />
                            <Route path="/training" element={<TrainingTab showCopyNotification={showCopyNotification} />} />
                        </Routes>
                    </main>
                </div>
                <CopyNotification show={notification.show} message={notification.message} />
            </div>
        </HashRouter>
    );
}