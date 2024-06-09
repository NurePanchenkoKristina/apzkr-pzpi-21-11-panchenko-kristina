import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { HouseChangeModal } from '../components/Models/House/HouseChangeModal';
import { HouseCreateModal } from '../components/Models/House/HouseCreateModal';
import { deleteHouse, getHouses } from '../http/houseApi';
import { IHouse } from '../interfaces/IHouse';

export const Houses = () => {
    const [houses, setHouses] = useState<IHouse[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<IHouse>();
  
    const handleShowCreateModal = () => setCreateModal(true);
    const handleCloseCreateModal = () => setCreateModal(false);
  
    const handleShowEditModal = (data: IHouse) => {
      setEditableData(data);
      setEditModal(true);
    }
  
    const handleCloseEditModal = () => {
      setEditModal(false);
    }
  
    const fetchItems = async () => {
      await getHouses()
        .then((data) => {
            setHouses(data);
        })
        .catch(() => alert("Error"));
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const remove = async (id: number) => {
      await deleteHouse(id).then(() => {
        fetchItems();
      })
    }
  
    return (
      <div>
       <HouseCreateModal
          fetch={fetchItems}
          onHide={handleCloseCreateModal}
          show={createModal}
        ></HouseCreateModal>
  
        <HouseChangeModal
          item={editableData}
          fetch={fetchItems}
          show={editModal}
          onHide={handleCloseEditModal}
        ></HouseChangeModal>
        <h1>Houses</h1>
  
        <p>
          <Button variant="primary" onClick={handleShowCreateModal}>
            Create New
          </Button>
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Address</th>
              <th>City</th>
              <th>Region</th>
              <th>Postal code</th>
              <th>Country</th>
              <th>Customer</th>
              <th>Registration date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {houses.map((house) => (
              <tr key={house.id}>
                <td>{house.id}</td>
                <td>{house.address}</td>
                <td>{house.city}</td>
                <td>{house.region}</td>
                <td>{house.postalCode}</td>
                <td>{house.country}</td>
                <td>{house.customer?.surname} {house.customer?.name}</td>
                <td>{house.registrationDate}</td>
                <td className="d-flex gap-3">
                  <button className="btn btn-warning" onClick={() => handleShowEditModal(house)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => remove(house.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
