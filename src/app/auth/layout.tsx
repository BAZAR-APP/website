import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen flex px-4">
            <>
                this is commone auth layout
            </>
            {children}
        </div>
    );
};

export default AuthLayout;
