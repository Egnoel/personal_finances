import { Card, CardContent } from '@/components/ui/card';

export function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="bg-gray-50 border-none animate-pulse">
          <CardContent className="h-24 p-6"></CardContent>
        </Card>
      ))}
    </div>
  );
}
