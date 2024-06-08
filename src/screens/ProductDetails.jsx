import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { getProductById } from '../axios';
import LoadingSpinner from '../components/LoadingSpinner'; 
import ErrorMessage from '../components/ErrorMessage';
import './ProductDetails.css'

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDescription, setShowDescription] = useState(false);
  const [showAllergens, setShowAllergens] = useState(false);
  const [showUsage, setShowUsage] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getProductById(id);
        setProduct(response.data);
      } catch (err) {
        setError('Something went wrong.');
        console.error("Error fetching product details:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]); 

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!product) return <p>Product not found.</p>; 

  return (
    <Container className="product-details-container">
      <Row className="justify-content-center">
        <Col md={10} lg={8}> 
          {isLoading ? ( 
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : product ? (
            <div className="product-details-card shadow-sm rounded">
              <Row>
                <Col md={6}>
                  <img 
                    src={product.productImage} 
                    alt={product.name} 
                    className="img-fluid rounded" 
                  /> 
                </Col>
                <Col md={6}>
                  <h2 className="mb-3">{product.name}</h2>
                  <div className="d-flex justify-content-between mb-3">
                    <p className="mb-1"><strong>Cost Price:</strong> ${product.cost_price}</p>
                    <p className="mb-1"><strong>Selling Price:</strong> ${product.selling_price}</p>
                  </div>

                  <Card className="mb-3">
                    <Card.Header 
                      onClick={() => setShowDescription(!showDescription)} 
                      className="cursor-pointer bg-light"
                    >
                      <h5 className="mb-0">Description</h5>
                    </Card.Header>
                    <Card.Body className={showDescription ? 'd-block' : 'd-none'}>
                      <p>{product.description}</p> 
                    </Card.Body>
                  </Card>

                  <Card className="mb-3">
                    <Card.Header 
                      onClick={() => setShowAllergens(!showAllergens)} 
                      className="cursor-pointer bg-light"
                    >
                      <h5 className="mb-0">Allergens</h5>
                    </Card.Header>
                    <Card.Body className={showAllergens ? 'd-block' : 'd-none'}>
                      <p>{product.allergen_info}</p> 
                    </Card.Body>
                  </Card>

                  <Card>
                    <Card.Header 
                      onClick={() => setShowUsage(!showUsage)} 
                      className="cursor-pointer bg-light"
                    >
                      <h5 className="mb-0">Cooking Instructions</h5>
                    </Card.Header>
                    <Card.Body className={showUsage ? 'd-block' : 'd-none'}>
                      <p>{product.cooking_instruction}</p> 
                    </Card.Body>
                  </Card>

                </Col>
              </Row>
            </div>
          ) : (
            <p>Product not found.</p> 
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;