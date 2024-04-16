import React from 'react';
import Customer from '../interfaces/Customer';

const CustomerList: React.FC<{ customers: Customer[]; selectedCustomerId: number; onSelectCustomer: (id: number) => void }> = ({
  customers,
  selectedCustomerId,
  onSelectCustomer,
}) => {
  return (
    <div className="customer-list">
      {customers.map((customer) => (
        <div
          key={customer.id}
          className={`customer-card ${customer.id === selectedCustomerId ? 'selected' : ''}`}
          onClick={() => onSelectCustomer(customer.id)}
        >
          <h3>{customer.name}</h3>
          <p>{customer.title}</p>
        </div>
      ))}
    </div>
  );
};

export default CustomerList;
