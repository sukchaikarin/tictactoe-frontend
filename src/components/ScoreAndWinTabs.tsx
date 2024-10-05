import React, { useState } from 'react';
import { Tabs, Table, Typography } from 'antd';
import CustomPagination from './CustomPagination';
import { STATISTICLABEL } from '../constants/constants'; // นำเข้า STATISTICLABEL

const { TabPane } = Tabs;
const { Title } = Typography;

interface TopScorer {
  key: string;
  name: string;
  score: number;
}

interface TopWinner {
  key: string;
  name: string;
  consecutiveWins: number;
}

// ข้อมูลตัวอย่าง
const topScorers: TopScorer[] = [
  { key: '1', name: 'Alice', score: 95 },
  { key: '2', name: 'Bob', score: 90 },
  { key: '3', name: 'Charlie', score: 85 },
  { key: '4', name: 'David', score: 80 },
  { key: '5', name: 'Eva', score: 75 },
  { key: '6', name: 'Frank', score: 70 },
];

const topWinners: TopWinner[] = [
  { key: '1', name: 'George', consecutiveWins: 6 },
  { key: '2', name: 'Hannah', consecutiveWins: 5 },
  { key: '3', name: 'Ian', consecutiveWins: 4 },
  { key: '4', name: 'Jane', consecutiveWins: 3 },
  { key: '5', name: 'Kyle', consecutiveWins: 2 },
];

// รับ props language
interface ScoreAndWinTabsProps {
  language: 'en' | 'th'; // ระบุชนิดข้อมูลสำหรับภาษา
}

const ScoreAndWinTabs: React.FC<ScoreAndWinTabsProps> = ({ language }) => {
  const [scorerPage, setScorerPage] = useState(1);
  const [winnerPage, setWinnerPage] = useState(1);
  const pageSize = 5; // จำนวนข้อมูลต่อหน้า

  // ฟังก์ชันจัดการการเปลี่ยนหน้า
  const handleScorerPageChange = (page: number) => {
    setScorerPage(page);
  };

  const handleWinnerPageChange = (page: number) => {
    setWinnerPage(page);
  };

  // คอลัมน์สำหรับคะแนนสูงสุด
  const columnsScorers = [
    { title: STATISTICLABEL.name[language], dataIndex: 'name', key: 'name', width: '50%' }, // ปรับขนาด
    { title: STATISTICLABEL.score[language], dataIndex: 'score', key: 'score', width: '50%' }, // ปรับขนาด
  ];

  // คอลัมน์สำหรับผู้ชนะติดต่อกัน
  const columnsWinners = [
    { title: STATISTICLABEL.name[language], dataIndex: 'name', key: 'name', width: '50%' }, // ปรับขนาด
    { title: STATISTICLABEL.consecutiveWins[language], dataIndex: 'consecutiveWins', key: 'consecutiveWins', width: '50%' }, // ปรับขนาด
  ];

  // แบ่งข้อมูลตามหน้า
  const paginatedScorers = topScorers.slice((scorerPage - 1) * pageSize, scorerPage * pageSize);
  const paginatedWinners = topWinners.slice((winnerPage - 1) * pageSize, winnerPage * pageSize);

  return (
    <div className="p-5 bg-white rounded-lg shadow-lg w-full mt-10">
      <Title level={2} className="text-center text-xl mb-4">{STATISTICLABEL.gameStatistics[language]}</Title>
      <Tabs defaultActiveKey="1" className="mb-4">
        <TabPane tab={STATISTICLABEL.topScorers[language]} key="1">
          <div className="flex flex-col">
            <Table
              dataSource={paginatedScorers}
              columns={columnsScorers}
              pagination={false}
              bordered
              className="rounded-lg overflow-hidden"
            />
            <div className="flex justify-end mt-4">
              <CustomPagination
                current={scorerPage}
                total={topScorers.length}
                pageSize={pageSize}
                onPageChange={handleScorerPageChange}
              />
            </div>
          </div>
        </TabPane>

        <TabPane tab={STATISTICLABEL.topWinners[language]} key="2">
          <div className="flex flex-col">
            <Table
              dataSource={paginatedWinners}
              columns={columnsWinners}
              pagination={false}
              bordered
              className="rounded-lg overflow-hidden"
            />
            <div className="flex justify-end mt-4">
              <CustomPagination
                current={winnerPage}
                total={topWinners.length}
                pageSize={pageSize}
                onPageChange={handleWinnerPageChange}
              />
            </div>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ScoreAndWinTabs;
