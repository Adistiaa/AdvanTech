import { useState, useEffect } from 'react';

export const useExcelData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        // Untuk Google Sheets, gunakan format: 
        // https://sheets.googleapis.com/v4/spreadsheets/SHEET_ID/values/RANGE?key=API_KEY
        // atau gunakan CSV export URL dari Google Sheets
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json',
            // Tambahkan CORS headers jika diperlukan
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const result = await response.text();
        
        // Parse CSV data jika menggunakan Google Sheets CSV export
        if (url.includes('gviz/tq?tqx=out:csv')) {
          const lines = result.split('\n').filter(line => line.trim());
          const headers = lines[0].split(',').map(header => header.replace(/"/g, ''));
          const rows = lines.slice(1).map(line => {
            const values = line.split(',').map(value => value.replace(/"/g, ''));
            const obj = {};
            headers.forEach((header, index) => {
              obj[header] = values[index] || '';
            });
            return obj;
          });
          setData(rows);
        } else {
          // Parse JSON jika menggunakan Google Sheets API
          const jsonData = JSON.parse(result);
          if (jsonData.values) {
            const [headers, ...rows] = jsonData.values;
            const parsedData = rows.map(row => {
              const obj = {};
              headers.forEach((header, index) => {
                obj[header] = row[index] || '';
              });
              return obj;
            });
            setData(parsedData);
          } else {
            setData(jsonData);
          }
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching Excel data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};
