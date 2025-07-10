import React, { useState } from 'react';
import { generateScript } from '../services/geminiService';
import { Button } from './common/Button';
import { Card } from './common/Card';

interface ScriptGeneratorTabProps {
    showCopyNotification: (message?: string) => void;
}

const Label = ({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) => (
    <label htmlFor={htmlFor} className="block text-sm font-semibold text-gray-700 mb-2">
        {children}
    </label>
);

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input
        {...props}
        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition"
    />
);

const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
    <select
        {...props}
        className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition"
    />
);

export const ScriptGeneratorTab = ({ showCopyNotification }: ScriptGeneratorTabProps) => {
    const [formData, setFormData] = useState({
        contactName: '',
        company: '',
        position: '',
        platform: 'linkedin',
        messageType: 'initial',
        context: '',
        focus: 'central-banks',
    });
    const [generatedScript, setGeneratedScript] = useState('Generated script will appear here...');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleGenerate = async () => {
        if (!formData.contactName || !formData.company) {
            alert('Please fill in at least Contact Name and Company.');
            return;
        }
        setIsLoading(true);
        setGeneratedScript('Generating your script with AI... Please wait.');
        try {
            const script = await generateScript(
                formData.contactName,
                formData.company,
                formData.position,
                formData.platform,
                formData.messageType,
                formData.context,
                formData.focus
            );
            setGeneratedScript(script);
        } catch (error) {
            setGeneratedScript('An error occurred while generating the script.');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleCopy = () => {
        if (generatedScript && generatedScript !== 'Generated script will appear here...' && !isLoading) {
            navigator.clipboard.writeText(generatedScript);
            showCopyNotification();
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card title="🤖 AI-Powered Script Generator" icon="⚡" className="bg-gradient-to-br from-green-50 to-cyan-50 border-brand-accent-green">
                <p className="mb-6 text-gray-600">Fill in the details below and our AI assistant will craft a personalized outreach message based on the sales manual.</p>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="contactName">Contact Name *</Label>
                        <Input id="contactName" name="contactName" value={formData.contactName} onChange={handleChange} placeholder="e.g., Guillermo Johanson" />
                    </div>
                    <div>
                        <Label htmlFor="company">Company *</Label>
                        <Input id="company" name="company" value={formData.company} onChange={handleChange} placeholder="e.g., Banco de Colombia" />
                    </div>
                    <div>
                        <Label htmlFor="position">Position/Title</Label>
                        <Input id="position" name="position" value={formData.position} onChange={handleChange} placeholder="e.g., Chief Digital Officer" />
                    </div>
                    <div>
                        <Label htmlFor="platform">Platform</Label>
                        <Select id="platform" name="platform" value={formData.platform} onChange={handleChange}>
                            <option value="linkedin">LinkedIn</option>
                            <option value="email">Email</option>
                            <option value="whatsapp">WhatsApp</option>
                            <option value="twitter">Twitter/X</option>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="messageType">Message Type</Label>
                        <Select id="messageType" name="messageType" value={formData.messageType} onChange={handleChange}>
                            <option value="initial">Initial Contact</option>
                            <option value="followup">Follow-up</option>
                            <option value="urgent">Urgent/Final</option>
                        </Select>
                    </div>
                     <div>
                        <Label htmlFor="focus">Specific Focus</Label>
                        <Select id="focus" name="focus" value={formData.focus} onChange={handleChange}>
                            <option value="central-banks">Central Banks & Regulators</option>
                            <option value="fintech">Fintech & Digital Banking</option>
                            <option value="institutional">Institutional Investment</option>
                        </Select>
                    </div>
                    <div>
                        <Label htmlFor="context">Recent Context (Optional)</Label>
                        <Input id="context" name="context" value={formData.context} onChange={handleChange} placeholder="e.g., Recent news, LinkedIn post..." />
                    </div>
                </div>
                <div className="mt-6">
                    <Button onClick={handleGenerate} disabled={isLoading} variant="success">
                        {isLoading ? 'Generating...' : '⚡ Generate Script'}
                    </Button>
                </div>
            </Card>

            <Card title="Generated Script" icon="📜" className="h-full">
                <div className={`whitespace-pre-wrap p-4 bg-gray-50 rounded-lg min-h-[300px] font-mono text-sm text-gray-800 transition ${isLoading ? 'animate-pulse' : ''}`}>
                    {generatedScript}
                </div>
                 <div className="mt-4">
                    <Button onClick={handleCopy} disabled={isLoading || generatedScript.startsWith('Generated script')}>
                       📋 Copy Script
                    </Button>
                </div>
            </Card>
        </div>
    );
};
