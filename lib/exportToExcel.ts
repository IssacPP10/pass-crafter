// lib/exportToExcel.ts
import * as XLSX from 'xlsx';
import { Element } from '@prisma/client';

export function exportToExcel(elements: Element[], fileName: string) {
  const worksheet = XLSX.utils.json_to_sheet(elements); // Convierte los datos en una hoja de trabajo
  const workbook = XLSX.utils.book_new(); // Crea un nuevo libro de trabajo
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Elements'); // Añade la hoja al libro de trabajo

  // Obtener el rango de celdas
  const range = worksheet['!ref'];
  if (!range) {
    throw new Error("No valid range found in the worksheet");
  }

  const decodedRange = XLSX.utils.decode_range(range);

  // Ajustar el ancho de las columnas automáticamente
  worksheet['!cols'] = [];
  for (let col = decodedRange.s.c; col <= decodedRange.e.c; col++) {
    let maxLength = 0;
    for (let row = decodedRange.s.r; row <= decodedRange.e.r; row++) {
      const cell = worksheet[XLSX.utils.encode_cell({ r: row, c: col })];
      if (cell && cell.v) {
        maxLength = Math.max(maxLength, cell.v.toString().length);
      }
    }
    worksheet['!cols'][col] = { wch: maxLength + 2 }; // Ajusta el ancho de las columnas (2 caracteres extra)
  }

  // Genera el archivo Excel y lo descarga
  XLSX.writeFile(workbook, fileName);
}
