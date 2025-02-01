// app/admin/components/StatusBadge.tsx
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: 'pending' | 'approved' | 'rejected';
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const variants = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    approved: "bg-green-100 text-green-800 border-green-200",
    rejected: "bg-red-100 text-red-800 border-red-200"
  };

  return (
    <Badge variant="outline" className={`${variants[status]} px-3 py-1`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};