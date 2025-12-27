'use client';
import { ProgressCalendar } from '@/components/progress-calendar';

export default function ProgressPage() {
    return (
        <main className="flex min-h-screen flex-col items-center bg-background p-4 sm:p-6">
            <ProgressCalendar />
        </main>
    );
}
