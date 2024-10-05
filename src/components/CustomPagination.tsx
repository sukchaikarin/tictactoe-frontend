// CustomPagination.tsx
import React from 'react';
import { Pagination } from 'antd';

interface CustomPaginationProps {
  current: number;
  total: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  current,
  total,
  pageSize,
  onPageChange,
}) => {
  return (
    <Pagination
      current={current}
      total={total}
      pageSize={pageSize}
      onChange={onPageChange}
      showSizeChanger={false}
    />
  );
};

export default CustomPagination;
