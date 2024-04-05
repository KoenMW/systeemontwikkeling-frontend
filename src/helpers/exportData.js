import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export function exportToCsv(data, columns) {
  const csv = Papa.unparse({
    fields: columns,
    data: data
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  saveAs(blob, 'export.csv');
}

export function exportToExcel(data, columns) {
  const worksheet = XLSX.utils.json_to_sheet(data, { header: columns });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  
  XLSX.writeFile(workbook, 'export.xlsx');
}
