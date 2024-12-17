'use client';

import { Element } from "@prisma/client";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { exportToExcel } from '@/lib/exportToExcel';
import { toast } from "@/hooks/use-toast";

export type TableDataProps = {
  elements: Element[];
};

export function TableData({ elements }: TableDataProps) {
  const handleExport = () => {
    try {
      // Llama a la función de exportación con los datos y el nombre de archivo
      exportToExcel(elements, "pass_crafter.xlsx");

      // Muestra el toast de éxito
      toast({
        title: "Export Successful ✅",
        description: "The data has been successfully exported",        
      });
    } catch (error) {
      // Muestra el toast de error si algo falla
      const e = error as Error;
      toast({
        title: "Export Failed",
        description: e.message || "There was an error to exporting the data",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="py-10">      
      <button
        onClick={handleExport}
        className="bg-blue-500 text-white px-4 py-2 rounded my-2"
      >
        Export to Excel
      </button>
      
      {/* Tabla de datos */}
      <DataTable columns={columns} data={elements} />
    </div>
  );
}
