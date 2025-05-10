import { motion } from 'framer-motion';

interface ProgressBarProps {
  completed: number;
  total: number;
  label: string;
  color?: string;
}

const ProgressBar = ({ 
  completed, 
  total, 
  label, 
  color = 'bg-primary-600' 
}: ProgressBarProps) => {
  const percentage = Math.min(Math.round((completed / total) * 100), 100);
  
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-medium text-gray-700">{completed}/{total}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <motion.div 
          className={`h-2.5 rounded-full ${color}`}
          style={{ width: '0%' }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      <div className="text-right mt-1">
        <span className="text-xs font-medium text-gray-500">{percentage}% completed</span>
      </div>
    </div>
  );
};

export default ProgressBar;