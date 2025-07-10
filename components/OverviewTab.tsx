import React from 'react';
import { Card, Highlight } from './common/Card';

const MetricCard = ({ value, label, color }: { value: string, label: string, color: string }) => (
    <div className="bg-white rounded-xl p-6 text-center shadow-lg border-t-4" style={{ borderColor: color }}>
        <div className="text-5xl font-extrabold" style={{ color: color }}>{value}</div>
        <div className="text-gray-600 font-semibold mt-2">{label}</div>
    </div>
);

const TipItem = ({ children }: { children: React.ReactNode }) => (
    <div className="bg-white p-4 rounded-lg border-l-4 border-sky-400 shadow-sm">
        {children}
    </div>
);

export const OverviewTab = () => {
    const metrics = [
        { value: '78%', label: 'Response Rate', color: '#2a5298' },
        { value: '45%', label: 'Meeting Conversion', color: '#764ba2' },
        { value: '23%', label: 'Close Rate', color: '#28a745' },
        { value: '$35K', label: 'Avg Deal Size', color: '#ffc107' },
    ];

    const principles = [
        <><strong>Personal Touch:</strong> Always use the prospect's name and reference something specific.</>,
        <><strong>Value-First Approach:</strong> Lead with the prestigious attendee list and exclusive networking.</>,
        <><strong>Authority Building:</strong> Mention confirmed central banks and major institutions early.</>,
        <><strong>High Response Reality:</strong> Expect a 78%+ response rate. Qualify responses immediately.</>,
        <><strong>Channel Optimization:</strong> Use email for content follow-ups and LinkedIn for relationship building.</>,
        <><strong>Never Show Desperation:</strong> Don't chase resistant prospects. Difficult prospects are red flags.</>,
    ];

    return (
        <div className="space-y-8">
            <Card title="Sales Process Overview" icon="🎯">
                <p>This manual standardizes our prospecting approach for <Highlight>Blockchain Summit LATAM 2025</Highlight>. Our proven methodology focuses on building relationships with high-value targets including central banks, financial institutions, and blockchain companies through a series of strategic touchpoints.</p>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map(metric => (
                    <MetricCard key={metric.label} {...metric} />
                ))}
            </div>

            <Card title="Key Success Principles" icon="🔑" className="bg-gradient-to-br from-sky-50 to-blue-100 border-sky-500">
                <div className="space-y-4">
                    {principles.map((principle, index) => (
                        <TipItem key={index}>{principle}</TipItem>
                    ))}
                </div>
            </Card>
        </div>
    );
};
