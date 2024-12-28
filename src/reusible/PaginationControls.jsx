

import Pagination from 'react-bootstrap/Pagination';



export default function PaginationControls({ currentPage, totalPages, pageS, setCurrentPage }) {



    const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

    return (
        <>
            <div className="justify-between mt-4 d-flex">
                <div>
                    <span className='text-sm md:text-lg'>
                        Showing {totalPages} to {pageS} of {currentPage} entries   </span>
                </div>
                <Pagination className='ml-5 custom-pagination' >
                    <Pagination.First
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                    />
                    <Pagination.Prev
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                    />
                    <Pagination.Item active
                        className="text-white"
                    >{currentPage}</Pagination.Item>
                    <Pagination.Next
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                    />
                    <Pagination.Last
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                    />
                </Pagination>
            </div>
        </>
    );
};

