import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { PanelChangeModal } from '../components/Models/Panel/PanelChangeModal';
import { PanelCreateModal } from '../components/Models/Panel/PanelCreateModal';
import { deletePanel, getPanels } from '../http/panelApi';
import { ISolarPanel } from '../interfaces/ISolarPanel';

export const Panels = () => {
    const [panels, setPanels] = useState<ISolarPanel[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<ISolarPanel>();
  
    const handleShowCreateModal = () => setCreateModal(true);
    const handleCloseCreateModal = () => setCreateModal(false);
  
    const handleShowEditModal = (data: ISolarPanel) => {
      setEditableData(data);
      setEditModal(true);
    }
  
    const handleCloseEditModal = () => {
      setEditModal(false);
    }
  
    const fetchItems = async () => {
      await getPanels()
        .then((data) => {
            setPanels(data);
        })
        .catch(() => alert("Error"));
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const remove = async (id: number) => {
      await deletePanel(id).then(() => {
        fetchItems();
      })
    }
  
    return (
      <div>
       <PanelCreateModal
          fetch={fetchItems}
          onHide={handleCloseCreateModal}
          show={createModal}
        ></PanelCreateModal>
  
        <PanelChangeModal
          item={editableData}
          fetch={fetchItems}
          show={editModal}
          onHide={handleCloseEditModal}
        ></PanelChangeModal>
        <h1>Solar Panels</h1>
  
        <p>
          <Button variant="primary" onClick={handleShowCreateModal}>
            Create New
          </Button>
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>House</th>
              <th>Name</th>
              <th>Frame color</th>
              <th>Type</th>
              <th>Installation date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {panels.map((panel) => (
              <tr key={panel.id}>
                <td>{panel.id}</td>
                <td>{panel.house?.address}</td>
                <td>{panel.name}</td>
                <td>{panel.frameColor}</td>
                <td>{panel.panelType?.technology}</td>
                <td>{panel.installationDate}</td>
                <td className="d-flex gap-3">
                  <button className="btn btn-warning" onClick={() => handleShowEditModal(panel)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => remove(panel.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
