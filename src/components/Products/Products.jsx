import { useEffect, useState } from "react"
import Product from "./Product";
import { Spinner } from "react-bootstrap";

const DB_URL = 'https://react-cafe-d4119-default-rtdb.europe-west1.firebasedatabase.app';

export default function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch(`${DB_URL}/products.json`);

            if (!response.ok) {
                throw new Error('Something get wrong');
            }

            const responseData = await response.json();

            console.log(responseData);

            const loadedProducts = [];

            for (const key in responseData) {
                loadedProducts.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price,
                });
            }

            setProducts(loadedProducts);
        };

        fetchProducts();
    }, []);

    return (
        <div>
            <h2 className="mb-3">Products</h2>
            <div>
                {products.length === 0 && <div><Spinner size="sm" animation="border" variant="primary" /> Loading...</div>}
                {products.length > 0 && products.map((product) => (
                    <Product key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}
