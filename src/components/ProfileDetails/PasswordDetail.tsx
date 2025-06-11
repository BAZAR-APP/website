import Button from "../Button/Button"
import CommonInput from "../CommonInput/Input"

const PasswordDetail = () => {

    const handleSubmit = () => { }
    const handlePasswordChange = () => { }

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-[32px]">
                <div>
                    <CommonInput
                        name="password"
                        label="Old Password"
                        className={'bg-[#F9FAFB]'}
                        onChange={handlePasswordChange}
                        type="password"
                    />
                </div>
                <div>
                    <CommonInput
                        name="password"
                        label="New Password"
                        className={'bg-[#F9FAFB]'}
                        onChange={handlePasswordChange}
                        type="password"
                    />
                </div>
                <div>
                    <CommonInput
                        name="password"
                        label="Confirm New Password"
                        className={'bg-[#F9FAFB]'}
                        onChange={handlePasswordChange}
                        type="password"
                    />
                </div>
                <div className="flex gap-4 mt-8">
                    <Button
                        type="submit"
                        className="w-full h-[48px] !bg-[#F3F4F6] !text-[#1F2A37] gap-2 pt-3 pr-5 pb-3 pl-5 rounded-lg text-base disabled:opacity-50 whitespace-nowrap"
                    >
                        Forget Password
                    </Button>
                    <Button
                        type="submit"
                        className="w-full h-[48px] bg-[#29397E] text-white gap-2 pt-3 pr-5 pb-3 pl-5 rounded-lg text-base disabled:opacity-50"
                    >
                        Save Password
                    </Button>
                </div>
            </form>
        </>
    )
}

export default PasswordDetail