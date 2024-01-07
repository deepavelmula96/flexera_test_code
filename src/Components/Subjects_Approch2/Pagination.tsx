import React from 'react';

interface PaginationProps {
  listOfSubjects: any[]; // Replace 'any' with the actual type of your listOfSubjects
  handlePageNum: (pageNum: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ listOfSubjects, handlePageNum }) => {
  let numOfPages: number[] = [];
  for (let i = 1; i < Math.ceil((listOfSubjects?.length || 0) / 10) + 1; i++) {
    numOfPages.push(i);
  }

  return (
    <div>
      <center>
        {numOfPages.map((eachpageNum) => (
          <span
            style={{
              border: '1px solid black',
              padding: '10px',
            }}
            key={eachpageNum}
            onClick={() => handlePageNum(eachpageNum)}
          >
            &nbsp;&nbsp;{eachpageNum} &nbsp;&nbsp;
          </span>
        ))}
      </center>
    </div>
  );
};

export default Pagination;
