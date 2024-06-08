import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const handleProductClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <Col xs={12} sm={6} lg={4} className="mb-4">
      <Card onClick={handleProductClick} className="h-100 cursor-pointer">
      <Card.Title className='h5'>{product.name}</Card.Title>

      <Card.Img variant="top" src={product.productImage} className='cardImg'/>
        <Card.Body> 
        <div className="box">
          <Card.Text>{product.description}</Card.Text>
          <Card.Text>Cost Price: ${product.cost_price}</Card.Text>
          <Card.Text>Selling Price: ${product.selling_price}</Card.Text>
        </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProductCard;