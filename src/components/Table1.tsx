import React from 'react';
import { Table, Title } from '@mantine/core';
import { Dataset } from '../types';
import '../assets/Styles/table.css';

interface CropProductionTableProps {
  data: Dataset[];
}

const Table1: React.FC<CropProductionTableProps> = ({ data }) => {
    const yearData: { [year: string]: { maxCrop: string; maxProduction: number; minCrop: string; minProduction: number } } = {};

    // Process the input data to find max and min production crops for each year
    data.forEach(({ "Crop Name": crop, "Crop Production (UOM:t(Tonnes))": production, Year }) => {
      const yearMatch = Year.match(/\d{4}/); // Match the first four-digit number
      const year = yearMatch ? yearMatch[0] : Year; // Use the matched year or fallback to the original

      if (!yearData[year]) {  //Checking the year data only if it exists
        yearData[year] = { maxCrop: crop, maxProduction: production, minCrop: crop, minProduction: production };
      } else {
        // Update max production crop if current production is higher
        if (production > yearData[year].maxProduction) {
          yearData[year].maxProduction = production;
          yearData[year].maxCrop = crop;
        }
        // Update min production crop if current production is lower
        if (production < yearData[year].minProduction) {
          yearData[year].minProduction = production;
          yearData[year].minCrop = crop;
        }
      }
    });
  
    // Create table rows from the processed year data
    const rows = Object.entries(yearData).map(([year, { maxCrop, minCrop }]) => (
      <tr key={year}>
        <td>{year}</td>
        <td>{maxCrop} </td>
        <td>{minCrop} </td>
      </tr>
    ));
  
    return (
      <div className="table-container">
      <Title order={2}>Crop Production Analysis</Title>
      <Title order={3}>Crop Production Table</Title>
      <Table className="table-body">
        <thead className="table-header">
          <tr>
            <th>Year</th>
            <th>Crop with Maximum Production in that Year</th>
            <th>Crop with Minimum Production in that Year</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
    );
  };

export default Table1

