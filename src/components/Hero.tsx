import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Backend product interface (matching your MongoDB model)
interface BackendProduct {
  _id: string;
  name: string;
  price: number;
  description: string;
  inStock: boolean;
  image?: {
    data: string; // base64 string from backend
    contentType: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

export default function Hero() {
  const [products, setProducts] = useState<BackendProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:7000/api/products");
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Fetched products:", data);
      setProducts(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch products");
      setLoading(false);
    }
  };

  // Helper function to get image source from backend data
  const getImageSrc = (product: BackendProduct): string => {
    // Check if product has image data
    if (!product.image || !product.image.data) {
      // Fallback image based on product name
      return getFallbackImage(product.name);
    }

    const { data, contentType } = product.image;
    
    // If data already starts with 'data:', it's complete
    if (data.startsWith('data:')) {
      return data;
    }
    
    // Otherwise, construct the data URL
    return `data:${contentType};base64,${data}`;
  };

  // Fallback images based on product category/name
  const getFallbackImage = (name: string): string => {
    const lowerName = name.toLowerCase();
    
    if (lowerName.includes('headphone') || lowerName.includes('audio')) {
      return 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=400&fit=crop';
    }
    if (lowerName.includes('tv') || lowerName.includes('television')) {
      return 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=400&fit=crop';
    }
    if (lowerName.includes('laptop') || lowerName.includes('computer')) {
      return 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&h=400&fit=crop';
    }
    if (lowerName.includes('watch') || lowerName.includes('smartwatch')) {
      return 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&h=400&fit=crop';
    }
    if (lowerName.includes('camera')) {
      return 'https://images.unsplash.com/photo-1606980707767-2a7774b4d6d8?w=600&h=400&fit=crop';
    }
    if (lowerName.includes('speaker')) {
      return 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=400&fit=crop';
    }
    if (lowerName.includes('phone') || lowerName.includes('mobile')) {
      return 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400&fit=crop';
    }
    if (lowerName.includes('coca') || lowerName.includes('drink') || lowerName.includes('beverage')) {
      return 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=600&h=400&fit=crop';
    }
    
    // Generic product fallback
    return 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=400&fit=crop';
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 mt-6">
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          <p className="text-lg mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 mt-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 font-semibold">Error loading products</p>
          <p className="text-red-500 text-sm mt-2">{error}</p>
          <button 
            onClick={fetchProducts}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="container mx-auto px-4 mt-6">
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No products available yet</p>
          <p className="text-gray-400 text-sm mt-2">Check back soon!</p>
        </div>
      </div>
    );
  }

  // Select products for hero display
  const featuredProduct = products[0]; // Main banner
  const sideProducts = products.slice(1, 3); // Side banners

  return (
    <section className="container mx-auto px-4 mt-6">
      <div className="grid gap-4 md:grid-cols-3">
        {/* Main Featured Product */}
        <Link
          to={`/shop/${featuredProduct._id}`}
          className="relative col-span-2 overflow-hidden rounded-lg shadow-lg group"
        >
          <img
            src={getImageSrc(featuredProduct)}
            alt={featuredProduct.name}
            className="h-64 w-full object-cover md:h-[400px] transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              console.error("Image failed to load for:", featuredProduct.name);
              e.currentTarget.src = getFallbackImage(featuredProduct.name);
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          
          {/* Featured Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold uppercase">
              Featured
            </span>
          </div>

          {/* Product Info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
            <h2 className="text-3xl font-extrabold drop-shadow-lg mb-2">
              {featuredProduct.name}
            </h2>
            <p className="text-gray-100 text-sm md:text-base mb-3 drop-shadow line-clamp-2">
              {featuredProduct.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">
                ${featuredProduct.price.toFixed(2)}
              </span>
              {featuredProduct.inStock ? (
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  In Stock
                </span>
              ) : (
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Out of Stock
                </span>
              )}
            </div>
          </div>
        </Link>

        {/* Side Products */}
        <div className="grid gap-4">
          {sideProducts.map((product) => (
            <Link
              key={product._id}
              to={`/shop/${product._id}`}
              className="relative overflow-hidden rounded-lg shadow-lg group"
            >
              <img
                src={getImageSrc(product)}
                alt={product.name}
                className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  console.error("Image failed to load for:", product.name);
                  e.currentTarget.src = getFallbackImage(product.name);
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
                <h3 className="font-bold text-lg drop-shadow mb-1 line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-200 drop-shadow line-clamp-1 mb-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.inStock && (
                    <span className="text-xs bg-green-500/80 px-2 py-1 rounded">
                      Available
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}