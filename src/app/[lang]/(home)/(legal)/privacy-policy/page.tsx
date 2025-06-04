
"use client"
import { DownloadApp, Privacy } from '@/components';
import { Download } from 'lucide-react';



export const PrivacyPolicyPage: React.FC = () => {
    return (
        <>
            <Privacy />
            <DownloadApp />
        </>
    );
};

export default PrivacyPolicyPage;
