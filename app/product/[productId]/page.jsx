'use client';

import { useEffect, useState } from 'react';
import { useShop } from '@/context/ShopContext';
import RelatedProducts from '@/components/RelatedProducts/page';
import { useParams } from 'next/navigation';

export default function Product() {
  const params = useParams();
  const productId = params.productId;

  const { products, currency, addToCart } = useShop();
  const [productData, setProductData] = useState(null);
  const [size, setSize] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image);
    }
  }, [productId, products]);

  if (!productData) {
    return <div className="opacity-0"></div>;
  }

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Section */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Image */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            <img
              onClick={() => setImage(productData.image)}
              className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              src={productData.image}
              alt={productData.name}
            />
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt={productData.name} />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            <img className="w-3.5" src={'/assets/icons/star-icon.png'} alt="" />
            <img className="w-3.5" src={'/assets/icons/star-icon.png'} alt="" />
            <img className="w-3.5" src={'/assets/icons/star-icon.png'} alt="" />
            <img className="w-3.5" src={'/assets/icons/star-icon.png'} alt="" />
            <img className="w-3.5" src={'/assets/icons/dull-star-icon.png'} alt="" />
            <p className="pl-2 text-sm text-gray-500">(122)</p>
          </div>

          {/* Price */}
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>

          {/* Description */}
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description ||
              'This product is made from high-quality materials for comfort and style.'}
          </p>

          {/* Size Selection */}
          {/* <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {Array.isArray(productData.sizes) && productData.sizes.length > 0 ? (
                productData.sizes.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSize(item)}
                    className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''
                      }`}
                  >
                    {item}
                  </button>
                ))
              ) : (
                <p className="text-gray-500 text-sm">Sizes not available</p>
              )}
            </div>
          </div> */}
          {Array.isArray(productData.sizes) && productData.sizes.length > 0 && (
            <div className="flex flex-col gap-4 my-8">
              <p>Select Size</p>
              <div className="flex gap-2">
                {productData.sizes.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSize(item)}
                    className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''
                      }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}


          {/* Add to Cart */}
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5" />

          {/* Additional Info */}
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description / Reviews */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            An e-commerce website is an online platform that facilitates the buying and
            selling of products or services over the internet. It serves as a virtual
            marketplace where businesses and individuals can showcase their products,
            interact with customers, and conduct transactions without the need for a
            physical presence.
          </p>
          <p>
            E-commerce websites typically display products or services along with detailed
            descriptions, images, prices, and any available variations (e.g., sizes,
            colors). Each product usually has its own dedicated page with relevant
            information.
          </p>
        </div>
      </div>

      {/* Related Products */}
      {productData && (
        <RelatedProducts
          category={productData.category || 'general'}
          subCategory={productData.subCategory || ''}
        />
      )}
    </div>
  );
}
