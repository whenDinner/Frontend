import React from 'react';

interface PaginationProps {
  currentPage: number,
  totalPages: number,
  onPageChange: Function
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  // 페이지 번호 배열 생성
  const pageNumbers = [];
  for (let i = 0; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination">
      {pageNumbers.map(number => (
        <li
          key={number}
          className={currentPage === number ? 'active' : ''}
          onClick={() => onPageChange(number)}
        >
          {number + 1}
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
