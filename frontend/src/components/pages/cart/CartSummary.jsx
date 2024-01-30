import { Card } from "../../ui/Index";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

function CartSummary({ item, onUpdateQuantity, onRemoveProduct }) {

  const { id, title, quantity, image, price } = item;
  
  return (
      <Card
        key={id}
        className="flex items-center justify-between mb-2 border border-solid border-gray-300 rounded-3xl p-4 shadow-lg"
      >
        {/*LEFT SIDE */}
        <div className="title-column" style={{ width: "100px" }}>
          <p className="text-gray-600 text-xl">{title}</p>
        </div>
        <div className="quantity-group" style={{ width: "100px" }}>
          
            <button
              className="quantity-button p-2 text-lg text-red-500 gap-2"
              onClick={() => onUpdateQuantity(id, quantity - 1)}
            >
              <FaMinusCircle />
            </button>
            <span className="quantity text-xl">{quantity}</span>
            <button
              className="quantity-button p-2 text-xl text-green-500"
              onClick={() => onUpdateQuantity(id, quantity + 1)}
            >
              <FaPlusCircle />
            </button>
          
        </div>
        <img
          className="text-gray-600 min-h-min"
          src={image}
          height={50}
          width={50}
          style={{ maxHeight: "50px" }}
        />
        <p className="text-gray-800 text-xl" style={{ width: "150px" }}>
          $ {(Number(price) * Number(quantity)).toFixed(2)}
        </p>
        <button className="text-red-500" onClick={() => onRemoveProduct(item)}>
          <FaXmark />
        </button>
      </Card>
  );
}

export default CartSummary;
