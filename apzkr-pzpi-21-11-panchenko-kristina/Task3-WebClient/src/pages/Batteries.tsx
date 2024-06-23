import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { BatteryChangeModal } from '../components/Models/Battery/BatteryChangeModal';
import { BatteryCreateModal } from '../components/Models/Battery/BatteryCreateModal';
import { deleteBatterie, getBatteries } from '../http/batteryApi';
import { IBattery } from '../interfaces/IBattery';

export const Batteries = () => {
    const [batteries, setBatteries] = useState<IBattery[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<IBattery>();
  
    const handleShowCreateModal = () => setCreateModal(true);
    const handleCloseCreateModal = () => setCreateModal(false);
  
    const handleShowEditModal = (data: IBattery) => {
      setEditableData(data);
      setEditModal(true);
    }
  
    const handleCloseEditModal = () => {
      setEditModal(false);
    }
  
    const fetchItems = async () => {
      await getBatteries()
        .then((data) => {
            setBatteries(data);
        })
        .catch(() => alert("Error"));
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const remove = async (id: number) => {
      await deleteBatterie(id).then(() => {
        fetchItems();
      })
    }
  
    return (
      <div>
       <BatteryCreateModal
          fetch={fetchItems}
          onHide={handleCloseCreateModal}
          show={createModal}
        ></BatteryCreateModal>
  
        <BatteryChangeModal
          item={editableData}
          fetch={fetchItems}
          show={editModal}
          onHide={handleCloseEditModal}
        ></BatteryChangeModal>
        <h1>Batteries</h1>
  
        <p>
          <Button variant="primary" onClick={handleShowCreateModal}>
            Create New
          </Button>
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Capacity</th>
              <th>Type</th>
              <th>Installation date</th>
              <th>House</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {batteries.map((battery) => (
              <tr key={battery.id}>
                <td>{battery.id}</td>
                <td>{battery.capacity}</td>
                <td>{battery.batteryType}</td>
                <td>{battery.installationDate}</td>
                <td>{battery.house?.address}</td>
                <td className="d-flex gap-3">
                  <button className="btn btn-warning" onClick={() => handleShowEditModal(battery)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => remove(battery.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
