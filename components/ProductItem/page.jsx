import Image from "next/image";
import Link from "next/link";

const ProductItem = ({ id, image, name, price }) => {
  return (
    <Link href={`/product/${id}`} className="block group">
      <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-gray-50">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h3 className="mt-3 text-sm font-medium text-gray-800 group-hover:text-black">
        {name}
      </h3>
      <p className="text-gray-600 text-sm">${price}</p>
    </Link>
  );
};

export default ProductItem;
