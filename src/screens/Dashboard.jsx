import React, { useState, useEffect, useMemo } from 'react';
import { Table, Container, InputGroup, FormControl, Button } from 'react-bootstrap';
import { getProducts } from '../axios'; 
import LoadingSpinner from '../components/LoadingSpinner'; 
import ErrorMessage from '../components/ErrorMessage';
import './Dashboard.css'
const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getProducts(); 
        setProducts(response.data);
      } catch (err) {
        setError('Something went wrong.');
        console.error("Error fetching dashboard data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedProducts = useMemo(() => {
    if (!sortConfig.key) return products;

    return [...products].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [products, sortConfig]);

  const filteredProducts = useMemo(() => {
    return sortedProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.id.toString().includes(searchTerm) 
    );
  }, [sortedProducts, searchTerm]);

  const handleCheck = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <Container className="dabba">
      <h1>Product Dashboard</h1>
      <p>Tap on the column heading to sort!</p>

      <InputGroup className="searchbar mb-3 rounded">
        <FormControl
          placeholder="Search by Name or ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th onClick={() => requestSort('id')}>
              ID{' '}
              {sortConfig.key === 'id' && (
                sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'
              )}
            </th>
            <th onClick={() => requestSort('name')}>
              Name{' '}
              {sortConfig.key === 'name' && (
                sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'
              )}
            </th>
            <th onClick={() => requestSort('selling_price')}>
              Selling Price{' '}
              {sortConfig.key === 'selling_price' && (
                sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'
              )}
            </th>
            <th>Actions</th> 
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>${product.selling_price}</td> 
              <td>
                <Button variant="outline-danger" size="sm" onClick={() => handleCheck(product.id)}>
                  Check
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Dashboard;