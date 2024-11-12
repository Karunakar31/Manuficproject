import React from 'react';
import { Table , Title} from '@mantine/core';
import { Dataset } from '../types';

interface AverageYieldAndAreaTableProps {
  data: Dataset[];
}

const Table2: React.FC<AverageYieldAndAreaTableProps> = ({ data }) => {
  const crops: { [key: string]: { totalYield: number; totalArea: number; count: number } } = {};

  // Process the input data to calculate average yield and area for each crop
  data.forEach(({ "Crop Name": crop, "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": yieldValue, "Area Under Cultivation (UOM:Ha(Hectares))": area }) => {
    const yieldValueNum = yieldValue > 0 ? Number(yieldValue) : 0; // Convert to number or default to 0
    const areaNum = area > 0 ? Number(area) : 0; // Convert to number or default to 0

    if (!crops[crop]) {  //Checking the crop data only if it exists
      crops[crop] = { totalYield: yieldValueNum, totalArea: areaNum, count: 1 };
    } else {
      crops[crop].totalYield += yieldValueNum;  // calculating total yield for each crop
      crops[crop].totalArea += areaNum;  // calculating total Area for each crop
      crops[crop].totalArea += areaNum;
      crops[crop].count += 1;
    }
  });

  // calculation of averages
  const rows = Object.entries(crops).map(([crop, { totalYield, totalArea, count }]) => {
    const averageYield = totalYield / count;
    const averageArea = totalArea / count;

    // rounding upto 3 decimal places
    const displayYield = averageYield.toFixed(3);
    const displayArea = averageArea.toFixed(3);

    console.log(`Crop: ${crop}, Total Yield: ${totalYield}, Total Area: ${totalArea}, Count: ${count}`);

    return (
      <tr key={crop}>
        <td>{crop}</td>
        <td>{displayYield}</td>
        <td>{displayArea}</td>
      </tr>
    );
  });

  return ( // Create table to display average for each crop
    <div className="table-container">
      <Title order={3}>Average Yield and Cultivation Area Table</Title>
      <Table className="table-body"> 
        <thead className="table-header">
          <tr>
            <th>Crop</th>
            <th>Average Yield of the Crop between 1950-2020</th>
            <th>Average Cultivation Area of the Crop between 1950-2020</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </div>
  );
};

export default Table2;