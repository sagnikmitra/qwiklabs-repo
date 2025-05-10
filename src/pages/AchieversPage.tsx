import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useUserData } from '../context/UserDataContext';
import { Trophy, Users, Award, Star } from 'lucide-react';

const AchieversPage = () => {
  const { getMilestoneAchievers } = useUserData();
  const [achievers, setAchievers] = useState({ 
    milestone1: [], 
    milestone2: [], 
    milestone3: [], 
    milestone4: [] 
  });
  
  useEffect(() => {
    const data = getMilestoneAchievers();
    setAchievers(data);
  }, []);
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="heading-2 mb-6">Milestone Achievers</h1>
        
        <div className="card mb-8">
          <div className="flex flex-col sm:flex-row items-center mb-6">
            <Trophy size={36} className="text-warning-500 mr-0 sm:mr-4 mb-4 sm:mb-0" />
            <div>
              <h2 className="text-xl font-bold">Achievement Leaderboard</h2>
              <p className="text-gray-600">
                Celebrating participants who have reached significant milestones in the program
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="card bg-success-50 border border-success-100"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-success-100 text-success-700">
                  <Award size={24} />
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-success-900">Ultimate Milestone</h3>
                  <p className="text-success-700 text-sm">30 Quests, 15 Skill Badges</p>
                </div>
              </div>
              
              {achievers.milestone4.length > 0 ? (
                <motion.ul 
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="space-y-2"
                >
                  {achievers.milestone4.map((name, index) => (
                    <motion.li 
                      key={`m4-${index}`} 
                      variants={item}
                      className="flex items-center py-2 px-3 bg-white rounded-lg border border-success-200"
                    >
                      <Star size={16} className="text-success-500 mr-2" />
                      <span>{name}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              ) : (
                <div className="text-center py-4 bg-white rounded-lg border border-success-200">
                  <p className="text-gray-500">No achievers yet</p>
                </div>
              )}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="card bg-accent-50 border border-accent-100"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-accent-100 text-accent-700">
                  <Award size={24} />
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-accent-900">Third Milestone</h3>
                  <p className="text-accent-700 text-sm">24 Quests, 12 Skill Badges</p>
                </div>
              </div>
              
              {achievers.milestone3.length > 0 ? (
                <motion.ul 
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="space-y-2"
                >
                  {achievers.milestone3.map((name, index) => (
                    <motion.li 
                      key={`m3-${index}`} 
                      variants={item}
                      className="flex items-center py-2 px-3 bg-white rounded-lg border border-accent-200"
                    >
                      <Star size={16} className="text-accent-500 mr-2" />
                      <span>{name}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              ) : (
                <div className="text-center py-4 bg-white rounded-lg border border-accent-200">
                  <p className="text-gray-500">No achievers yet</p>
                </div>
              )}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="card bg-warning-50 border border-warning-100"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-warning-100 text-warning-700">
                  <Award size={24} />
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-warning-900">Second Milestone</h3>
                  <p className="text-warning-700 text-sm">16 Quests, 8 Skill Badges</p>
                </div>
              </div>
              
              {achievers.milestone2.length > 0 ? (
                <motion.ul 
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="space-y-2"
                >
                  {achievers.milestone2.map((name, index) => (
                    <motion.li 
                      key={`m2-${index}`} 
                      variants={item}
                      className="flex items-center py-2 px-3 bg-white rounded-lg border border-warning-200"
                    >
                      <Star size={16} className="text-warning-500 mr-2" />
                      <span>{name}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              ) : (
                <div className="text-center py-4 bg-white rounded-lg border border-warning-200">
                  <p className="text-gray-500">No achievers yet</p>
                </div>
              )}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="card bg-primary-50 border border-primary-100"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-100 text-primary-700">
                  <Award size={24} />
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-primary-900">First Milestone</h3>
                  <p className="text-primary-700 text-sm">8 Quests, 4 Skill Badges</p>
                </div>
              </div>
              
              {achievers.milestone1.length > 0 ? (
                <motion.ul 
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="space-y-2"
                >
                  {achievers.milestone1.map((name, index) => (
                    <motion.li 
                      key={`m1-${index}`} 
                      variants={item}
                      className="flex items-center py-2 px-3 bg-white rounded-lg border border-primary-200"
                    >
                      <Star size={16} className="text-primary-500 mr-2" />
                      <span>{name}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              ) : (
                <div className="text-center py-4 bg-white rounded-lg border border-primary-200">
                  <p className="text-gray-500">No achievers yet</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
        
        <div className="card bg-gray-50">
          <div className="flex items-center mb-4">
            <Users size={24} className="text-primary-600 mr-3" />
            <h2 className="text-xl font-bold">Program Milestones</h2>
          </div>
          <p className="mb-4">
            The GoogleCloudReady Facilitator Program has four milestone levels that participants can achieve:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mr-2">
                  <span className="font-bold">1</span>
                </div>
                <h3 className="font-bold">First Milestone</h3>
              </div>
              <ul className="list-disc pl-10 text-sm">
                <li>Complete 8 quests</li>
                <li>Complete 4 skill badges</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-warning-100 text-warning-600 flex items-center justify-center mr-2">
                  <span className="font-bold">2</span>
                </div>
                <h3 className="font-bold">Second Milestone</h3>
              </div>
              <ul className="list-disc pl-10 text-sm">
                <li>Complete 16 quests</li>
                <li>Complete 8 skill badges</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-accent-100 text-accent-600 flex items-center justify-center mr-2">
                  <span className="font-bold">3</span>
                </div>
                <h3 className="font-bold">Third Milestone</h3>
              </div>
              <ul className="list-disc pl-10 text-sm">
                <li>Complete 24 quests</li>
                <li>Complete 12 skill badges</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-success-100 text-success-600 flex items-center justify-center mr-2">
                  <span className="font-bold">4</span>
                </div>
                <h3 className="font-bold">Ultimate Milestone</h3>
              </div>
              <ul className="list-disc pl-10 text-sm">
                <li>Complete 30 quests</li>
                <li>Complete 15 skill badges</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AchieversPage;