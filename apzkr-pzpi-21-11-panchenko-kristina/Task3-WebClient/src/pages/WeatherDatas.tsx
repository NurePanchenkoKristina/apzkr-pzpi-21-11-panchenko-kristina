import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { WeatherDataChangeModal } from '../components/Models/WeatherData/WeatherDataChangeModal';
import { WeatherDataCreateModal } from '../components/Models/WeatherData/WeatherDataCreateModal';
import { deleteWeatherData, getWeatherDatas } from '../http/weatherApi';
import { IWeatherData } from '../interfaces/IWeatherData';

export const WeatherDatas = () => {
    const [weatherDatas, setWeatherDatas] = useState<IWeatherData[]>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [editableData, setEditableData] = useState<IWeatherData>();
  
    const handleShowCreateModal = () => setCreateModal(true);
    const handleCloseCreateModal = () => setCreateModal(false);
  
    const handleShowEditModal = (data: IWeatherData) => {
      setEditableData(data);
      setEditModal(true);
    }
  
    const handleCloseEditModal = () => {
      setEditModal(false);
    }
  
    const fetchItems = async () => {
      await getWeatherDatas()
        .then((data) => {
            setWeatherDatas(data);
        })
        .catch(() => alert("Error"));
    };
  
    useEffect(() => {
      fetchItems();
    }, []);
  
    const remove = async (id: number) => {
      await deleteWeatherData(id).then(() => {
        fetchItems();
      })
    }
  
    return (
      <div>
       <WeatherDataCreateModal
          fetch={fetchItems}
          onHide={handleCloseCreateModal}
          show={createModal}
        ></WeatherDataCreateModal>
  
        <WeatherDataChangeModal
          item={editableData}
          fetch={fetchItems}
          show={editModal}
          onHide={handleCloseEditModal}
        ></WeatherDataChangeModal>
        <h1>Weather data</h1>
  
        <p>
          <Button variant="primary" onClick={handleShowCreateModal}>
            Create New
          </Button>
        </p>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Date time</th>
              <th>Temperature</th>
              <th>Humidity</th>
              <th>Precipitation</th>
              <th>House</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {weatherDatas.map((data) => (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.dateTime}</td>
                <td>{data.temperature}</td>
                <td>{data.humidity}</td>
                <td>{data.precipitation}</td>
                <td>{data.house?.address}</td> 
                <td className="d-flex gap-3">
                  <button className="btn btn-warning" onClick={() => handleShowEditModal(data)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => remove(data.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}
