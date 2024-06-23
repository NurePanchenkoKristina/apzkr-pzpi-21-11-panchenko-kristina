import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { PanelTypeChangeModal } from '../components/Models/PanelType/PanelTypeChangeModal';
import { PanelTypeCreateModal } from '../components/Models/PanelType/PanelTypeCreateModal';
import { deletePanelType, getPanelTypes } from '../http/panelTypeApi';
import { ISolarPanelType } from '../interfaces/ISolarPanelType';

export const PanelTypes = () => {
    const [types, setTypes] = useState<ISolarPanelType[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<ISolarPanelType>();
  
    const handleShowCreateModal = () => setCreateModal(true);
    const handleCloseCreateModal = () => setCreateModal(false);
  
    const handleShowEditModal = (data: ISolarPanelType) => {
      setEditableData(data);
      setEditModal(true);
    }
  
    const handleCloseEditModal = () => {
      setEditModal(false);
    }
  
    const fetchItems = async () => {
      await getPanelTypes()
        .then((data) => {
            setTypes(data);
        })
        .catch(() => alert("Error"));
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const remove = async (id: number) => {
      await deletePanelType(id).then(() => {
        fetchItems();
      })
    }
  
    return (
      <div>
       <PanelTypeCreateModal
          fetch={fetchItems}
          onHide={handleCloseCreateModal}
          show={createModal}
        ></PanelTypeCreateModal>
  
        <PanelTypeChangeModal
          item={editableData}
          fetch={fetchItems}
          show={editModal}
          onHide={handleCloseEditModal}
        ></PanelTypeChangeModal>
        <h1>Solar panel types</h1>
  
        <p>
          <Button variant="primary" onClick={handleShowCreateModal}>
            Create New
          </Button>
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Power</th>
              <th>Manufacturer</th>
              <th>Efficiency class</th>
              <th>Technology</th>
              <th>Cell type</th>
              <th>Cell configuration</th>
              <th>Warranty</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {types.map((type) => (
              <tr key={type.id}>
                <td>{type.id}</td>
                <td>{type.power}</td>
                <td>{type.manufacturer}</td>
                <td>{type.efficiencyClass}</td>
                <td>{type.technology}</td>
                <td>{type.cellType}</td>
                <td>{type.cellConfiguration}</td>
                <td>{type.warranty}</td>
                <td className="d-flex gap-3">
                  <button className="btn btn-warning" onClick={() => handleShowEditModal(type)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => remove(type.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
