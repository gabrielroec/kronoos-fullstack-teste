"use client";
import * as React from "react";
import { FC, useState, useEffect } from "react";
import { Label } from "./ui/label";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CsvTableProps {
  data: any[];
  setLimit: (value: number) => void;
  total: number;
  onFilterChange: (hasFilters: boolean) => void;
}

interface FilterChooses {
  nrInst?: string;
  nrAgencia?: string;
  cdClient?: string;
  nmClient?: string;
  nrCpfCnpj?: string;
  nrContrato?: string;
  cdProduto?: string;
  dsProduto?: string;
  cdCarteira?: string;
  dsCarteira?: string;
  nrProposta?: string;
  idSituac?: string;
  idSitVen?: string;
  dtContrato?: string;
  dtVctPre?: string;
}

const removeDuplicatedCsvData = (data: any[], keys: string[]) => {
  const seen = new Set();
  return data.filter((item) => {
    const keyValue = keys.map((key) => item[key]).join("-");
    if (seen.has(keyValue)) {
      return false;
    } else {
      seen.add(keyValue);
      return true;
    }
  });
};

const CsvTable: FC<CsvTableProps> = ({ data, onFilterChange }) => {
  const [filters, setFilters] = useState<FilterChooses>({});
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    let result = data.filter((item) =>
      Object.entries(filters).every(([key, value]) =>
        value
          ? item[key]?.toString().toLowerCase().includes(value.toLowerCase())
          : true
      )
    );
    result = removeDuplicatedCsvData(result, ["nrCpfCnpj", "nrContrato"]);
    setFilteredData(result);

    const hasFilters = Object.values(filters).some((value) => value);
    onFilterChange(hasFilters);
  }, [filters, data, onFilterChange]);

  const handleFilterChange = (field: keyof FilterChooses, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const tableRows = () => {
    return filteredData.map((item, index) => {
      const statusColor =
        item.installmentStatus === "Consistente"
          ? "text-green-500"
          : "text-yellow-500";

      const cpfCnpjColor = item.nrCpfCnpj.includes("Válido")
        ? "text-green-500"
        : "text-yellow-500";

      const sitVenColor = item.idSitVen.includes("Paga")
        ? "text-green-500"
        : "text-yellow-500";
      return (
        <tr key={index} className="hover:bg-gray-100">
          <td className="px-2 text-center py-2 border-b border-gray-200 text-xs">
            {item.nrInst}
          </td>
          <td className="px-2 text-center py-2 border-b border-gray-200 text-xs">
            {item.nrAgencia}
          </td>
          <td className="px-2 text-center py-2 border-b border-gray-200 text-xs">
            {item.cdClient}
          </td>
          <td className="px-2 text-center py-2 border-b border-gray-200 text-xs">
            {item.nmClient}
          </td>
          <td
            className={`px-2 text-center py-2 border-b border-gray-200 text-xs ${cpfCnpjColor}`}
          >
            {item.nrCpfCnpj}
          </td>
          <td className="px-2 text-center py-2 border-b border-gray-200 text-xs">
            {item.nrContrato}
          </td>
          <td className="px-2 text-center py-2 border-b border-gray-200 text-xs">
            {item.cdProduto}
          </td>
          <td className="px-2 text-center py-2 border-b border-gray-200 text-xs">
            {item.dsProduto}
          </td>
          <td className="px-2 text-center py-2 border-b border-gray-200 text-xs">
            {item.cdCarteira}
          </td>
          <td className="px-2 text-center py-2 border-b border-gray-200 text-xs">
            {item.dsCarteira}
          </td>
          <td className="px-2 text-center py-2 border-b border-gray-200 text-xs">
            {item.nrProposta}
          </td>
          <td className="px-2 text-center py-2 border-b border-gray-200 text-xs">
            {item.idSituac}
          </td>
          <td
            className={`px-2 text-center py-2 border-b border-gray-200 text-xs ${sitVenColor}`}
          >
            {item.idSitVen}
          </td>
          <td className="px-2 text-center py-2 border-b border-gray-200 text-xs">
            {item.qtPrestacoes}
          </td>
          <td className="px-2 text-center py-2 border-b border-gray-200 text-xs">
            {item.nrPresta}
          </td>
          <td className="px-2 text-center py-2 border-b border-gray-200 text-xs">
            {item.tpPresta}
          </td>
          <td className="px-2 text-center py-2 border-b border-gray-200 text-xs">
            {item.nrSeqPre}
          </td>
          <td className="px-2 text-center py-2 border-b border-gray-200 text-xs">
            {item.vlTotal}
          </td>
          <td className="px-2 text-center py-2 border-b border-gray-200 text-xs">
            {item.vlPresta}
          </td>
          <td className="px-2 text-center py-2 border-b border-gray-200 text-xs">
            {item.vlMora}
          </td>
          <td className="px-2 text-center py-2 border-b border-gray-200 text-xs">
            {item.vlMulta}
          </td>
          <td className="px-2 text-center py-2 border-b border-gray-200 text-xs">
            {item.vlOutAcr}
          </td>
          <td className="px-2 text-center py-2 border-b border-gray-200 text-xs">
            {item.vlIof}
          </td>
          <td className="px-2 text-center py-2 border-b border-gray-200 text-xs">
            {item.vlDescon}
          </td>
          <td className="px-2 text-center py-2 border-b border-gray-200 text-xs">
            {item.vlAtual}
          </td>
          <td
            className={`px-2 text-center py-2 border-b border-gray-200 text-xs ${statusColor}`}
          >
            {item.installmentStatus}
          </td>
          <td className="px-2 text-center py-2 border-b border-gray-200 text-xs">
            {item.dtContrato
              ? format(new Date(item.dtContrato), "dd/MM/yyyy")
              : ""}
          </td>
          <td className="px-2 text-center py-2 border-b border-gray-200 text-xs">
            {item.dtVctPre ? format(new Date(item.dtVctPre), "dd/MM/yyyy") : ""}
          </td>
        </tr>
      );
    });
  };
  return (
    <div className="mt-10">
      <div className="mb-4 flex flex-col gap-10">
        <Label>Filtrar por:</Label>
        <div className="flex items-center gap-4 ">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Nr Inst</Label>
            <Input
              type="text"
              placeholder="Nr Inst"
              onChange={(e) => handleFilterChange("nrInst", e.target.value)}
              className="text-sm p-1 border rounded"
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Nr Agência</Label>
            <Input
              type="text"
              placeholder="Nr Agência"
              onChange={(e) => handleFilterChange("nrAgencia", e.target.value)}
              className="text-sm p-1 border rounded"
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Dt Contrato</Label>
            <Input
              type="date"
              onChange={(e) => handleFilterChange("dtContrato", e.target.value)}
              className="text-sm p-1 border rounded"
            />
          </div>

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>Dt Vencimento Prestação</Label>
            <Input
              type="date"
              onChange={(e) => handleFilterChange("dtVctPre", e.target.value)}
              className="text-sm p-1 border rounded"
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto shadow-md mt-10">
        <table className="min-w-full leading-normal rounded-lg overflow-hidden">
          <thead className="bg-gray-100 p-4">
            <tr>
              <th className="px-2 text-center py-3 border-b-2 border-gray-200 text-gray-800 text-xs uppercase font-bold">
                Nr Inst
              </th>
              <th className="px-2 text-center py-3 border-b-2 border-gray-200 text-gray-800 text-xs uppercase font-bold">
                Nr Agência
              </th>
              <th className="px-2 text-center py-3 border-b-2 border-gray-200 text-gray-800 text-xs uppercase font-bold">
                Cd Cliente
              </th>
              <th className="px-2 text-center py-3 border-b-2 border-gray-200 text-gray-800 text-xs uppercase font-bold">
                Nome Cliente
              </th>
              <th className="px-2 text-center py-3 border-b-2 border-gray-200 text-gray-800 text-xs uppercase font-bold">
                CPF/CNPJ
              </th>
              <th className="px-2 text-center py-3 border-b-2 border-gray-200 text-gray-800 text-xs uppercase font-bold">
                Nr Contrato
              </th>
              <th className="px-2 text-center py-3 border-b-2 border-gray-200 text-gray-800 text-xs uppercase font-bold">
                Cd Produto
              </th>
              <th className="px-2 text-center py-3 border-b-2 border-gray-200 text-gray-800 text-xs uppercase font-bold">
                Ds Produto
              </th>
              <th className="px-2 text-center py-3 border-b-2 border-gray-200 text-gray-800 text-xs uppercase font-bold">
                Cd Carteira
              </th>
              <th className="px-2 text-center py-3 border-b-2 border-gray-200 text-gray-800 text-xs uppercase font-bold">
                Ds Carteira
              </th>
              <th className="px-2 text-center py-3 border-b-2 border-gray-200 text-gray-800 text-xs uppercase font-bold">
                Nr Proposta
              </th>
              <th className="px-2 text-center py-3 border-b-2 border-gray-200 text-gray-800 text-xs uppercase font-bold">
                Id Situação
              </th>
              <th className="px-2 text-center py-3 border-b-2 border-gray-200 text-gray-800 text-xs uppercase font-bold">
                Id Situação Venda
              </th>
              <th className="px-2 text-center py-3 border-b-2 border-gray-200 text-gray-800 text-xs uppercase font-bold">
                Qtde Prestações
              </th>
              <th className="px-2 text-center py-3 border-b-2 border-gray-200 text-gray-800 text-xs uppercase font-bold">
                Nr Prestação
              </th>
              <th className="px-2 text-center py-3 border-b-2 border-gray-200 text-gray-800 text-xs uppercase font-bold">
                Tipo Prestação
              </th>
              <th className="px-2 text-center py-3 border-b-2 border-gray-200 text-gray-800 text-xs uppercase font-bold">
                Nr Seq Prestação
              </th>
              <th className="px-2 text-center py-3 border-b-2 border-gray-200 text-gray-800 text-xs uppercase font-bold">
                Valor Total
              </th>
              <th className="px-2 text-center py-3 border-b-2 border-gray-200 text-gray-800 text-xs uppercase font-bold">
                Valor Prestação
              </th>
              <th className="px-2 text-center py-3 border-b-2 border-gray-200 text-gray-800 text-xs uppercase font-bold">
                Valor Mora
              </th>
              <th className="px-2 text-center py-3 border-b-2 border-gray-200 text-gray-800 text-xs uppercase font-bold">
                Valor Multa
              </th>
              <th className="px-2 text-center py-3 border-b-2 border-gray-200 text-gray-800 text-xs uppercase font-bold">
                Valor Outros Acréscimos
              </th>
              <th className="px-2 text-center py-3 border-b-2 border-gray-200 text-gray-800 text-xs uppercase font-bold">
                Valor IOF
              </th>
              <th className="px-2 text-center py-3 border-b-2 border-gray-200 text-gray-800 text-xs uppercase font-bold">
                Valor Desconto
              </th>
              <th className="px-2 text-center py-3 border-b-2 border-gray-200 text-gray-800 text-xs uppercase font-bold">
                Valor Atual
              </th>
              <th className="px-2 text-center py-3 border-b-2 border-gray-200 text-gray-800 text-xs uppercase font-bold">
                Status da Prestação
              </th>
              <th className="px-2 text-center py-3 border-b-2 border-gray-200 text-gray-800 text-xs uppercase font-bold">
                Data Contrato
              </th>
              <th className="px-2 text-center py-3 border-b-2 border-gray-200 text-gray-800 text-xs uppercase font-bold">
                Data Vencimento Prestação
              </th>
            </tr>
          </thead>
          <tbody>{tableRows()}</tbody>
        </table>
      </div>
    </div>
  );
};
export default CsvTable;
