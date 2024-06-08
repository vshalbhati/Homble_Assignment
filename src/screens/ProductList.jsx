import React, { useState } from 'react';
import { Container, Row, Button, Modal, Form } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { addProduct } from '../axios';
import './ProductList.css'; 
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const navigate = useNavigate();

  const { products, setProducts, isLoading, error, refetch } = useProducts();
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    allergenInfo: '',
    sellingPrice: 0, 
  });

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async () => {
    try {
      const response = await addProduct(newProduct);
      handleCloseModal();
      setProducts((prevProducts) => [...prevProducts, response]);
      console.log(newProduct);
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  if (isLoading) return <LoadingSpinner />; 
  if (error) return <ErrorMessage message={error} />;

  return (
    <Container className="product-list-container"> 
      <div className="header-container mb-4"> 
        <h1 className="product-list-header">Product Listing</h1>
        <Button variant="primary" onClick={handleShowModal} className="add-product-button">
          Add Product
        </Button>
        <Button variant="primary" onClick={()=>navigate(`/dashboard`)} className="add-product-button">
          Dashboard
        </Button>
      </div>

      <Row className="product-grid"> 
        {products.sort((a, b) => a.sellingPrice - b.sellingPrice).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Row>

      <Modal show={showModal} onHide={handleCloseModal} centered> 
        <Modal.Header closeButton className="modal-header">
          <Modal.Title className="modal-title">Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <Form>
            <Form.Group controlId="productName" className="mb-3">
              <Form.Label className="form-label">Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="productDescription" className="mb-3">
              <Form.Label className="form-label">Product Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="productAllergen" className="mb-3">
              <Form.Label className="form-label">Allergen Info</Form.Label>
              <Form.Control
                type="text"
                name="allergenInfo"
                value={newProduct.allergenInfo}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="productSellingPrice" className="mb-3">
              <Form.Label className="form-label">Selling Price</Form.Label>
              <Form.Control
                type="number"
                name="sellingPrice"
                value={newProduct.sellingPrice}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddProduct}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProductList;
