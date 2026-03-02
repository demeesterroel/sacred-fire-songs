'use client';

import { useSidebar } from '@/context/SidebarContext';

export default function MainContent({ children }: { children: React.ReactNode }) {
    const { isOpen, setIsOpen } = useSidebar();

    return (
        <div
            onClick={isOpen ? () => setIsOpen(false) : undefined}
            className={`flex-1 flex flex-col min-w-0 bg-gray-950 relative transition-transform duration-300 ease-in-out ${isOpen ? 'lg:translate-x-0 translate-x-[260px]' : 'translate-x-0'}`}
        >
            {children}
        </div>
    );
}
