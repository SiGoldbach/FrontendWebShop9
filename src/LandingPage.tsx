import products from './Data/product.json';
import { useState } from 'react';

function LandingPage() {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart([...cart, product]);
        console.log(cart);
    }
    return (
        <div>
            <h1>This is a landing page</h1>
            <p>The very first page the customer sees, and where they'll be able to pick the items they want to buy</p>
            <div>
                <ul>
                    {products.map((product) => (
                        <li key={product.id}>
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <button onClick={() => addToCart(product)}>Add to cart</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default LandingPage;