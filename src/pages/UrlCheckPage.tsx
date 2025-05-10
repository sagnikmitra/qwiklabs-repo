import { useState } from 'react';
import { motion } from 'framer-motion';
import { useUserData } from '../context/UserDataContext';
import UserProgressCard from '../components/UserProgressCard';
import MilestoneCard from '../components/MilestoneCard';
import { milestoneRequirements } from '../data/mockData';
import { AlertCircle, Search, Loader } from 'lucide-react';

const UrlCheckPage = () => {
  const [url, setUrl] = useState('');
  const [userData, setUserData] = useState<null | any>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const { getUserByUrl, getUserMilestoneLevel, isLoading, setIsLoading } = useUserData();

  const handleSearch = () => {
    if (!url.trim()) return;
    
    const user = getUserByUrl(url);
    setUserData(user);
    setHasSearched(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const milestoneLevel = userData ? getUserMilestoneLevel(userData.questsCompleted, userData.skillBadgesCompleted) : 0;

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="heading-2 mb-6">Check Your Progress by Qwiklabs URL</h1>
        
        <div className="card mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-grow">
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                Enter Your Qwiklabs Public URL
              </label>
              <input
                type="text"
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Enter your Qwiklabs public profile URL"
                className="input"
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="btn-primary flex items-center justify-center min-w-[120px] h-10 mt-4 md:mt-0"
            >
              {isLoading ? (
                <Loader className="animate-spin" size={20} />
              ) : (
                <>
                  <Search size={18} className="mr-2" />
                  Search
                </>
              )}
            </button>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <p>For testing: Use "test" as the URL to see a demo profile</p>
          </div>
        </div>
      </motion.div>

      {hasSearched && !isLoading && (
        <>
          {userData ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <UserProgressCard userData={userData} milestoneLevel={milestoneLevel} />
              
              <h2 className="heading-3 my-8">Milestone Progress</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MilestoneCard
                  level={1}
                  name="First Milestone"
                  requiredQuests={milestoneRequirements.milestone1.quests}
                  requiredBadges={milestoneRequirements.milestone1.skillBadges}
                  completedQuests={userData.questsCompleted}
                  completedBadges={userData.skillBadgesCompleted}
                  isCompleted={userData.questsCompleted >= milestoneRequirements.milestone1.quests && 
                              userData.skillBadgesCompleted >= milestoneRequirements.milestone1.skillBadges}
                />
                
                <MilestoneCard
                  level={2}
                  name="Second Milestone"
                  requiredQuests={milestoneRequirements.milestone2.quests}
                  requiredBadges={milestoneRequirements.milestone2.skillBadges}
                  completedQuests={userData.questsCompleted}
                  completedBadges={userData.skillBadgesCompleted}
                  isCompleted={userData.questsCompleted >= milestoneRequirements.milestone2.quests && 
                              userData.skillBadgesCompleted >= milestoneRequirements.milestone2.skillBadges}
                />
                
                <MilestoneCard
                  level={3}
                  name="Third Milestone"
                  requiredQuests={milestoneRequirements.milestone3.quests}
                  requiredBadges={milestoneRequirements.milestone3.skillBadges}
                  completedQuests={userData.questsCompleted}
                  completedBadges={userData.skillBadgesCompleted}
                  isCompleted={userData.questsCompleted >= milestoneRequirements.milestone3.quests && 
                              userData.skillBadgesCompleted >= milestoneRequirements.milestone3.skillBadges}
                />
                
                <MilestoneCard
                  level={4}
                  name="Ultimate Milestone"
                  requiredQuests={milestoneRequirements.milestone4.quests}
                  requiredBadges={milestoneRequirements.milestone4.skillBadges}
                  completedQuests={userData.questsCompleted}
                  completedBadges={userData.skillBadgesCompleted}
                  isCompleted={userData.questsCompleted >= milestoneRequirements.milestone4.quests && 
                              userData.skillBadgesCompleted >= milestoneRequirements.milestone4.skillBadges}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center p-8 card"
            >
              <div className="flex flex-col items-center">
                <AlertCircle size={48} className="text-warning-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Results Found</h3>
                <p className="text-gray-600">No search results found for the URL "{url}".</p>
                <p className="text-gray-600 mt-2">Please check the Qwiklabs URL and try again.</p>
              </div>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default UrlCheckPage;