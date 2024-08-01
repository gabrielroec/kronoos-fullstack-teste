"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCsvData } from "./redux/actions/reduxCsvActions";
import UploadCsv from "@/components/CsvUploader";
import CsvTable from "@/components/CsvTable";
import { RootState, AppDispatch } from "./redux/store";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Pagination } from "@/components/Pagination";
import { Progress } from "@/components/ui/progress";

const Page = () => {
  const [progress, setProgress] = useState<number>(0);

  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error, total, pages } = useSelector(
    (state: RootState) => state.csv
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [userSetLimit, setUserSetLimit] = useState(false);

  useEffect(() => {
    setProgress(0);
    dispatch(fetchCsvData(currentPage, limit));
  }, [dispatch, currentPage, limit]);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 10 : prev));
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setProgress(100);
    }
  }, [loading]);

  const handlePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleLimit = (newValue: string | number) => {
    setLimit(parseInt(newValue as string, 10));
    setUserSetLimit(true);
    setCurrentPage(1);
  };

  const handleFilterChange = (hasFilters: boolean) => {
    if (hasFilters) {
      setLimit(total);
      setUserSetLimit(false);
    } else if (!userSetLimit) {
      setLimit(50);
    }
  };

  return (
    <div className="px-10">
      <UploadCsv />
      <Label>Escolha a quantidade de itens por página</Label>
      <Select value={limit.toString()} onValueChange={handleLimit}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Items per page" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="50">10</SelectItem>
            <SelectItem value="100">20</SelectItem>
            <SelectItem value="150">30</SelectItem>
            {total > 0 && (
              <SelectItem value={total.toString()}>Mostrar todos</SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
      {loading && (
        <div className="my-4">
          <Progress value={progress} className="w-full" />
        </div>
      )}
      {error && <p>Error: {error}</p>}
      {data && (
        <CsvTable
          data={data}
          setLimit={setLimit}
          total={total}
          onFilterChange={handleFilterChange}
        />
      )}

      <Pagination
        currentPage={currentPage}
        pages={pages}
        onPageChange={handlePage}
      />
    </div>
  );
};
export default Page;
