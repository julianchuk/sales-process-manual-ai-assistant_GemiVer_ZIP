import React, { useState, useMemo, useCallback } from 'react';
import { Card, Highlight } from './common/Card';
import { Button } from './common/Button';

// Data moved outside component to prevent re-declaration on re-renders
const touchpoints = [
    { id: 1, name: 'Initial Greeting', timing: '0-1 min', day: 0, x: 50, mood: 'positive', description: "Warm, personal greeting to establish human connection. The key is to take your time and not rush." },
    { id: 2, name: 'Main Pitch', timing: '2-3 min', day: 0, x: 120, mood: 'peak', description: "The complete value proposition: Authority + Event USPs + Social Proof. Delivered 2-3 minutes after the initial greeting." },
    { id: 3, name: 'Response Qualification', timing: '5-10 min', day: 0, x: 200, mood: 'neutral', description: "Qualify responses and provide specific answers. Move interested prospects to the email and meeting process." },
    { id: 4, name: 'Send Overview Email', timing: 'Day 0', day: 0, x: 300, mood: 'positive', description: "Send the comprehensive overview email with all event details, sponsorship opportunities, and social proof." },
    { id: 5, name: 'Confirm Email Sent via Chat', timing: 'Day 0', day: 0, x: 370, mood: 'peak', description: "Close the loop on the original chat platform to confirm the email was sent and prompt the prospect to check their inbox." },
    { id: 6, name: 'Email Content Follow-up', timing: 'Day 4', day: 4, x: 460, mood: 'positive-alt', description: "Follow up on the overview email with new, valuable information to re-engage the prospect." },
    { id: 7, name: 'Confirm Follow-up Sent via Chat', timing: 'Day 4', day: 4, x: 530, mood: 'peak', description: "A second, quick 'close the loop' action on the original chat platform to notify the prospect of the follow-up email." },
    { id: 8, name: 'LinkedIn Email Ask', timing: 'Day 4', day: 4, x: 460, mood: 'neutral', description: "For prospects who showed interest but haven't provided an email yet. A second attempt to get their email to bring them into the main flow." },
    { id: 9, name: 'High-Value Rescue #1', timing: 'Day 7', day: 7, x: 630, mood: 'neutral', description: "A strategic, high-value follow-up for important prospects who have gone silent after the first follow-up." },
    { id: 10, name: 'Social Proof', timing: 'Day 10', day: 10, x: 720, mood: 'peak', description: "Leverage new high-profile sponsors, speakers, or media partnerships to create FOMO and re-engage prospects." },
    { id: 11, name: 'Discovery Meeting Held', timing: 'Variable', day: 15, x: 850, mood: 'neutral', description: 'The first major goal: a successful discovery call to understand the prospect\'s needs and present the event\'s core value.' },
    { id: 12, name: 'Sponsorship Proposal Meeting', timing: '+2 days', day: 17, x: 980, mood: 'positive', description: 'Present tailored sponsorship packages based on the discovery call, addressing specific needs and budget.' },
    { id: 13, name: 'Deal Closed', timing: '+7 days', day: 24, x: 1100, mood: 'peak', description: 'Successful conversion to sponsor, contract signed, and onboarding begins.' }
];


const DetailTemplate = ({ title, content, onCopy, preformatted = true }: { title: string, content: string, onCopy?: () => void, preformatted?: boolean }) => (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-4 my-4 shadow-sm">
        <div className="flex justify-between items-center pb-3 mb-3 border-b">
            <h5 className="font-bold text-md text-brand-primary-dark">{title}</h5>
            {onCopy && <Button onClick={onCopy} variant="primary" className="px-3 py-1.5 text-sm">📋 Copy</Button>}
        </div>
        <div className={`${preformatted ? 'whitespace-pre-wrap font-mono' : ''} text-xs bg-gray-50 p-3 rounded-lg text-gray-700`}>{content}</div>
    </div>
);


const InitialGreetingDetails = ({ showCopyNotification }) => {
    const template = "Hi [NAME], it's a pleasure to greet you!";
    const handleCopy = () => {
        navigator.clipboard.writeText(template);
        showCopyNotification();
    };
    const proTips = [
        { title: "Show Genuine Appreciation", text: "Express sincere gratitude for the opportunity to connect, e.g., \"It's truly a pleasure to connect with you!\" This sets a warm, human tone." },
        { title: "Convey Good Vibes & Joy", text: "Use positive language and emojis (e.g., 😊 or 👋) to transmit optimism and enthusiasm. Example: \"Hi [NAME], thrilled to reach out today!\"" },
        { title: "Prioritize the Human", text: "Focus on the person first, not the pitch. Ask a light, human-centric question like \"How's your week going?\" or compliment their recent work, e.g., \"I loved your recent post on [TOPIC]!\"" },
        { title: "Take Your Time", text: "Wait 0-1 minute before moving to the pitch. This shows respect for their time and builds rapport naturally." },
        { title: "Avoid Rushing", text: "Never jump straight to business. A rushed greeting feels transactional and undermines the human connection." }
    ];

    return (
        <div className="mt-4 space-y-4">
             <DetailTemplate title="Example Message" content={template} onCopy={handleCopy} />
             <Card title="💡 Pro Tips for Initial Greeting" icon="🧠" className="bg-gradient-to-br from-yellow-50 to-orange-50 border-brand-accent-yellow">
                <ul className="space-y-3">
                    {proTips.map((tip, index) => (
                        <li key={index}>
                            <strong className="text-gray-800">{tip.title}:</strong>
                            <span className="text-gray-700 ml-1">{tip.text}</span>
                        </li>
                    ))}
                </ul>
             </Card>
        </div>
    );
};

const ConfirmEmailSentDetails = ({ showCopyNotification }) => {
    const templates = {
        greeting: "Hi [NAME], hope your day is going great!",
        confirmation: "Email sent! Please confirm receipt, just in case it landed in spam."
    };
    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        showCopyNotification();
    };

    return (
        <div className="mt-4 space-y-6">
            <Card title="💬 Two-Part Chat Message" icon="📱">
                <p className="text-sm text-gray-600 mb-4">Send these two messages in the original chat (LinkedIn, WhatsApp, etc.) 1 minute apart.</p>
                <DetailTemplate title="Message 1: The Greeting" content={templates.greeting} onCopy={() => handleCopy(templates.greeting)} />
                <DetailTemplate title="Message 2: The Confirmation (1 min later)" content={templates.confirmation} onCopy={() => handleCopy(templates.confirmation)} />
            </Card>
            <Card title="💡 Pro-Tips for Closing the Loop" icon="🧠">
                <ul className="space-y-2 text-sm text-gray-700">
                    <li><strong>Maintain Momentum:</strong> This keeps the original chat warm while you wait for an email response.</li>
                    <li><strong>Beat the Spam Filter:</strong> This is the single most effective way to ensure your detailed email gets seen.</li>
                    <li><strong>Create a Micro-Commitment:</strong> Asking for confirmation subtly prompts them to open the email sooner.</li>
                    <li><strong>Show You're Organized:</strong> It demonstrates a professional, end-to-end communication process.</li>
                </ul>
            </Card>
        </div>
    );
};

const ConfirmFollowupSentDetails = ({ showCopyNotification }) => {
    const template = "Hi [NAME], just sent you a quick follow-up email with some important updates. Let me know your thoughts when you have a chance!";
    const handleCopy = () => {
        navigator.clipboard.writeText(template);
        showCopyNotification();
    };

    return (
        <div className="mt-4 space-y-6">
            <DetailTemplate title="Follow-up Confirmation Message" content={template} onCopy={handleCopy} />
            <Card title="💡 Pro-Tips for the Second Loop" icon="🧠">
                <ul className="space-y-2 text-sm text-gray-700">
                    <li><strong>Reinforce & Nudge:</strong> This action gently nudges the prospect to check their email without being pushy.</li>
                    <li><strong>Keep it Simple:</strong> A single, brief message is all that's needed here.</li>
                    <li><strong>Maintain Channel Warmth:</strong> It shows you're actively managing the conversation across platforms.</li>
                </ul>
            </Card>
        </div>
    );
};


const DayFourFollowupDetails = ({ variant, showCopyNotification }: { variant: 'email' | 'linkedin', showCopyNotification: (message?: string) => void }) => {
    const templates = {
        email: `Subject: Following up – [Prospect Company] & Blockchain Summit LATAM 2025

Hi [PROSPECT_NAME],

Hope you are doing very well. Following up on our conversation about the potential participation of [Prospect Company] in the Blockchain Summit LATAM 2025.

I understand that schedules can get busy, but we were very enthusiastic about coordinating a call to share the value proposition in depth, especially considering the institutional and strategic profile we are consolidating.

I'll take this opportunity to leave you with some key updates since our last exchange:

✅ **Key Updates Since We Last Spoke:**
*   **Confirmed:** The Bank for International Settlements (BIS), alongside the central banks of Colombia, Brazil, Mexico, and Chile.
*   **New Speaker:** Juan Carlos Reyes, president of El Salvador's CNAD, has joined as a speaker.
*   **Official Media Partner:** Negocios TV is confirmed (global leader in YouTube views among financial media in Feb 2025).
*   **Regional Activations:** Roadshows are being organized in Bogotá, Medellín, Lima, Santiago, San José, and Buenos Aires, in partnership with local fintech and blockchain chambers.

🏆 **Blockchain & Fintech LATAM Awards:**
Organized with our regional chamber allies under multilateral MoUs, we are featuring award categories aligned with the profile of the [client type/industry, e.g., 'exchange' or 'payments' sector]:
*   [Mention 2-3 specific award categories relevant to their business from the full list, e.g., Best CEX, Best Web3 Education Initiative, Best Fintech-Web3 Integration].

👉 If you are still interested, you can book a time directly here: [YOUR_BOOKING_LINK]
Or, if you prefer, I'd be happy to use your scheduling tool.

I would be delighted to resume the conversation when you consider it appropriate. I'm convinced that [Prospect Company] can play a leading role in this edition of the Summit.

Best regards,
[YOUR_NAME]`,
        linkedinInitial: "Hi [NAME], hope you're doing well! Following up on our conversation about Blockchain Summit LATAM.\n\nQuick update: We've just confirmed [RECENT_NEWS_OR_SPEAKER].\n\nIf you'd like the detailed overview with all partnership options, I'd be happy to send it over. What would be the best email to send it to?",
        linkedinFollowup2: "Hi [NAME], hope you're doing very well!\n\nMy messages probably got lost in the crowd - writing to get to the top of your inbox.\n\nQuick reminder about the Blockchain Summit LATAM opportunity. Still interested in the overview?",
        linkedinFinal: "Hi [NAME], going with this final attempt to see if my messages reach you.\n\nI wanted to drop off some recent event updates:\n\n✅ BIS (Bank for International Settlements) now confirmed\n🏛️ Juan Carlos Reyes (CNAD El Salvador) confirmed as speaker\n\nGiven [COMPANY_NAME]'s leadership position, thought these updates might be relevant before I close your file. Let me know if you'd like that overview."
    };

    const handleCopy = (content: string) => {
        navigator.clipboard.writeText(content);
        showCopyNotification();
    };

    const emailPathDetails = (
        <div className="border border-green-300 bg-green-50 rounded-lg p-4">
            <h4 className="font-bold text-lg text-green-800 mb-2">Path A: Email Content Follow-up 📧</h4>
            <p className="text-sm text-green-700 mb-2"><strong>TARGET:</strong> Prospects who HAVE received the overview email but haven't responded.</p>
            <p className="text-sm text-green-700 font-semibold">WHY EMAIL:</p>
            <ul className="list-disc list-inside text-sm text-green-700 mb-3">
                <li>Better for tracking & threading</li>
                <li>More professional for content discussion</li>
                <li>Easier to reference specific points</li>
            </ul>
            <DetailTemplate title="High-Value Follow-up Template" content={templates.email} onCopy={() => handleCopy(templates.email)} />
            <Card title="💡 Pro-Tips for High-Value Follow-up" icon="🧠" className="mt-4 bg-gradient-to-br from-green-100 to-teal-100 border-green-500">
                <ul className="space-y-2 text-sm text-gray-700">
                    <li><strong>Lead with New Value:</strong> Don't just "check in." Always provide new, exciting information (new speakers, partners, awards) to justify the follow-up.</li>
                    <li><strong>Personalize the Updates:</strong> When mentioning the awards, tailor the example categories to the prospect's specific industry (e.g., mention "Best CEX" to an exchange). This shows you're thinking specifically about them.</li>
                    <li><strong>Be Flexible on the Call to Action:</strong> Offering both your booking link and the option to use theirs is considerate and removes friction.</li>
                </ul>
            </Card>
        </div>
    );

    const linkedinPathDetails = (
        <div className="border border-blue-300 bg-blue-50 rounded-lg p-4">
            <h4 className="font-bold text-lg text-blue-800 mb-2">Path B: LinkedIn Email Ask 💬</h4>
            <p className="text-sm text-blue-700 mb-2"><strong>TARGET:</strong> Prospects who showed interest but HAVEN'T given an email yet.</p>
            <p className="text-sm text-blue-700 font-semibold">WHY LINKEDIN:</p>
            <ul className="list-disc list-inside text-sm text-blue-700 mb-3">
                <li>They already engaged on this platform</li>
                <li>More casual for a 'second email ask'</li>
                <li>Can leverage updates as a new reason to contact</li>
            </ul>
            <DetailTemplate title="LinkedIn Follow-up #1 (Day 4)" content={templates.linkedinInitial} onCopy={() => handleCopy(templates.linkedinInitial)} />
            <DetailTemplate title="LinkedIn Follow-up #2 (Day 7)" content={templates.linkedinFollowup2} onCopy={() => handleCopy(templates.linkedinFollowup2)} />
            <DetailTemplate title="LinkedIn Final Attempt (Day 14)" content={templates.linkedinFinal} onCopy={() => handleCopy(templates.linkedinFinal)} />
        </div>
    );

    return (
        <div className="mt-4 space-y-6">
            <Card title="🔱 Day 4 Dual-Channel Follow-up Strategy" icon="🔀">
                 {variant === 'email' && emailPathDetails}
                 {variant === 'linkedin' && linkedinPathDetails}
            </Card>

            <Card title="⚡ Time Optimization Tips" icon="⏱️" className="bg-gradient-to-br from-gray-50 to-gray-200 border-gray-400">
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li><strong>Never Show Desperation:</strong> Don't beg for meetings or responses. Your time is valuable.</li>
                    <li><strong>Flow and Optimize:</strong> If you meet resistance on a channel, don't force it. Let the prospect go.</li>
                    <li><strong>Focus on the Responsive:</strong> Allocate your energy to prospects who are engaging with you.</li>
                    <li><strong>Difficult Prospects are a Red Flag:</strong> If a prospect is difficult this early, they will likely be a difficult partner. Focus on building smooth, positive relationships.</li>
                </ul>
            </Card>
        </div>
    );
};


const ResponseQualificationDetails = ({ showCopyNotification }) => {
    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        showCopyNotification();
    };

    const templates = {
        tellMeFirst: "Of course! Let me tell you we have confirmed BIS (Bank for International Settlements), 4 Central Banks, BlackRock, JP Morgan - there are multiple partnership options. \n\nGiven the volume of options, and for organization and follow-up workflow purposes, I prefer to send you the complete overview by email so you can review it at your own pace. What would be your email?",
        fitFirstFallback: "That's precisely why I send the complete information - so you can review all the touchpoints and partnership opportunities at your own pace, and then decide if you find areas of interest for you. \n\nThis way, if you do see relevant touchpoints, we can have a focused discovery meeting. If not, no time wasted for either of us. Makes sense?",
        whenIsEvent: "Well, let me tell you that the event will be November 12, 13 and 14, 2025 in Medellín, Colombia in partnership with Universidad EAFIT (top 3 nationally and well ranked regionally) at their facilities.\n\n🗓️ Thematic structure by day\nDay 1: Total focus on regulators, central banks and top traditional institutional actors\nDay 2: Intersection between traditional finance (TradFi) and emerging technologies\nDay 3: Full DeFi, community, protocols and adoption\n\nIf that works for you, the most economical/time-efficient approach would be for you to provide me with your email so I can send you the bullet points and detailed general overview. From the email I send you, you can identify the touchpoints that catch your attention and we'll schedule the 15-30 minute discovery meeting.",
        howCanISupport: "If that works for you, the most economical/time-efficient approach would be for you to provide me with your email so I can send you the bullet points and detailed general overview. \n\nFrom the email I send you, you can identify the touchpoints that catch your attention and we'll schedule the 15-30 minute discovery meeting.",
        highValueRescue1: "Hi [NAME], hope you're doing very well! \n\nMy messages probably got lost in the crowd - writing to get to the top of your inbox. \n\nQuick reminder about the Blockchain Summit LATAM opportunity with Central Banks of Colombia, Brazil, Mexico, Chile + BIS now confirmed. Worth a quick chat?",
        highValueFinal: "Hi [NAME], going with this final attempt to see if my messages reach you. \n\nI wanted to drop off some recent event updates:\n\n✅ BIS (Bank for International Settlements) now confirmed\n🏛️ Juan Carlos Reyes (CNAD El Salvador) confirmed as speaker\n📺 Negocios TV as official media partner (2M+ users)\n🏆 Launching first regional Blockchain & Fintech awards\n\nGiven [COMPANY_NAME]'s leadership position, thought these updates might be relevant."
    };

    const proTips = [
        <><strong>Event Details First:</strong> When they ask 'when', give complete picture (dates, location, university partner, 3-day structure) to build credibility and excitement.</>,
        <><strong>Email Gateway:</strong> Always move to email for detailed overview. This qualifies serious prospects and creates a paper trail.</>,
        <><strong>Self-Selection:</strong> Let them choose touchpoints of interest from your overview. This increases engagement and identifies priorities.</>,
        <><strong>Meeting Sizing:</strong> 15-30 minutes is perfect - short enough to say yes, long enough to qualify and present options.</>,
        <><strong>Email Resistance Strategy:</strong> Two-tier approach: (1) FIRST try value preview method - give specific confirmations (BIS, Central Banks, BlackRock) then justify email process. (2) If still resistant, use logical fallback about efficiency and self-selection.</>,
        <><strong>Value Preview Method:</strong> 'Of course! We have confirmed BIS, 4 Central Banks, BlackRock, JP Morgan... for organization and follow-up workflow purposes, I prefer email.' Shows transparency while maintaining professional standards.</>,
        <><strong>Diplomatic Justification:</strong> 'For organization and follow-up workflow purposes' sounds professional and systematic, not preferential. It positions email as a business standard, not personal preference.</>,
        <><strong>Avoid Dry Responses:</strong> Never just say 'It's too much info for this channel.' Always give value preview first, then justify the email process. Dry responses lose qualified prospects.</>,
        <><strong>Efficiency Language:</strong> 'Most economical/time-efficient' frames the email process as beneficial for them, not just you.</>
    ];

    return (
        <div className="mt-4 space-y-6">
            <Card title="🛡️ Email Resistance & Qualification" icon="🚦">
                <DetailTemplate title='"Tell me here first" (IMPROVED)' content={templates.tellMeFirst} onCopy={() => handleCopy(templates.tellMeFirst)} />
                <DetailTemplate title='"Just tell me how we fit first" (FALLBACK)' content={templates.fitFirstFallback} onCopy={() => handleCopy(templates.fitFirstFallback)} />
            </Card>

            <Card title="🎯 Response Qualification Strategy" icon="📊" className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-500">
                <div className="space-y-4">
                    <div>
                        <h5 className="font-bold text-green-600">🟢 HIGH ENGAGEMENT</h5>
                        <p className="text-sm text-gray-600"><strong>Examples:</strong> "When is the event?", "How can we get involved?", "Tell me more".</p>
                        <p className="text-sm text-gray-600"><strong>Action:</strong> Answer their question, then immediately pivot to getting their email for the full overview and scheduling a discovery call.</p>
                    </div>
                    <div>
                        <h5 className="font-bold text-yellow-600">🟡 LOW ENGAGEMENT</h5>
                        <p className="text-sm text-gray-600"><strong>Examples:</strong> 👍, "Thanks", "Interesting", No response.</p>
                        <p className="text-sm text-gray-600"><strong>Action:</strong> Let them go, unless they are a high-value target.</p>
                    </div>
                    <div>
                        <h5 className="font-bold text-red-600">🔴 HIGH-VALUE EXCEPTION (Two-Touch Approach)</h5>
                        <p className="text-sm text-gray-600">For dream sponsors, you get two more attempts.</p>
                        <DetailTemplate title="Follow-up #1 (Day 7)" content={templates.highValueRescue1} onCopy={() => handleCopy(templates.highValueRescue1)} />
                        <DetailTemplate title="Follow-up #2 (Final - Day 14)" content={templates.highValueFinal} onCopy={() => handleCopy(templates.highValueFinal)} />
                    </div>
                </div>
            </Card>
            
            <Card title="✅ High-Engagement Examples" icon="💬" className="bg-gradient-to-br from-green-50 to-teal-50 border-green-500">
                <DetailTemplate title='Response to: "When is the event?"' content={templates.whenIsEvent} onCopy={() => handleCopy(templates.whenIsEvent)} />
                <DetailTemplate title='Response to: "How can I support/help?"' content={templates.howCanISupport} onCopy={() => handleCopy(templates.howCanISupport)} />
            </Card>

            <Card title="💡 Conversion Strategy Pro Tips" icon="🧠" className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-500">
                <ul className="space-y-3">
                    {proTips.map((tip, index) => (
                        <li key={index} className="flex items-start">
                            <span className="text-purple-600 mr-2 mt-1">✓</span>
                            <span className="text-gray-700 text-sm">{tip}</span>
                        </li>
                    ))}
                </ul>
            </Card>
        </div>
    );
};


const MainPitchDetails = ({ showCopyNotification }) => {
    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        showCopyNotification();
    };

    const pitchStructureContent = `🔸 AUTHORITY ESTABLISHMENT:
"I'm reaching out and building partnerships, which is why I wanted to share that I'm in charge of public relations for Blockchain Summit LATAM"

🔸 EVENT POSITIONING:
"We're hosting an event in Medellín, Colombia focused on regulators and central banks"

🔸 INSTITUTIONAL CREDIBILITY:
"We have confirmed Central Banks of Colombia, Brazil, Mexico, and Chile, with possible participation from Central Banks of Germany, Guatemala, and Dominican Republic"

🔸 CORPORATE SOCIAL PROOF:
"Additionally, we have major institutional players like BlackRock, JP Morgan Colombia, Bancolombia, and Banco Popular, among others."`;
    
    const referralBlurbContent = `// For the internal contact (e.g., Julián)
Hi Julián,

I'm connecting you with [CONTACT_NAME] from [COMPANY]. They are on the [COMMERCIAL_ROLE] front and are interested in the event's profile for this year. [COMPANY] is currently focused on [TOPIC_OF_INTEREST] and its [UNIQUE_BENEFIT].

// For the new lead (e.g., Gloria)
Hi [CONTACT_NAME],

As we discussed, I'm connecting you with Julián from the Blockchain Summit LATAM.

// Common closing for a group chat
Keeping the intro as simple as possible. Julián, over to you!`;

    const bdeVariations = {
        corporate: `🔸 AUTHORITY: I'm [YOUR_NAME], Business Development Executive at [YOUR_COMPANY]\n\n🔸 PARTNERSHIP ANGLE: We have a strategic alliance with Blockchain Summit LATAM 2025, the most important institutional blockchain event in the region\n\n🔸 EXCLUSIVE ACCESS: We've secured preferential access for our key partners to network with Central Banks of Colombia, Brazil, Mexico, and Chile\n\n🔸 CORPORATE VALIDATION: BlackRock, JP Morgan, and major financial institutions will be present\n\nThis could be a unique opportunity for [COMPANY_NAME] to establish direct relationships with regulators and blockchain ecosystem leaders in LATAM.`,
        startup: `🔸 INTRO: I'm [YOUR_NAME], I specialize in connecting innovative startups with international growth opportunities\n\n🔸 OPPORTUNITY: I'm curating an exclusive selection of companies for Blockchain Summit LATAM 2025 - imagine direct networking with 4+ Central Banks\n\n🔸 STARTUP FOCUS: This isn't another boring corporate event - it's where game-changing startups connect with the regulators who define the rules\n\n🔸 VALIDATION: BlackRock and JP Morgan already confirmed - this means the institutional ecosystem is paying serious attention\n\nIs [COMPANY_NAME] ready to be part of the conversation that's defining the future of blockchain in LATAM?`,
        financial: `🔸 CREDENTIALS: I'm reaching out from [YOUR_COMPANY] where I lead institutional relationships for the blockchain and fintech sector\n\n🔸 REGULATORY FOCUS: I have the privilege of coordinating financial institution participation in Blockchain Summit LATAM 2025\n\n🔸 CENTRAL BANK ACCESS: This event offers something unique: direct access to regulators from Colombia, Brazil, Mexico, and Chile in a structured networking format\n\n🔸 INSTITUTIONAL VALIDATION: The confirmation of BlackRock and JP Morgan Colombia validates the strategic importance of this gathering\n\nFor [COMPANY_NAME], this represents an exceptional opportunity to influence the emerging regulatory framework and establish key relationships in the LATAM market.`
    };

    const proTips = [
        { title: "Non-Negotiable Timing", text: "ALWAYS wait 2-3 minutes after the greeting. This is crucial for building rapport and showing respect. It's not optional." },
        { title: "The Winning Sequence", text: "The pitch structure (Authority -> Positioning -> Credibility -> Social Proof) is proven. Follow it exactly for maximum impact." },
        { title: "Adapt Your Angle", text: "Emphasize the LATAM focus for regional prospects, but highlight the international scope (e.g., German Central Bank) for global companies." },
        { title: "Adapt Your Authority", text: "If you're a BDE or agent, use the variations to establish your credibility. You're a strategic partner, not just a salesperson." },
        { title: "Always End with a Question", text: "Your message must end with a question (e.g., 'Would you be interested in learning more?'). This prompts a response and moves the conversation forward." }
    ];

    return (
        <div className="mt-4 space-y-6">
            <DetailTemplate 
                title="🎯 Complete Main Pitch Structure" 
                content={pitchStructureContent} 
                onCopy={() => handleCopy(pitchStructureContent)} 
            />
            <Card title="🔄 BDE Traditional Variations" icon="👔">
                <DetailTemplate title="💼 Corporate BDE Version" content={bdeVariations.corporate} onCopy={() => handleCopy(bdeVariations.corporate)} />
                <DetailTemplate title="🌟 Startup BDE Version" content={bdeVariations.startup} onCopy={() => handleCopy(bdeVariations.startup)} />
                <DetailTemplate title="🏦 Financial Services BDE" content={bdeVariations.financial} onCopy={() => handleCopy(bdeVariations.financial)} />
            </Card>
            <Card title="🤝 Referral / KOL Introduction Blurb" icon="🔗" className="bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-500">
                <DetailTemplate
                    title="Example Blurb for WhatsApp/Email"
                    content={referralBlurbContent}
                    onCopy={() => handleCopy(referralBlurbContent)}
                />
            </Card>
             <Card title="💡 Pro Tips for Main Pitch" icon="🧠" className="bg-gradient-to-br from-sky-50 to-blue-100 border-sky-500">
                <ul className="space-y-3">
                    {proTips.map((tip, index) => (
                        <li key={index}>
                            <strong className="text-gray-800">{tip.title}:</strong>
                            <span className="text-gray-700 ml-1">{tip.text}</span>
                        </li>
                    ))}
                </ul>
            </Card>
        </div>
    );
};

const SendOverviewEmailDetails = ({ showCopyNotification }) => {
    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        showCopyNotification();
    };

    const emailTemplate = `Subject: Exclusive Blockchain Summit LATAM 2025 Partnership Opportunity

Hi [PROSPECT_NAME],

[Start with a personalized paragraph about the prospect and their company. Reference their background, recent achievements, or company initiatives. Show you've done your research. Use the Pro-Tips below for guidance.]

---

📌 **Why I'm Reaching Out**

We're building the most institutionally robust edition of the Summit to date. A key pillar is a series of regional activations across Latin America, designed to connect platforms like yours with influential audiences: fintech associations, business guilds, universities, legal and accounting firms, chambers of commerce, and regulators.

We are looking for:
• Direct Sponsors
• Strategic Referrals (Funds, Projects, Institutions)
• High-level Institutional or Technical Speakers
• Academic, Association, or Regulatory Allies

🔔 **Note:** Panel spaces are primarily reserved for paying sponsors or high-value profiles arriving through a co-sponsoring referral pipeline.

---

🧠 **Blockchain Summit LATAM 2025 – At a Glance**

• **📍 Medellín, Colombia**
• **📅 November 12, 13 & 14, 2025**
• **🎓 Academic Partner:** Universidad EAFIT (Top 3 in Colombia)
• **🏛️ Focus:** Regulation, central banks, financial infrastructure, tokenization, and institutional adoption.

---

✅ **Confirmed Participation**

• **Central Banks:** Colombia, Brazil, Mexico, Chile
• **International:** Bank for International Settlements (BIS) confirmed. In talks with Germany, Guatemala, and Dominican Republic.
• **Regulatory:** Colombian Financial Superintendence (SFC), Asobancaria
• **Institutional:** BlackRock, JP Morgan, Bancolombia, Banco Popular. In talks with VanEck.

---

🌐 **Distinguished Academics & International Delegations**

• **Juan Carlos Reyes** – President, National Digital Assets Commission (CNAD) of El Salvador
• **Prof. Alfredo Muñoz García** – Grant Thornton Europe / Complutense University of Madrid (Remote)
• **María del Sagrario Navarro** – University of Castilla-La Mancha, INATBA
• **Dr. Steffen Härting** – Deloitte Germany, Crypto Asset Markets
• **Ana Elisa de Iparraguirre** – Brickken / National University of Rosario
• **Carlos Salinas** – MoraBanc, Head of Digital Assets and Fintech
• **Sebastián Zapata Veira** – Externado University / Bitso
• **The Walker Group** – Ex-Citigroup executives

---

🗓️ **Thematic Structure by Day**

• **Day 1:** Total focus on regulators, central banks, and top traditional institutional actors.
• **Day 2:** Intersection between traditional finance (TradFi) and emerging technologies.
• **Day 3:** Full DeFi, community, protocols, and adoption.

---

🤝 **Regional Alliance Network**

We are working with a growing network of chambers to co-organize activations and build a regional Blockchain & Fintech Chamber.
• **Confirmed:** Blockchain Chamber of Chile, Paraguayan Blockchain Chamber, Blockchain Chamber of Guatemala, Asoblockchain Colombia.
• **In advanced talks with:** Fintech Chamber of Panama, Asoblockchain Peru, Blockchain Association of Bolivia, Fintech Chamber of Argentina.

---

🏆 **NEW FOR 2025: Regional Awards & Media Partnership**

• **Regional Awards:** Alongside our allied chambers, we will host the first regional awards ceremony. Example categories include:
  - 🏅 **With Blockchain Chambers:** Best CEX, Best Web3 Infrastructure, Best RWA Tokenization, Best DID Solution, Best Web3 Education Initiative, Web3 Startup of the Year.
  - 💳 **With Fintech Chambers:** Best Payments Fintech, Best Digital Onboarding/KYC, Best Retail Investment Platform, Best Fintech-Web3 Integration, Most Innovative Bank in Digital Assets.
• **Official Media Partner: Negocios TV**
We've partnered exclusively with Negocios TV, the first Spanish-language financial channel broadcasting live from the NYSE floor. With over 2 million users across Ibero-America, it has become one of the most influential voices in Spanish-speaking markets.
  • **📈 Global #1:** In February 2025, Negocios TV ranked #1 globally in YouTube views among financial media, surpassing CNN, Fox Business, and Bloomberg Markets.
  • **🔗 More Info:** [Link to Press/Info Page]

---

🌎 **Regional Activations – LATAM & Hash House Medellín**

In addition to the main event, we are developing pre-event activations in major cities (Bogotá, Lima, Santiago, San José, Buenos Aires) in partnership with local chambers, universities, and business associations.

**Activation Formats:**
• Tech meetups and platform showcases
• Panels with accounting, legal, notarial, registry, and economic guilds
• Networking rounds with chambers of commerce and business associations
• Sessions with RegTech, PayTech, and RWA leaders
• Meetings with foreign trade guilds, importers/exporters, and real estate associations
• Educational spaces with universities and technical training centers

In Medellín, these activities are developed in partnership with Hash House, the most active Web3 hub in the city.

---

🗓 **Next Step**

Would you be open to a brief 15-30 minute discovery call to explore how [COMPANY_NAME] could get involved, either directly or through strategic referrals?

You can book a time that works for you directly here: [YOUR_BOOKING_LINK]

Thanks again for your time and for the leadership you've shown in [THEIR_INDUSTRY].

Best regards,

[YOUR_NAME]
[YOUR_TITLE]`;

    const proTips = [
        { title: "Research is Key", text: "Before sending, spend 5 minutes on the prospect's LinkedIn profile. Look at their 'About' section, recent posts, and past 3-4 job experiences." },
        { title: "Company Context", text: "Also, read the 'About' page of their current company to understand their mission and latest news." },
        { title: "Craft the Perfect Opening", text: "Use your research to write a unique, personalized opening paragraph. Compliment a recent project, mention a shared connection, or connect their work to the event's theme. This shows you're not just spamming." },
        { title: "Paste and Send", text: "Once you have your personalized opening, paste the rest of this standardized template below it." }
    ];

    return (
        <div className="mt-4 space-y-6">
            <DetailTemplate
                title="Comprehensive Overview Email Template"
                content={emailTemplate}
                onCopy={() => handleCopy(emailTemplate)}
            />
            <Card title="💡 Pro Tips for Personalization" icon="✍️" className="bg-gradient-to-br from-yellow-50 to-orange-50 border-brand-accent-yellow">
                 <ul className="space-y-3">
                    {proTips.map((tip, index) => (
                        <li key={index}>
                            <strong className="text-gray-800">{tip.title}:</strong>
                            <span className="text-gray-700 ml-1">{tip.text}</span>
                        </li>
                    ))}
                </ul>
            </Card>
        </div>
    );
};

const HighValueRescueDetails = ({ showCopyNotification }) => {
    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        showCopyNotification();
    };

    const emailTemplate = `Subject: One last idea for [Prospect Company] & Blockchain Summit LATAM

Hi [PROSPECT_NAME],

I'm writing one last time before I close the file on my end. I’m convinced there's a powerful opportunity here and wanted to share one final, concrete thought.

[Insert your deep research here. Example: "I was reading your company's Q4 report where your CEO, [CEO_NAME], emphasized the strategic priority of expanding into new regulated markets. This aligns perfectly with what we are building."]

---

💡 **An Idea to Spark a Conversation...**

What if we built a high-profile panel specifically around [Prospect Company]'s interests?

For example, I just confirmed a powerhouse panel for our regulatory track featuring:
*   **Carlos Salinas** (Head of Digital Assets, MoraBanc Andorra)
*   **María del Sagrario Navarro** (LegalTech Expert, University of Castilla-La Mancha)
*   **Dr. Steffen Härting** (Senior Executive, Crypto Asset Markets at Deloitte)

They will be discussing "Regulatory entry requirements for the provision of crypto-asset services," with perspectives on:
*   Institutional frameworks and licensing regimes
*   Gaps and gray areas in MiCA
*   DeFi platforms and regulatory blind spots
*   Practical implementation from the banking sector

**The angle is: let's co-create a high-impact panel around a topic you're passionate about. You bring the vision, and I'll bring the high-level partners to make it happen.**

---

This is the level of conversation we're curating. Discussions with other key players in the [prospect's industry] sector are already advancing.

Is this a priority for you right now? If so, my calendar is open for a brief, direct conversation.

Best regards,

[YOUR_NAME]`;

    const proTips = [
        { title: "Exhaustive Research", text: "This isn't just a LinkedIn glance. Read their latest quarterly report, find press releases, or watch a recent interview with their CEO. Find a direct quote or a stated company goal to reference." },
        { title: "The Creative Proposal", text: "The custom panel idea is a 'pattern interrupt.' It shows you are a creator and a connector, not just a salesperson. It reframes the conversation from 'buying a sponsorship' to 'co-creating value'." },
        { title: "The Competitor Angle (FOMO)", text: "Subtly mentioning 'discussions with other key players in their industry' creates urgency and social proof. It implies the train is leaving the station, with or without them." },
        { title: "Top-Down Pressure", text: "By aligning your pitch with a publicly stated goal from their CEO or a quarterly report, you make it much harder for your contact to ignore. You're not just pitching an event; you're offering a solution to a company-wide priority." },
        { title: "The Power of Finality", text: "A confident 'willingness to walk away' (e.g., 'before I close the file') can often trigger a response from a prospect who has been procrastinating. It's a professional and respectful way to ask for a final decision." }
    ];

    return (
        <div className="mt-4 space-y-6">
            <DetailTemplate
                title="Assertive 'High-Value Rescue' Email Template"
                content={emailTemplate}
                onCopy={() => handleCopy(emailTemplate)}
            />
            <Card title="💡 Pro-Tips for Advanced Re-engagement" icon="🚀" className="bg-gradient-to-br from-red-50 to-orange-100 border-red-500">
                <ul className="space-y-3">
                    {proTips.map((tip, index) => (
                        <li key={index}>
                            <strong className="text-gray-800">{tip.title}:</strong>
                            <span className="text-gray-700 ml-1">{tip.text}</span>
                        </li>
                    ))}
                </ul>
            </Card>
        </div>
    );
};

const DiscoveryMeetingDetails = () => {
    const agenda = [
        "Event overview and vision (5 min)",
        "Deep dive into confirmed attendees and speakers (5 min)",
        "Understand prospect's strategic objectives & KPIs (10 min)",
        "Align summit's value proposition with their goals (5 min)",
        "Secure commitment for a follow-up proposal meeting with key stakeholders (5 min)"
    ];
    return (
        <div className="mt-4 space-y-4">
            <Card title="Meeting Agenda" icon="🗓️">
                <ul className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                    {agenda.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
            </Card>
            <Card title="💡 Key Objectives" icon="🎯">
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                    <li>Build rapport and establish trust with the initial contact.</li>
                    <li>Uncover the prospect's primary marketing/business goals for the next year.</li>
                    <li>Demonstrate how the summit's audience and access align with their goals.</li>
                    <li>The primary goal is NOT to sell, but to secure a second meeting with decision-makers.</li>
                </ul>
            </Card>
        </div>
    );
};

const SponsorshipProposalMeetingDetails = () => {
     const agenda = [
        "Recap of discovery call findings and agreed objectives (5 min)",
        "Presentation of 2-3 tailored sponsorship packages with pricing (10 min)",
        "Detailed breakdown of ROI, lead generation, and branding benefits (10 min)",
        "Qualify budget and decision-making process (5 min)",
        "Discuss customization, handle objections, and finalize package (10 min)",
        "Define clear next steps for contract review and signing (5 min)"
    ];
    return (
        <div className="mt-4 space-y-4">
            <Card title="Presentation Agenda" icon="📊">
                <ul className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                    {agenda.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
            </Card>
             <Card title="💡 Key Objectives" icon="🎯">
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
                    <li>Present a compelling business case, not just a list of features.</li>
                    <li>This meeting is typically held with a senior stakeholder (like the CEO or CMO).</li>
                    <li>Clearly demonstrate how sponsorship solves their problems or helps them reach their goals.</li>
                    <li>Handle pricing and budget objections with confidence.</li>
                    <li>Gain commitment to move forward with a specific package or a final decision timeline.</li>
                </ul>
            </Card>
        </div>
    );
};

export const CustomerJourneyTab = ({ showCopyNotification }: { showCopyNotification: (message?: string) => void; }) => {
    const [selectedPoint, setSelectedPoint] = useState(null);
    const [animationIndex, setAnimationIndex] = useState(-1);

    const waveData = useMemo(() => {
        const height = 300;
        const centerY = height / 2;
        const amplitude = 60;
        const bifurcationOffsetY = 70;

        const pointsWithCoords = touchpoints.map(point => {
            let y = centerY;
            switch(point.mood) {
                case 'peak': y = centerY - amplitude; break;
                case 'positive': y = centerY - amplitude * 0.6; break;
                case 'positive-alt': y = centerY - amplitude * 0.4; break;
                case 'neutral': y = centerY; break;
                case 'urgent': y = centerY + amplitude * 0.5; break;
                default: y = centerY;
            }
            if (point.id === 8) { // LinkedIn path is lower
                y += bifurcationOffsetY;
            }
            return { ...point, y };
        });

        const getPathSegment = (start, end) => ` C ${start.x + (end.x - start.x) * 0.3},${start.y} ${start.x + (end.x - start.x) * 0.7},${end.y} ${end.x},${end.y}`;

        const find = (id: number) => pointsWithCoords.find(p => p.id === id);

        const p1 = find(1), p2 = find(2), p3 = find(3), p4 = find(4), p5 = find(5), p6 = find(6), p7 = find(7), p8 = find(8);
        const p9 = find(9), p10 = find(10), p11 = find(11), p12 = find(12), p13 = find(13);
        
        const mainPath1 = `M 0,${centerY} L ${p1.x},${p1.y}` + getPathSegment(p1, p2) + getPathSegment(p2, p3);
        const emailPath = `M ${p3.x},${p3.y}` + getPathSegment(p3, p4) + getPathSegment(p4, p5) + getPathSegment(p5, p6) + getPathSegment(p6, p7) + getPathSegment(p7, p9);
        const linkedinPath = `M ${p3.x},${p3.y}` + getPathSegment(p3, p8);
        const mainPath2 = `M ${p9.x},${p9.y}` + getPathSegment(p9, p10) + getPathSegment(p10, p11) + getPathSegment(p11, p12) + getPathSegment(p12, p13);
        
        // Arrow from p8 (LinkedIn Ask) to p4 (Send Email)
        const arrow = {
            x1: p8.x,
            y1: p8.y - 10, // Start slightly above the circle
            x2: p4.x + 10, // End slightly to the right of the circle
            y2: p4.y,
        };

        return { pointsWithCoords, mainPath1, emailPath, linkedinPath, mainPath2, arrow };
    }, []);
    
    const handlePointClick = useCallback((point: any) => {
        setSelectedPoint(point);
    }, []);

    const handleReset = useCallback(() => {
        setSelectedPoint(null);
        setAnimationIndex(-1);
    }, []);

    const handleAnimate = useCallback(() => {
        handleReset();
        touchpoints.forEach((point, index) => {
            setTimeout(() => {
                setAnimationIndex(index);
                setSelectedPoint(point);
            }, index * 800);
        });
        setTimeout(() => setAnimationIndex(-1), touchpoints.length * 800);
    }, [handleReset]);


    const renderDetails = (point: any) => {
         if (!point) {
            return (
                <div>
                    <h4 className="font-bold text-lg text-brand-primary-dark">📍 Touchpoint Details</h4>
                    <p className="text-gray-600 mt-2">Click on any point in the wave to see detailed information about that stage of the customer journey.</p>
                </div>
            );
        }
        
        let specificContent;
        switch(point.id) {
            case 1:
                specificContent = <InitialGreetingDetails showCopyNotification={showCopyNotification} />;
                break;
            case 2:
                specificContent = <MainPitchDetails showCopyNotification={showCopyNotification} />;
                break;
            case 3:
                specificContent = <ResponseQualificationDetails showCopyNotification={showCopyNotification} />;
                break;
            case 4:
                specificContent = <SendOverviewEmailDetails showCopyNotification={showCopyNotification} />;
                break;
            case 5:
                specificContent = <ConfirmEmailSentDetails showCopyNotification={showCopyNotification} />;
                break;
            case 6:
                specificContent = <DayFourFollowupDetails variant="email" showCopyNotification={showCopyNotification} />;
                break;
            case 7:
                specificContent = <ConfirmFollowupSentDetails showCopyNotification={showCopyNotification} />;
                break;
            case 8:
                specificContent = <DayFourFollowupDetails variant="linkedin" showCopyNotification={showCopyNotification} />;
                break;
            case 9:
                specificContent = <HighValueRescueDetails showCopyNotification={showCopyNotification} />;
                break;
            case 11:
                specificContent = <DiscoveryMeetingDetails />;
                break;
            case 12:
                specificContent = <SponsorshipProposalMeetingDetails />;
                break;
            case 10:
            case 13:
                 specificContent = <DetailTemplate title="Details" content={point.description} onCopy={() => { navigator.clipboard.writeText(point.template); showCopyNotification(); }} preformatted={false}/>
                 break;
            default:
                specificContent = <DetailTemplate title="Example Message" content={"Template coming soon..."} />
                break;
        }
        
        return (
            <div>
                <h4 className="font-bold text-lg text-brand-primary-dark flex items-center gap-2">📍 {point.name} <span className="text-sm font-normal text-gray-500">- {point.timing}</span></h4>
                <p className="text-gray-600 mt-2"><strong>Objective:</strong> {point.description}</p>
                {specificContent}
            </div>
        );
    };
    
    return (
        <div className="space-y-8">
            <Card title="Customer Journey Wave" icon="🌊">
                <p>This interactive journey map shows the natural flow of prospect engagement over time. Each touchpoint represents a carefully timed interaction designed to build trust and move toward conversion.</p>
                <p className="mt-2"><strong>Key Feature:</strong> Day 4 shows a <Highlight>dual-channel approach</Highlight> - Email follow-up for prospects who gave email, LinkedIn follow-up for those who haven't yet.</p>
            </Card>

            <Card className="p-2 sm:p-4 overflow-x-auto">
                 <svg id="journeyWave" width="1150" height="300" viewBox="0 0 1150 300" className="min-w-[1150px]">
                     <defs>
                        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#667eea" />
                            <stop offset="50%" stopColor="#2a5298" />
                            <stop offset="100%" stopColor="#764ba2" />
                        </linearGradient>
                         <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="8" refY="3.5" orient="auto" fill="#0077b5">
                            <polygon points="0 0, 10 3.5, 0 7" />
                        </marker>
                    </defs>
                    <path d={waveData.mainPath1} fill="none" stroke="url(#waveGradient)" strokeWidth="4" />
                    <path d={waveData.emailPath} fill="none" stroke="url(#waveGradient)" strokeWidth="4" />
                    <path d={waveData.linkedinPath} fill="none" stroke="url(#waveGradient)" strokeWidth="4" strokeDasharray="5, 5" />
                    <path d={waveData.mainPath2} fill="none" stroke="url(#waveGradient)" strokeWidth="4" />
                    {/* Reconnect Arrow */}
                    <line 
                        x1={waveData.arrow.x1} y1={waveData.arrow.y1} 
                        x2={waveData.arrow.x2} y2={waveData.arrow.y2} 
                        stroke="#0077b5" strokeWidth="2" strokeDasharray="4, 4" 
                        markerEnd="url(#arrowhead)"
                    />


                     {waveData.pointsWithCoords.map((p, index) => {
                         const isSelected = selectedPoint?.id === p.id;
                         const isAnimating = animationIndex === index;
                         return (
                            <g key={p.id} className="cursor-pointer" onClick={() => handlePointClick(p)}>
                                <circle 
                                    cx={p.x} 
                                    cy={p.y} 
                                    r={isAnimating ? 14 : (isSelected ? 12 : 8)}
                                    className={`stroke-white transition-all duration-300 ${isSelected ? 'fill-brand-accent-green' : 'fill-brand-primary'}`}
                                    strokeWidth={isAnimating || isSelected ? 4 : 3}
                                />
                                <text x={p.x} y={p.y - 20} textAnchor="middle" className="text-xs font-semibold fill-gray-700 pointer-events-none">{p.name}</text>
                                <text x={p.x} y={p.y + 25} textAnchor="middle" className="text-[10px] fill-gray-500 pointer-events-none">{p.timing}</text>
                            </g>
                         );
                     })}
                </svg>
            </Card>

            <div className="flex justify-center gap-4">
                <Button onClick={handleAnimate} variant="success">▶️ Animate Journey</Button>
                <Button onClick={handleReset} variant="warning">🔄 Reset</Button>
            </div>

            <Card className={`transition-all duration-300 ${selectedPoint ? 'bg-gradient-to-br from-indigo-50 to-purple-50 border-brand-secondary' : ''}`}>
                {renderDetails(selectedPoint)}
            </Card>
        </div>
    );
};