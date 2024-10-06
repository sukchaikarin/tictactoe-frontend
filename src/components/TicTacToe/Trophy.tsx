"use client";

import React from 'react';
import { Tooltip } from 'antd';
import { StarOutlined, TrophyOutlined } from '@ant-design/icons';
import { useUser } from '@/context/UserContext';

const StreakDisplay = () => {
  const { gameStats } = useUser();
  
  return (
    <div className="flex items-center w-full">
      <div className='flex flex-col justify-center w-full'>
        <div className='flex items-center  w-full p-2'>
          <span className='text-2xl text-gray-10' style={{ fontWeight: 'bold' }}>Streak: </span>
          <div className='flex gap-1'>
            {Array.from({ length: gameStats.streak }).map((_, index) => (
              <Tooltip title="Win" key={index}>
                <StarOutlined style={{ color: 'gold', fontSize: '56px' }} />
              </Tooltip>
            ))}
          </div>
        </div>
        
        <div className='flex flex-col mt-2 p-2'>
          <span className='text-2xl text-gray-10' style={{ fontWeight: 'bold' }}>High Streak:</span>
          <div className='flex flex-wrap mt-2 gap-2'>
            {Array.from({ length: gameStats.highStreak }).map((_, index) => (
              <div key={index} className='flex  items-center mb-1' >
                <Tooltip title="Win">
                  <TrophyOutlined style={{ color: 'gold', fontSize: '48px' }} />
                </Tooltip>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreakDisplay;
