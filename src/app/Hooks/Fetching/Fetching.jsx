'use client'
import GoHome from 'app/Components/Buttons/GoHome';
import Card from 'app/Components/cards/Card';
import Pagination from 'app/Components/Paginations/Pagination';
import ApiServices from 'app/services/ApiServices';
import { useCallback, useEffect, useState } from 'react';

const Fetching = (apiUrl) => {
  const [data, setData] = useState([]);
  const [maxPages, setMaxPages] = useState(1);
  const [page, setPage] = useState(1);

  const apiService = new ApiServices(apiUrl);

  useEffect(() => {
      const fetchTotalPages = async () => {
          try {
              const totalPages = await apiService.getTotalPages();
              setMaxPages(totalPages);
          } catch (error) {

          }
      };
      fetchTotalPages();
  }, [apiService]);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const data = await apiService.fetchData(page);
              setData(data);
          } catch (error) {

          } 
      };
      fetchData();
  }, [page, apiService]);

  const handlePageChange = useCallback((newPage) => {
      setPage((prevPage) => {
          const validPage = Math.min(Math.max(newPage, 1), maxPages);
          return validPage !== prevPage ? validPage : prevPage;
      });
  }, [maxPages]);

  return (
    <div>
      <header className="flex flex-row sticky top-0 border border-b-green-400 bg-white w-full justify-between">
        <GoHome />
        <h1 className="text-xl p-2 text-center text-black font-bold">Data Fetching</h1>
        <span className="badge p-2 font-medium">Página {page} de {maxPages}</span> 
      </header>
        <Card dataRender={data} />
        <Pagination page={page}  onPageChange={handlePageChange} /> 
    </div>
  );
};

export default Fetching;
