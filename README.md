Code Explanation
1. Dashboard Component (Dashboard.js)
This component fetches and displays a list of products in a table. It includes functionalities for sorting, searching, and removing products.

* State Management: Uses React useState and useEffect hooks to manage the state of products, loading status, error messages, sort configuration, and search terms.
* Fetching Products: Fetches products using the getProducts function from ../axios when the component mounts.
* Sorting: Implements a sorting mechanism by updating the sort configuration and re-sorting products based on the selected column.
* Searching: Filters products based on the search term, checking if the product name or ID contains the search term.
* Removing Products: Provides a "Check" button to remove a product from the list without reloading the page.

2. Product Details Component (ProductDetails.js)
This component fetches and displays detailed information about a specific product.

* State Management: Uses React useState and useEffect hooks to manage the state of the product, loading status, error messages, and the visibility of collapsible sections.
* Fetching Product Details: Fetches product details using the getProductById function from ../axios when the component mounts or the id parameter changes.
* Collapsible Sections: Implements expandable/collapsible sections for product description, allergens, and cooking instructions.

3. Custom Hook for Fetching Products (useProducts.js)
This custom hook encapsulates the logic for fetching and managing the state of products.

* State Management: Uses React useState, useEffect, and useCallback hooks to manage the state and re-fetch products.
* Fetching Products: Fetches products using the getProducts function from ../axios and handles loading and error states.

4. Axios Configuration and API Functions (axios.js)
This file configures Axios for API requests and defines functions for interacting with the API.

* Axios Instance: Creates an Axios instance with a base URL.
* Helper Functions:
  * getRequest and postRequest for making GET and POST requests.
  * getProducts for fetching all products.
  * getProductById for fetching a product by its ID.
  * addProduct for adding a new product.

Usage
1. Dashboard: Navigate to the dashboard to view and manage products.
 * Sort products by clicking on column headers.
 * Use the search bar to filter products by name or ID.
 * Remove products using the "Check" button.

2. Product Details: Click on a product in the dashboard to view detailed information.
 * Expand or collapse sections for description, allergens, and cooking instructions.

Technologies Used
* React
* React Router
* Axios
* Bootstrap
* Custom Hooks

Installation

1. Clone the repository:
      `git clone https://github.com/your-username/product-management-app.git`

2. Navigate to the project directory:
      `cd product-management-app`

3. Install dependencies:
      `npm install`
   
4. Start the development server:
      `npm start`
