import { ProductInfo } from '../TSReusedTypes/ItemsAndPrices';

interface landingPageProps {
    onAddToCart: (product: ProductInfo) => void;
    products: ProductInfo[]
  }

/* Partly generated by AI */
function LandingPage({ onAddToCart,products }: landingPageProps) {
    return (
        <div className="landing-page-container">
            <h1>This is a landing page</h1>
            <p>The very first page the customer sees, and where they'll be able to pick the items they want to buy</p>
            <div className="products-container">
                {products.map((product) => (
                    <div className="product-card" key={product.id}>
                        <h2 className="product-name">{product.name}</h2>
                        <p className="product-description">{product.price}</p>
                        <button className="add-to-cart-button" onClick={() => onAddToCart(product)}>Add to cart</button>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default LandingPage;