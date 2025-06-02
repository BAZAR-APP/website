"use client"

import { Verified } from "@/components"
import { useRouter } from "next/navigation";


const ChangePasswordVerified = () => {
    const router = useRouter();

    const handleContinue = () => {
        router.push('/dashboard');
    };

    const handleChange = () => { }

    return (

        <Verified title={"Password Created Successfully"} message={"Your new password is set. You can now log in to your account."} buttonLabel={"Go to Login"} onButtonClick={handleContinue} />
    );
}

export default ChangePasswordVerified;