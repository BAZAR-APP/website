import * as React from "react";
import {
    unstable_OneTimePasswordField as OTPField,
} from "@radix-ui";

const OneTimePassword = () => (
    <OTPField.Root className="OTPRoot">
        <OTPField.Input className="OTPInput" />
        <OTPField.Input className="OTPInput" />
        <OTPField.Input className="OTPInput" />
        <OTPField.Input className="OTPInput" />
        <OTPField.Input className="OTPInput" />
        <OTPField.Input className="OTPInput" />
        <OTPField.HiddenInput />
    </OTPField.Root>
);

export default OneTimePassword;
