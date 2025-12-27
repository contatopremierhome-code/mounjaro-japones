'use client';
import { Routine } from '@/components/routine';
import { useParams } from 'next/navigation';

export default function RoutinePage() {
    const params = useParams();
    const routineId = params.routineId as string;
    
    return (
        <main className="flex min-h-screen flex-col items-center bg-background p-4 sm:p-6">
            <Routine routineId={routineId} />
        </main>
    );
}
