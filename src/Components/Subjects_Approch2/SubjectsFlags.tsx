import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import './SubjectsFlags.css';
import Pagination from './Pagination';

interface SubjectData {
    owner: {
        avatar_url: string;
    };
    full_name: string;
    description: string;
    isPlus: boolean;
    id:number;
}

const SubjectsFlags: React.FC = () => {
    const [listOfSubjects, setListOfSubjects] = useState<SubjectData[]>([]);
    const [selectedPgNum, setSelectedPgNum] = useState<SubjectData[]>([]);
    const [pageNum, setPageNum] = useState(1); // Track the current page number

    const subjectsPerPage = 10;
    const maxPages = Math.ceil(listOfSubjects.length / subjectsPerPage);
    const [flag, setFlag] = useState<boolean>(true);

    useEffect(() => {
        axios.get('https://api.github.com/search/repositories?sort=stars&q=javascript')
            .then((res: AxiosResponse<any>) => {
                const initialData = res?.data.items.map((item: any) => ({
                    ...item,
                    isPlus: false, // New property to track + or - state
                }));
                setListOfSubjects(initialData);
                setSelectedPgNum(initialData.slice(0, subjectsPerPage));
            })
            .catch((err: any) => console.log("Subjects_listOfUsers_get_api_err", err));
    }, []);

    const handlePageNum = (pageNum: number) => {
        setSelectedPgNum(listOfSubjects.slice((pageNum * subjectsPerPage) - subjectsPerPage, pageNum * subjectsPerPage));
        setPageNum(pageNum); // Update the current page number
    }
    const handlePlusMinus = (id:any) => {
        const updatedData = listOfSubjects.map(item => {
            if (item.id === id) {
                return {
                    ...item,
                    isPlus: !item.isPlus, // Toggle the + or - state
                };
            }
            return item;
        });
        setListOfSubjects(updatedData);
        setSelectedPgNum(updatedData.slice((pageNum * 10) - 10, pageNum * 10));
    };
    return (
        <div className="subjects-container">
            <div className="pagination">
                <Pagination handlePageNum={handlePageNum} listOfSubjects={listOfSubjects} />
            </div>
            <h1>Subjects</h1>
            {selectedPgNum?.length > 0 && selectedPgNum.map((subjectData: SubjectData, index: number) => (
                <div className="subject-box" key={index}>
                     <button className="add-button" onClick={() => handlePlusMinus(subjectData.id)}>
                            {subjectData.isPlus ? "-" : "+"}
                        </button>
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

export default SubjectsFlags;
