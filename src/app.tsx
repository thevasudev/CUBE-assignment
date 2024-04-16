import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Customer from './interfaces/Customer';
import CustomerDetails from './components/CustomerDetails';
import CustomerList from './components/CustomerList';

const App: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);

  useEffect(() => {
    // Function to fetch random photos from Unsplash
    const fetchPhotos = async () => {
      try {
        const accessKey = 'VdUoIuhJLuYnfwaDhtQnrfxn14hrI3ALq42oN8DYGYQ';
        const apiUrl = `https://api.unsplash.com/photos/random?count=6&client_id=${accessKey}`;
        const response = await axios.get(apiUrl);
        const photoUrls = response.data.map((photo: any) => photo.urls.small);
        return photoUrls;
      } catch (error) {
        console.error('Error fetching photos:', error);
        return [];
      }
    };

    // Function to rotate photos every 10 seconds
    const rotatePhotos = (photos: string[]) => {
      setInterval(() => {
        setCustomers(prevCustomers => {
          return prevCustomers.map(customer => {
            return {
              ...customer,
              photos: [...customer.photos.slice(1), customer.photos[0]],
            };
          });
        });
      }, 10000);
    };

    // Mocked customer data
    const fetchCustomerData = async () => {
      const photos1 = await fetchPhotos();
      const photos2 = await fetchPhotos();
      const photos3 = await fetchPhotos();
      const photos4 = await fetchPhotos();
      // Adjust customer data as needed
      const mockedCustomers: Customer[] = [
        {
          id: 1,
          name: "Customer1",
          title: "Male",
          address: "Rajajinagar, Bangalore",
          photos: photos1,
        },
        {
          id: 2,
          name: "Customer2",
          title: "Female",
          address: "Basavanagudi, Bangalore",
          photos: photos2,
        },
        {
            id: 3,
            name: "Customer3",
            title: "Male",
            address: "Whitefield, Bengaluru",
            photos: photos3,
          },
          {
            id: 4,
            name: "Customer4",
            title: "Male",
            address: "MG Road, Bangalore",
            photos: photos4,
          }
        // Add more mocked customers here if needed
      ];
      setCustomers(mockedCustomers);
      rotatePhotos(mockedCustomers[0].photos); // Start rotating photos for the first customer
    };

    fetchCustomerData();
  }, []);

  const handleSelectCustomer = (id: number) => {
    setSelectedCustomerId(id);
  };

  return (
    <div className="app">
      <CustomerList
        customers={customers}
        selectedCustomerId={selectedCustomerId || -1}
        onSelectCustomer={handleSelectCustomer}
      />
      {selectedCustomerId !== null && (
        <CustomerDetails customer={customers.find((customer) => customer.id === selectedCustomerId)!} />
      )}
    </div>
  );
};

export default App;
