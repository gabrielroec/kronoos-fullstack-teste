"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCsvFiles,
  fetchCsvFileById,
} from "./redux/actions/reduxCsvActions";
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
import { Button } from "@/components/ui/button";

const Page = () => {
  const [progress, setProgress] = useState<number>(0);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const { files, selectedFile, loading, error } = useSelector(
    (state: RootState) => state.csv
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(50);
  const [userSetLimit, setUserSetLimit] = useState(false);

  useEffect(() => {
    dispatch(fetchCsvFiles());
  }, [dispatch]);

  useEffect(() => {
    if (loading && !isUploading) {
      const interval = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 10 : prev));
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setProgress(100);
    }
  }, [loading, isUploading]);

  const handleFileSelect = (id: string) => {
    setSelectedFileId(id);
    dispatch(fetchCsvFileById(id));
    setCurrentPage(1);
    setProgress(0);
  };

  const handlePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleLimit = (newValue: string) => {
    const newLimit = parseInt(newValue, 10);
    setLimit(newLimit);
    setUserSetLimit(true);
    setCurrentPage(1);
  };

  const handleFilterChange = (hasFilters: boolean) => {
    if (hasFilters) {
      setLimit(selectedFile ? selectedFile.csvFileDatas.length : 0);
      setUserSetLimit(false);
    } else if (!userSetLimit) {
      setLimit(50);
    }
  };

  return (
    <div className="px-10">
      <div className="flex flex-col items-center justify-center">
        <UploadCsv onLoadingChange={setIsUploading} />{" "}
        {/* Passe a função para atualizar o estado */}
        <div className="w-fit">
          <Label>Arquivos recentes</Label>
          <div className="flex gap-2">
            {files.map((file: any) => (
              <Button
                key={file._id}
                onClick={() => handleFileSelect(file._id)}
                variant={file._id === selectedFileId ? "default" : "outline"}
              >
                {file.title}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {selectedFile && (
        <div className="my-4">
          <Label>Escolha a quantidade de itens por página</Label>
          <Select value={limit.toString()} onValueChange={handleLimit}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Items per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="50">10</SelectItem>
                <SelectItem value="100">20</SelectItem>
                <SelectItem value="257">50</SelectItem>
                <SelectItem value="530">100</SelectItem>
                {selectedFile.csvFileDatas.length > 0 && (
                  <SelectItem
                    value={selectedFile.csvFileDatas.length.toString()}
                  >
                    Mostrar todos
                  </SelectItem>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}

      {!isUploading && loading && (
        <div className="my-4">
          <Progress
            value={progress}
            className="w-full transition-all duration-500 ease-in-out"
          />
        </div>
      )}
      {error && <p>Error: {error}</p>}

      {selectedFile && (
        <CsvTable
          data={selectedFile.csvFileDatas.slice(
            (currentPage - 1) * limit,
            currentPage * limit
          )}
          setLimit={setLimit}
          total={selectedFile.csvFileDatas.length}
          onFilterChange={handleFilterChange}
        />
      )}

      <Pagination
        currentPage={currentPage}
        pages={Math.ceil((selectedFile?.csvFileDatas.length || 0) / limit)}
        onPageChange={handlePage}
      />
    </div>
  );
};

export default Page;
