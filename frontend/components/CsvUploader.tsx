import { FC, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/redux/store";
import { uploadCsv, fetchCsvFiles } from "@/app/redux/actions/reduxCsvActions";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface UploadCsvProps {
  onLoadingChange: (loading: boolean) => void;
}

const UploadCsv: FC<UploadCsvProps> = ({ onLoadingChange }) => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [messageT, setMessageT] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [variant, setVariant] = useState<"destructive" | "default" | null>(
    null
  );
  const [show, setShow] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      setShow(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      setVariant("destructive");
      setMessageT("Algo deu errado.");
      setMessage("Certifique-se de que enviou o arquivo correto.");
      setShow(true);
      return;
    }

    setIsLoading(true);
    onLoadingChange(true);
    setMessage(null);
    setMessageT(null);
    setProgress(0);
    setTimeout(() => {
      setProgress(33);
      setTimeout(() => {
        setProgress(70);
      }, 1000);
    }, 1000);

    try {
      await dispatch(uploadCsv(file));
      setFile(null);

      await dispatch(fetchCsvFiles());

      setProgress(100);
      setVariant("default");
      setMessageT("Arquivo enviado com sucesso!");
      setMessage(
        "Seu arquivo foi enviado com sucesso e está sendo processado na tabela abaixo."
      );
    } catch (error) {
      console.error(error);
    } finally {
      setTimeout(() => {
        setProgress(100);
        setTimeout(() => {
          setIsLoading(false);
          onLoadingChange(false);
        }, 1000);
      }, 1000);
      setShow(true);
    }
  };

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [show]);

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex items-end gap-2 justify-center mt-20 mb-10"
      >
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="csvFile">Selecione o seu arquivo Csv</Label>
          <Input id="csvFile" type="file" onChange={handleFileChange} />
        </div>
        <Button variant="secondary">Enviar</Button>
      </form>
      {isLoading && (
        <Progress
          value={progress}
          className="w-[100%] my-10 mx-auto transition-all duration-500 ease-in-out"
        />
      )}

      {show && variant && (
        <Alert variant={variant} className="w-[100%] my-10 mx-auto">
          <Terminal className="h-4 w-4" />
          <AlertTitle>{messageT}</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default UploadCsv;
