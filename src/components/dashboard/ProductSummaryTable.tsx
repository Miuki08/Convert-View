"use client";

import React, { useState } from 'react';

interface Product {
  id: number;
  purchaseDate: string;
  clientName: string;
  productId: string;
  product: string;
  productCost: string;
  paymentMode: string;
  status: string;
  statusColor: string;
}

const ProductSummaryTable: React.FC = () => {
  const [sortBy, setSortBy] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const products: Product[] = [
    {
      id: 1,
      purchaseDate: '#01',
      clientName: 'Sean Black',
      productId: 'PRO12345',
      product: 'Mi LED Smart TV 4A 80',
      productCost: '$14,500',
      paymentMode: 'Online Payment',
      status: 'Delivered',
      statusColor: 'bg-green-100 text-green-800'
    },
    {
      id: 2,
      purchaseDate: '#02',
      clientName: 'Evan Rees',
      productId: 'PRO8765',
      product: 'Thomson R9 122cm (48 inch) Full HD LED TV',
      productCost: '$30,000',
      paymentMode: 'Cash on delivered',
      status: 'Add Cart',
      statusColor: 'bg-blue-100 text-blue-800'
    },
    {
      id: 3,
      purchaseDate: '#03',
      clientName: 'David Wallace',
      productId: 'PRO54321',
      product: 'Vu 80cm (32 inch) HD Ready LED TV',
      productCost: '$13,200',
      paymentMode: 'Online Payment',
      status: 'Pending',
      statusColor: 'bg-orange-100 text-orange-800'
    },
    {
      id: 4,
      purchaseDate: '#04',
      clientName: 'Julia Bower',
      productId: 'PRO97654',
      product: 'Micromax 81cm (32 inch) HD Ready LED TV',
      productCost: '$15,100',
      paymentMode: 'Cash on delivered',
      status: 'Delivering',
      statusColor: 'bg-gray-100 text-gray-800'
    },
    {
      id: 5,
      purchaseDate: '#05',
      clientName: 'Kevin James',
      productId: 'PRO4532',
      product: 'HP 200 Mouse & Wireless Laptop Keyboard',
      productCost: '$5,987',
      paymentMode: 'Online Payment',
      status: 'Shipped',
      statusColor: 'bg-red-100 text-red-800'
    },
    {
      id: 6,
      purchaseDate: '#06',
      clientName: 'Theresa Wright',
      productId: 'PRO6789',
      product: 'Digisol DG-HR3400 Router',
      productCost: '$11,987',
      paymentMode: 'Cash on delivered',
      status: 'Delivering',
      statusColor: 'bg-gray-100 text-gray-800'
    },
    {
      id: 7,
      purchaseDate: '#07',
      clientName: 'Sebastian Black',
      productId: 'PRO4567',
      product: 'Dell WM118 Wireless Optical Mouse',
      productCost: '$4,700',
      paymentMode: 'Online Payment',
      status: 'Add to Cart',
      statusColor: 'bg-blue-100 text-blue-800'
    },
    {
      id: 8,
      purchaseDate: '#08',
      clientName: 'Kevin Glover',
      productId: 'PRO32156',
      product: 'Dell 16 inch Laptop Backpack',
      productCost: '$678',
      paymentMode: 'Cash On delivered',
      status: 'Delivered',
      statusColor: 'bg-green-100 text-green-800'
    }
  ];

  const filteredProducts = products.filter(product =>
    product.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'name') {
      return a.clientName.localeCompare(b.clientName);
    } else if (sortBy === 'status') {
      return a.status.localeCompare(b.status);
    } else if (sortBy === 'cost') {
      return parseFloat(a.productCost.replace('$', '').replace(',', '')) - 
             parseFloat(b.productCost.replace('$', '').replace(',', ''));
    }
    return 0;
  });

  // Fungsi untuk menangani perubahan sorting
  const handleSortChange = (sortType: string) => {
    setSortBy(sortType);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 transition-all duration-300 hover:shadow-lg">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
        <h3 className="text-lg font-semibold text-gray-800">Product Summary</h3>
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search Here"
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="relative">
            <button className="px-3 py-2 bg-blue-500 text-white rounded-md text-sm flex items-center">
              Sort By <span className="ml-1">▼</span>
            </button>
            <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg py-1 z-10 hidden">
              <button 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={() => handleSortChange('name')}
              >
                Name
              </button>
              <button 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={() => handleSortChange('status')}
              >
                Status
              </button>
              <button 
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={() => handleSortChange('cost')}
              >
                Cost
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Cost</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Mode</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 text-sm text-gray-900">{product.purchaseDate}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{product.clientName}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{product.productId}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{product.product}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{product.productCost}</td>
                <td className="px-4 py-4 text-sm text-gray-900">{product.paymentMode}</td>
                <td className="px-4 py-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${product.statusColor}`}>
                    {product.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductSummaryTable;