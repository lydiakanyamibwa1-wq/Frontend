import { useCart } from '../hooks/useCart';

type Props = {
  id: string;
  title: string;
  price: number;
  image: string;
};

export default function Card({ id, title, price, image }: Props) {
  const { addToCart } = useCart();

  return (
    <div className="card bg-white p-4 rounded-xl shadow">
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-contain mb-4"
      />
      <h3 className="font-semibold">{title}</h3>
      <p className="text-red-500 font-bold">${price}</p>
      <button
        onClick={() => addToCart({ id, title, price, image, quantity: 1 })}
        className="mt-3 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
      >
        Add to Cart
      </button>
    </div>
  );
}
