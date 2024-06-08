import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductList from './screens/ProductList';
import ProductDetails from './screens/ProductDetails';
import Dashboard from './screens/Dashboard';
// import Home from './screens/Home';
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
      {/* <Route path="/" element={<Home />} /> */}

        <Route path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;