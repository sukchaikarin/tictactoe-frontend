import React, { useEffect, useState } from 'react';
import { Tabs, Table, Typography, Spin } from 'antd';
import CustomPagination from '../CustomPagination';
import { STATISTICLABEL } from '../../constants/constants'; 
import { LeaderBoardService } from '@/_service/leaderboard';
import { useUser } from '@/context/UserContext'; // Import the UserContext
const { Title } = Typography;

interface User {
  key: string; // Unique identifier for the user
  name: string; // Name of the user
  scores: number; // Use 'scores' to match the API response
}

interface TopWinner {
  key: string; // Unique identifier for the winner
  name: string; // Name of the winner
  maxWinsStreak: number; // Number of consecutive wins
}

interface ScoreAndWinTabsProps {
  language: 'en' | 'th'; 
}

const ScoreAndWinTabs: React.FC<ScoreAndWinTabsProps> = ({ language }) => {
  const [scorerPage, setScorerPage] = useState(1);
  const [winnerPage, setWinnerPage] = useState(1); // For max wins streak
  const [winners, setWinners] = useState<TopWinner[]>([]);
  const [scorers, setScorers] = useState<User[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [winnerTotalPages, setWinnerTotalPages] = useState(0); // Total pages for winners
  const [loading, setLoading] = useState(true);
  const pageSize = 5;
  const { win, draw, lose ,gameStats} = useUser();
  // Fetch leaderboard scores
  const fetchLeaderboardData = async () => {
    setLoading(true);
    try {
      const { users, totalPages } = await LeaderBoardService.getLeaderboardScores(scorerPage);
      const updatedUsers = users.map((user) => ({
        key: user._id,
        name: user.name,
        scores: user.scores,
      }));

      setScorers(updatedUsers);
      setTotalPages(totalPages);
    } catch (error) {
      console.error('Error fetching leaderboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch max wins streak
  const fetchMaxWinsStreakData = async () => {
    setLoading(true);
    try {
      const { users, totalPages } = await LeaderBoardService.getLeaderboardStreak(winnerPage);
      const updatedWinners = users.map((user) => ({
        key: user._id,
        name: user.name,
        maxWinsStreak: user.maxWinsStreak,
      }));

      setWinners(updatedWinners);
      setWinnerTotalPages(totalPages);
    } catch (error) {
      console.error('Error fetching max wins streak data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboardData();
  }, [scorerPage,win,draw,lose,gameStats]);

  useEffect(() => {
    fetchMaxWinsStreakData();
  }, [winnerPage,win,draw,lose,gameStats]);

  const handleScorerPageChange = (page: number) => {
    setScorerPage(page);
  };

  const handleWinnerPageChange = (page: number) => {
    setWinnerPage(page);
  };

  const columnsScorers = [
    { title: STATISTICLABEL.name[language], dataIndex: 'name', key: 'name', width: '50%' },
    { title: STATISTICLABEL.score[language], dataIndex: 'scores', key: 'scores', width: '50%' },
  ];

  const columnsWinners = [
    { title: STATISTICLABEL.name[language], dataIndex: 'name', key: 'name', width: '50%' },
    { title: STATISTICLABEL.consecutiveWins[language], dataIndex: 'maxWinsStreak', key: 'maxWinsStreak', width: '50%' },
  ];

  return (
    <div className="p-5 bg-white rounded-lg shadow-lg w-full mt-10">
      <Title level={2} className="text-center text-xl mb-4">{STATISTICLABEL.leaderBoard[language]}</Title>
      <Tabs defaultActiveKey="1" className="mb-4" items={[
        {
          key: '1',
          label: STATISTICLABEL.topScorers[language],
          children: (
            <div className="flex flex-col">
              {loading ? (
                <Spin size="large" className="flex justify-center" />
              ) : (
                <>
                  <Table
                    dataSource={scorers}
                    columns={columnsScorers}
                    pagination={false}
                    bordered
                    className="rounded-lg overflow-hidden"
                  />
                  <div className="flex justify-end mt-4">
                    <CustomPagination
                      current={scorerPage}
                      total={totalPages * pageSize}
                      pageSize={pageSize}
                      onPageChange={handleScorerPageChange}
                    />
                  </div>
                </>
              )}
            </div>
          ),
        },
        {
          key: '2',
          label: STATISTICLABEL.topWinners[language],
          children: (
            <div className="flex flex-col">
              {loading ? (
                <Spin size="large" className="flex justify-center" />
              ) : (
                <>
                  <Table
                    dataSource={winners}
                    columns={columnsWinners}
                    pagination={false}
                    bordered
                    className="rounded-lg overflow-hidden"
                  />
                  <div className="flex justify-end mt-4">
                    <CustomPagination
                      current={winnerPage}
                      total={winnerTotalPages * pageSize}
                      pageSize={pageSize}
                      onPageChange={handleWinnerPageChange}
                    />
                  </div>
                </>
              )}
            </div>
          ),
        },
      ]} />
    </div>
  );
};

export default ScoreAndWinTabs;
