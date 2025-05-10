import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Award, Users, User } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="heading-1 mb-4">
          GoogleCloudReady Facilitator Program
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Track your progress, earn badges, and achieve milestones in the GoogleCloudReady Facilitator Program.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          whileHover={{ y: -5 }}
          className="card flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 mb-4">
            <Search size={28} />
          </div>
          <h2 className="text-xl font-bold mb-2">Check Progress</h2>
          <p className="text-gray-600 mb-6">
            Track your completed quests and skill badges to see your progress.
          </p>
          <Link to="/email-check" className="btn-primary mt-auto">
            Check by Email
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          whileHover={{ y: -5 }}
          className="card flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-warning-100 text-warning-600 mb-4">
            <User size={28} />
          </div>
          <h2 className="text-xl font-bold mb-2">Qwiklabs URL</h2>
          <p className="text-gray-600 mb-6">
            Use your Qwiklabs public profile URL to check your current progress.
          </p>
          <Link to="/url-check" className="btn-warning mt-auto">
            Check by URL
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          whileHover={{ y: -5 }}
          className="card flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-accent-100 text-accent-600 mb-4">
            <Award size={28} />
          </div>
          <h2 className="text-xl font-bold mb-2">Badge Generator</h2>
          <p className="text-gray-600 mb-6">
            Generate your achievement badge to share on social media.
          </p>
          <Link to="/badge-generator" className="btn-accent mt-auto">
            Create Badge
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileHover={{ y: -5 }}
          className="card flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-success-100 text-success-600 mb-4">
            <Users size={28} />
          </div>
          <h2 className="text-xl font-bold mb-2">Achievers</h2>
          <p className="text-gray-600 mb-6">
            View all participants who have reached various milestones.
          </p>
          <Link to="/achievers" className="btn-success mt-auto">
            View Achievers
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="card mt-8"
      >
        <h2 className="text-2xl font-bold mb-4">Program Milestones</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-primary-500">
              <h3 className="font-bold text-primary-600">Milestone 1</h3>
              <p className="text-gray-700 mt-2">Complete 8 quests and 4 skill badges</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-warning-500">
              <h3 className="font-bold text-warning-600">Milestone 2</h3>
              <p className="text-gray-700 mt-2">Complete 16 quests and 8 skill badges</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-accent-600">
              <h3 className="font-bold text-accent-700">Milestone 3</h3>
              <p className="text-gray-700 mt-2">Complete 24 quests and 12 skill badges</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-success-500">
              <h3 className="font-bold text-success-600">Ultimate Milestone</h3>
              <p className="text-gray-700 mt-2">Complete 30 quests and 15 skill badges</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="p-6 bg-gray-50 rounded-lg text-center"
      >
        <p className="text-gray-700">
          For testing the website, you can use the following data:
          <br />
          <span className="font-medium">Name: test ; Email: test ; University: test ; Profile Link: test</span>
        </p>
      </motion.div>
    </div>
  );
};

export default HomePage;