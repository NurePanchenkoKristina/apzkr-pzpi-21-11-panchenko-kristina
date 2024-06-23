import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { CustomerChangeModal } from '../components/Models/Customer/CustomerChangeModal';
import { CustomerCreateModal } from '../components/Models/Customer/CustomerCreateModal';
import { deleteCustomer, getCustomers } from '../http/customerApi';
import { ICustomer } from '../interfaces/ICustomer';

export const Customers = () => {
    const [customers, setCustomers] = useState<ICustomer[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<ICustomer>();
  
    const handleShowCreateModal = () => setCreateModal(true);
    const handleCloseCreateModal = () => setCreateModal(false);
  
    const handleShowEditModal = (data: ICustomer) => {
      setEditableData(data);
      setEditModal(true);
    }
  
    const handleCloseEditModal = () => {
      setEditModal(false);
    }
  
    const fetchItems = async () => {
      await getCustomers()
        .then((data) => {
            setCustomers(data);
        })
        .catch(() => alert("Error"));
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const remove = async (id: number) => {
      await deleteCustomer(id).then(() => {
        fetchItems();
      })
    }
  
    return (
      <div>
       <CustomerCreateModal
          fetch={fetchItems}
          onHide={handleCloseCreateModal}
          show={createModal}
        ></CustomerCreateModal>
  
        <CustomerChangeModal
          item={editableData}
          fetch={fetchItems}
          show={editModal}
          onHide={handleCloseEditModal}
        ></CustomerChangeModal>
        <h1>Customers</h1>
  
        <p>
          <Button variant="primary" onClick={handleShowCreateModal}>
            Create New
          </Button>
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Phone</th>
              <th>Registration date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.surname}</td>
                <td>{customer.phone}</td>
                <td>{customer.registrationDate}</td>
                <td className="d-flex gap-3">
                  <button className="btn btn-warning" onClick={() => handleShowEditModal(customer)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => remove(customer.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
