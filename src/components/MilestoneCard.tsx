import { motion } from 'framer-motion';
import React from 'react';
import { Award, CheckCircle, XCircle, Clock } from 'lucide-react';

interface MilestoneCardProps {
  level: number;
  name: string;
  requiredQuests: number;
  requiredBadges: number;
  completedQuests: number;
  completedBadges: number;
  isCompleted: boolean;
}

const MilestoneCard: React.FC<MilestoneCardProps> = ({
  level,
  name,
  requiredQuests,
  requiredBadges,
  completedQuests,
  completedBadges,
  isCompleted
}) => {
  // Calculate how many more quests and badges are needed
  const questsNeeded = Math.max(0, requiredQuests - completedQuests);
  const badgesNeeded = Math.max(0, requiredBadges - completedBadges);

  // Determine milestone colors
  const getBgColor = () => {
    switch (level) {
      case 1: return 'bg-gradient-to-br from-primary-500 to-primary-600';
      case 2: return 'bg-gradient-to-br from-warning-500 to-warning-600';
      case 3: return 'bg-gradient-to-br from-accent-500 to-accent-600';
      case 4: return 'bg-gradient-to-br from-success-500 to-success-600';
      default: return 'bg-gradient-to-br from-gray-500 to-gray-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: level * 0.1 }}
      className={`card overflow-hidden ${isCompleted ? 'border-2 border-success-500' : ''}`}
    >
      <div className={`absolute top-0 left-0 w-full h-1.5 ${getBgColor()}`}></div>
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full mr-4 ${getBgColor()} text-white`}>
            <Award size={20} />
          </div>
          <div>
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-sm text-gray-600">Level {level} Achievement</p>
          </div>
        </div>
        {isCompleted ? (
          <div className="flex items-center text-success-600">
            <CheckCircle size={20} className="mr-1" />
            <span className="text-sm font-medium">Completed</span>
          </div>
        ) : (
          <div className="flex items-center text-warning-600">
            <Clock size={20} className="mr-1" />
            <span className="text-sm font-medium">In Progress</span>
          </div>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-gray-600 text-sm">Required Quests</p>
          <p className="text-2xl font-bold">{requiredQuests}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <p className="text-gray-600 text-sm">Required Badges</p>
          <p className="text-2xl font-bold">{requiredBadges}</p>
        </div>
      </div>

      {!isCompleted && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium mb-2">What you need to complete:</h4>
          <div className="space-y-2">
            <div className="flex items-center">
              {questsNeeded > 0 ? (
                <XCircle size={18} className="text-error-500 mr-2" />
              ) : (
                <CheckCircle size={18} className="text-success-500 mr-2" />
              )}
              <span>
                {questsNeeded > 0
                  ? `${questsNeeded} more quests`
                  : 'Quests requirement met!'}
              </span>
            </div>
            <div className="flex items-center">
              {badgesNeeded > 0 ? (
                <XCircle size={18} className="text-error-500 mr-2" />
              ) : (
                <CheckCircle size={18} className="text-success-500 mr-2" />
              )}
              <span>
                {badgesNeeded > 0
                  ? `${badgesNeeded} more skill badges`
                  : 'Skill badges requirement met!'}
              </span>
            </div>
          </div>
        </div>
      )}

      {isCompleted && (
        <div className="mt-4 p-4 bg-success-50 text-success-800 rounded-lg">
          <h4 className="font-medium">Congratulations!</h4>
          <p>You've successfully completed this milestone!</p>
        </div>
      )}
    </motion.div>
  );
};

export default MilestoneCard;