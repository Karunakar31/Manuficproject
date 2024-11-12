// src/App.tsx
import React from 'react';
import { Container } from '@mantine/core';
import CropProductionTable from './components/Table1';
import AverageYieldAndAreaTable from './components/Table2';
import cropData from './assets/Data/Dataset.json'; // Importing the JSON data
import { Dataset } from './types';


const App: React.FC = () => {
  return (
    <Container>
      <CropProductionTable data={cropData as Dataset[]} />
      <AverageYieldAndAreaTable data={cropData as Dataset[]} />
    </Container>
  );
};

export default App;