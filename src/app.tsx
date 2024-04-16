import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Customer from './interfaces/Customer';
import CustomerDetails from './components/CustomerDetails';
import CustomerList from './components/CustomerList';

const App: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);

   const fetchPhotos = async () => { 
    try {
      const accessKey = '74Fg4r1vsTTSkY3-2-HbYsi0iThuTQbd6Owksvi0aJM';
      const apiUrl = `https://api.unsplash.com/photos/random?count=9&client_id=${accessKey}`;
      const response = await axios.get(apiUrl);
      console.log(response)
      const photoUrls = response.data.map((photo: any) => photo.urls.small);
      return photoUrls;
    } catch (error) {
      console.error('Error fetching photos:', error);
      return [];
    }
  };

  const rotatePhotos = (photos: string[]) => {
    setInterval(() => {
      setCustomers(prevCustomers => {
        return prevCustomers.map((customer,index) => {
          return {
            ...customer,
            photos: [...customer.photos.slice(1), customer.photos[index]],
          };
        });
      });
    }, 10000);
  };

  const fetchCustomerData = async () => {
    const photos1 = await fetchPhotos();
    const photos2 = await fetchPhotos();
    const photos3 = await fetchPhotos();
    const photos4 = await fetchPhotos();
    const mockedCustomers: Customer[] = [
      {
        id: 1,
        name: "Customer1",
        title: "CEO",
        address: "Rajajinagar, Bangalore",
        photos: photos1,
      },
      {
        id: 2,
        name: "Customer2",
        title: "Secretary",
        address: "Basavanagudi, Bangalore",
        photos: photos2,
      },
      {
          id: 3,
          name: "Customer3",
          title: "Product manager",
          address: "Whitefield, Bengaluru",
          photos: photos3,
        },
        {
          id: 4,
          name: "Customer4",
          title: "Team leader",
          address: "MG Road, Bangalore",
          photos: photos4,
        },
        {
          id: 5,
          name: "Customer5",
          title: "Team leader",
          address: "MG Road, Bangalore",
          photos: photos4,
        },
        {
          id: 6,
          name: "Customer6",
          title: "Team leader",
          address: "MG Road, Bangalore",
          photos: photos4,
        },
        {
          id: 7,
          name: "Customer7",
          title: "Team leader",
          address: "MG Road, Bangalore",
          photos: photos4,
        }
    ]; 
    setCustomers(mockedCustomers);
    console.log(mockedCustomers)
    rotatePhotos(mockedCustomers[0].photos);
  };
  useEffect(() => {
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
