'use client';
import { Recipes } from '@/components/recipes';

export default function RecipesPage() {
    return (
        <main className="flex min-h-screen flex-col items-center bg-background p-4 sm:p-6">
            <Recipes />
        </main>
    );
}
