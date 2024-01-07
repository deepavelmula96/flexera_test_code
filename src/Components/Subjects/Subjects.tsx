import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import './Subjects.css';

interface SubjectData {
    owner: {
        avatar_url: string;
    };
    full_name: string;
    description: string;
}

const Subjects: React.FC = () => {
    const [listOfSubjects, setListOfSubjects] = useState<SubjectData[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const subjectsPerPage = 10;
    const maxPages = Math.ceil(listOfSubjects.length / subjectsPerPage);
    const [flag, setFlag] = useState<boolean>(true);
    useEffect(() => {
        axios.get(`https://api.github.com/search/repositories?sort=stars&q=javascript&page=${currentPage}`)
            .then((res: AxiosResponse<any>) => setListOfSubjects(res?.data?.items))
            .catch((err: any) => console.log("Subjects_listOfUsers_get_api_err", err));
    }, [currentPage]);

    const nextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, maxPages));
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const indexOfLastSubject = currentPage * subjectsPerPage;
    const indexOfFirstSubject = indexOfLastSubject - subjectsPerPage;
    const currentSubjects = listOfSubjects.slice(indexOfFirstSubject, indexOfLastSubject);

    return (
        <div className="subjects-container">
             <div className="pagination">
                <button className="pagination-button" onClick={prevPage} disabled={currentPage === 1}>
                    &lt; Prev
                </button>
                <span>{currentPage}</span>
                <button className="pagination-button" onClick={nextPage} disabled={currentPage === maxPages}>
                    Next &gt;
                </button>
            </div>
            <h1>Subjects</h1>
            {currentSubjects.map((subjectData: SubjectData, index: number) => (
                <div className="subject-box" key={index}>
                    {flag ? <button className="add-button" type="button" onClick={() => setFlag(false)}>+</button> :
                        <button className="add-button" type="button" onClick={() => setFlag(true)}>-</button>}
                    <img src={subjectData?.owner?.avatar_url} alt="GitHub Avatar" />
                    <div className="subject-info">
                        <p>Full Name: {subjectData?.full_name}</p>
                        <p>Description: {subjectData?.description}</p>
                    </div>
                </div>
            ))}
           
        </div>
    );
};

export default Subjects;
