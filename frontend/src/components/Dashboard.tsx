import React, { useState } from 'react';
import { getCodeforcesProfile, getLeetcodeProfile } from '../services/api';
import type { CodeforcesProfile, LeetcodeProfile } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Award, Code, Search } from 'lucide-react';

const Dashboard = () => {
  const [codeforcesHandle, setCodeforcesHandle] = useState('');
  const [leetcodeUsername, setLeetcodeUsername] = useState('');
  const [cfProfile, setCfProfile] = useState<CodeforcesProfile | null>(null);
  const [lcProfile, setLcProfile] = useState<LeetcodeProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (codeforcesHandle) {
        const cfData = await getCodeforcesProfile(codeforcesHandle);
        setCfProfile({
          handle: cfData.handle,
          rating: cfData.rating,
          rank: cfData.rank,
          maxRating: cfData.maxRating,
          maxRank: cfData.maxRank
        });
        //   handle: string;
        //   rating: number;
        //   rank: string;
        //   maxRating: number;
        //   maxRank: string;
        // }
      }
      if (leetcodeUsername) {
        const lcData = await getLeetcodeProfile(leetcodeUsername);
        setLcProfile({
          username: lcData.username,
          totalSolved: lcData.submitStatsGlobal.acSubmissionNum[0].count,
          easySolved: lcData.submitStatsGlobal.acSubmissionNum[1].count,
          mediumSolved: lcData.submitStatsGlobal.acSubmissionNum[2].count,
          hardSolved: lcData.submitStatsGlobal.acSubmissionNum[3].count
        });
        // console.log(lcProfile)
      }
    } catch (err) {
      setError('Failed to fetch profile data');
    } finally {
      setIsLoading(false);
    }
  };
  // console.log(lcProfile)
  const leetcodeProblemData = [
    { name: 'Easy', value: lcProfile?.easySolved || 0 },
    { name: 'Medium', value: lcProfile?.mediumSolved || 0 },
    { name: 'Hard', value: lcProfile?.hardSolved || 0 },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Profile Analysis</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="codeforces" className="block text-sm font-medium text-gray-700">
              Codeforces Handle
            </label>
            <input
              type="text"
              id="codeforces"
              value={codeforcesHandle}
              onChange={(e) => setCodeforcesHandle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="leetcode" className="block text-sm font-medium text-gray-700">
              LeetCode Username
            </label>
            <input
              type="text"
              id="leetcode"
              value={leetcodeUsername}
              onChange={(e) => setLeetcodeUsername(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            <Search className="h-4 w-4 mr-2" />
            {isLoading ? 'Fetching...' : 'Analyze Profiles'}
          </button>
        </form>
      </div>

      {cfProfile && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-6">
            <Award className="h-6 w-6 text-indigo-600 mr-2" />
            <h2 className="text-2xl font-bold">Codeforces Profile</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Current Rating</p>
                <p className="text-2xl font-bold text-indigo-600">{cfProfile.rating}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Max Rating</p>
                <p className="text-xl font-semibold">{cfProfile.maxRating}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Rank</p>
                <p className="text-xl font-semibold">{cfProfile.rank}</p>
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={[{ rating: cfProfile.maxRating }, { rating: cfProfile.rating }]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="rating" stroke="#4f46e5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {lcProfile && (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-6">
            <Code className="h-6 w-6 text-indigo-600 mr-2" />
            <h2 className="text-2xl font-bold">LeetCode Profile</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Total Problems Solved</p>
                <p className="text-2xl font-bold text-indigo-600">{lcProfile.totalSolved}</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Easy</p>
                  <p className="text-xl font-semibold text-green-600">{lcProfile.easySolved}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Medium</p>
                  <p className="text-xl font-semibold text-yellow-600">{lcProfile.mediumSolved}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Hard</p>
                  <p className="text-xl font-semibold text-red-600">{lcProfile.hardSolved}</p>
                </div>
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={leetcodeProblemData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#4f46e5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;