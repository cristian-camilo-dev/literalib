import { useState } from 'react';

export const CsvUploader = () => {
  const [jsonData, setJsonData] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const rows = text.split('\n');
      const headers = rows[0].split(',');
      const data = rows.slice(1).map((row) => {
        const values = row.split(',');
        return headers.reduce((acc, header, i) => {
          acc[header] = values[i];
          return acc;
        }, {});
      });
      setJsonData(data);
    };
    reader.readAsText(file);
  };
  return (
    <div>
      <input type='file' accept='.csv' onChange={handleFileChange} />
      {jsonData.length > 0 && <pre>{JSON.stringify(jsonData, null, 2)}</pre>}
    </div>
  );
};
