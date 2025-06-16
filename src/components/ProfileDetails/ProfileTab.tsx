// components/Tabs.tsx
import React from "react";
import clsx from "clsx";

interface TabItem {
    id: string;
    label: string;
}

interface TabsProps {
    tabs: TabItem[];
    activeTab: string;
    onTabClick: (id: string) => void;
}


const ProfileTabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabClick }) => {
    return (
        <div className="flex flex-wrap gap-4">
            {tabs.map((tab) => {
                const isActive = tab.id === activeTab;
                return (
                    <button
                        key={tab.id}
                        onClick={() => onTabClick(tab.id)}
                        className={clsx(
                            "h-[38px] px-[18px] flex items-center justify-center rounded-[12px] border text-[14px] cursor-pointer font-medium whitespace-nowrap",
                            {
                                "bg-[#29397e] text-white border-transparent": isActive,
                                "bg-white text-[#344054] border-[#D0D5DD]": !isActive,
                            }
                        )}
                    >
                        {tab.label}
                    </button>
                );
            })}
        </div>
    );
};

export default ProfileTabs;
