import { UserProgress } from '../context/UserDataContext';
import { motion } from 'framer-motion';
import ProgressBar from './ProgressBar';
import { Link } from 'react-router-dom';
import { Award, ExternalLink } from 'lucide-react';

interface UserProgressCardProps {
  userData: UserProgress;
  milestoneLevel: number;
}

const UserProgressCard = ({ userData, milestoneLevel }: UserProgressCardProps) => {
  const getMilestoneClassName = (level: number) => {
    switch (level) {
      case 1: return 'bg-primary-600';
      case 2: return 'bg-warning-500';
      case 3: return 'bg-accent-600';
      case 4: return 'bg-success-500';
      default: return 'bg-gray-400';
    }
  };

  const getMilestoneText = (level: number) => {
    switch (level) {
      case 1: return 'Milestone 1: On a Streak! 🔥';
      case 2: return 'Milestone 2: On Fire! 💥';
      case 3: return 'Milestone 3: Unstoppable! ✨';
      case 4: return 'Milestone 4: True Legend! 😍';
      default: return 'No milestone achieved yet';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="card"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{userData.name}</h2>
          <p className="text-gray-600">{userData.email}</p>
        </div>
        <div className={`flex items-center px-4 py-2 rounded-full text-white mt-4 sm:mt-0 ${getMilestoneClassName(milestoneLevel)}`}>
          <Award size={18} className="mr-2" />
          <span>{milestoneLevel > 0 ? `Level ${milestoneLevel}` : 'No Level'}</span>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        <div>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-gray-800 mb-1">University</h3>
            <p>{userData.university}</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-gray-800 mb-1">Qwiklabs Profile</h3>
            <a 
              href={userData.qwiklabsUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-800 flex items-center"
            >
              View Profile <ExternalLink size={14} className="ml-1" />
            </a>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-1">Enrollment Status</h3>
            <div className="flex items-center">
              <span className={`inline-block w-2 h-2 rounded-full mr-2 ${
                userData.enrollmentStatus === 'Enrolled' ? 'bg-success-500' : 'bg-error-500'
              }`}></span>
              <span>{userData.enrollmentStatus}</span>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Progress</h3>
            <ProgressBar 
              completed={userData.questsCompleted} 
              total={30} 
              label="Quests Completed" 
              color="bg-primary-600" 
            />
            <ProgressBar 
              completed={userData.skillBadgesCompleted} 
              total={15} 
              label="Skill Badges Completed" 
              color="bg-accent-600" 
            />
          </div>
          
          <div className={`p-4 rounded-lg ${milestoneLevel > 0 ? 'bg-success-50' : 'bg-warning-50'}`}>
            <h3 className="font-semibold text-gray-800 mb-1">
              {milestoneLevel > 0 ? 'Milestone Achieved!' : 'No Milestone Achieved'}
            </h3>
            <p className={`${milestoneLevel > 0 ? 'text-success-800' : 'text-warning-800'}`}>
              {getMilestoneText(milestoneLevel)}
            </p>
            
            {milestoneLevel > 0 && (
              <Link 
                to="/badge-generator" 
                className="btn-primary inline-block mt-3 text-sm"
              >
                Generate Badge
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserProgressCard;