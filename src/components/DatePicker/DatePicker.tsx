import { useState } from 'react';

const DatePicker: React.FC = () => {
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [showPicker, setShowPicker] = useState<boolean>(false);

    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndDate(e.target.value);
        setShowPicker(false);
    };

    const formattedDateRange = () => {
        if (startDate && endDate) {
            return `${new Date(startDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })} – ${new Date(endDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            })}`;
        }
        return '';
    };

    return (
        <div className="relative w-64">
            {/* Trigger Input */}
            <div
                onClick={() => setShowPicker(!showPicker)}
                className="flex items-center gap-2 p-2 border-2 border-gray-300 rounded-lg bg-white cursor-pointer"
            >
                <div
                    className="w-5 h-5 bg-cover bg-no-repeat"
                    style={{
                        backgroundImage:
                            "url('/images/calendar.svg')",
                    }}
                />
                <input
                    type="text"
                    value={formattedDateRange() || 'Select Date Range'}
                    readOnly
                    className="w-full bg-white text-sm !text-[#344054] font-[600] cursor-pointer focus:outline-none"
                />
            </div>

            {/* Popup Date Inputs */}
            {showPicker && (
                <div className="absolute top-full left-0 mt-2 p-3 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                    <div className="flex flex-col gap-2">
                        <input
                            type="date"
                            value={startDate}
                            onChange={handleStartDateChange}
                            className="border border-gray-300 rounded-md p-1 text-[#344054]"
                        />
                        <input
                            type="date"
                            value={endDate}
                            onChange={handleEndDateChange}
                            className="border border-gray-300 rounded-md p-1 text-[#344054]"
                        />
                        <button
                            onClick={() => setShowPicker(false)}
                            className="text-sm text-blue-600 underline self-end"
                        >
                            Done
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DatePicker;
