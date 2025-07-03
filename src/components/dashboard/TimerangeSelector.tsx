import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { StatsRange } from '@/types/Stats';
import { Clock } from 'lucide-react';

interface TimerangeSelectorProps {
  currentRange: StatsRange;
  onRangeChange: (range: StatsRange) => void;
  variant?: 'primary' | 'secondary';
}

const rangeLabels: Record<StatsRange, string> = {
  DAILY: 'Daily',
  WEEKLY: 'Weekly',
  MONTHLY: 'Monthly',
  YEARLY: 'Yearly',
};

export default function TimerangeSelector({
  currentRange,
  onRangeChange,
  variant = 'secondary',
}: TimerangeSelectorProps) {
  const baseClasses =
    variant === 'primary'
      ? 'bg-white/20 hover:bg-white/30 border-white/30 text-white hover:text-white'
      : 'bg-black/10 hover:bg-black/20 border-black/20 text-black/70 hover:text-black/80 dark:bg-white/10 dark:hover:bg-white/20 dark:border-white/20 dark:text-white/70 dark:hover:text-white/80';

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleRangeChange = (range: StatsRange) => {
    onRangeChange(range);
  };

  return (
    <div onClick={handleClick}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={`absolute bottom-2 right-2 h-6 px-2 text-xs ${baseClasses} backdrop-blur-sm transition-all duration-300`}
          >
            <Clock className="h-3 w-3 mr-1" />
            {rangeLabels[currentRange]}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-24">
          {Object.entries(rangeLabels).map(([range, label]) => (
            <DropdownMenuItem
              key={range}
              onClick={() => handleRangeChange(range as StatsRange)}
              className={currentRange === range ? 'bg-accent' : ''}
            >
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
