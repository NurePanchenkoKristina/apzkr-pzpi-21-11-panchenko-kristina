import React, { useState, useEffect, useMemo } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { getHouses } from '../../../http/houseApi';
import { createWeatherData } from '../../../http/weatherApi';
import { IWeatherCreateData } from '../../../interfaces/CreateInterfaces/IWeatherCreateData';
import { IHouse } from '../../../interfaces/IHouse';
import { ISelect } from '../../../interfaces/ISelect';

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
}

export const WeatherDataCreateModal = ({show, onHide, fetch}: IProps) => {
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
      } = useForm<IWeatherCreateData>();
      const [houses, setHouses] = useState<IHouse[]>([]);

      const handleClose = () => {
        reset({})
        onHide();
      }
      
      const onSubmit = async (data: IWeatherCreateData) => {
        await createWeatherData(data)
          .then(() => {
            handleClose();
            fetch();
          }).catch(() => alert("Error"));
      };

      const fetchHouses = async () => {
        await getHouses().then((data) => setHouses(data));
      };

      useEffect(() => {
        fetchHouses();
      }, []);

      const selectHouses = useMemo<ISelect[]>(() => {
        return [
          { value: "0", label: "Select item..." },
          ...houses.map((house) => {
            return {
              value: house.id.toString(),
              label: `Id: ${house.id}, Address: ${house.address}`,
            };
          }),
        ];
      }, [houses]);

      return (
        <Modal show={show} onHide={handleClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div
                  asp-validation-summary="ModelOnly"
                  className="text-danger"
                ></div>
                <div className="form-group">
                  <label className="control-label">Temperature</label>
                  <Controller
                    control={control}
                    name={"temperature"}
                    rules={{
                      min: {
                        value: 0,
                        message: "Minimum 0"
                      },
                      required: "enter temperature",
                    }}
                    render={({ field }) => (
                      <input type="number" className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.temperature?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Humidity</label>
                  <Controller
                    control={control}
                    name={"humidity"}
                    rules={{
                      min: {
                        value: 0,
                        message: "Minimum 0"
                      },
                      required: "enter humidity",
                    }}
                    render={({ field }) => (
                      <input type="number" className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.humidity?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Precipitation</label>
                  <Controller
                    control={control}
                    name={"precipitation"}
                    rules={{
                      min: {
                        value: 0,
                        message: "Minimum 0"
                      },
                      required: "enter precipitation",
                    }}
                    render={({ field }) => (
                      <input type="number" className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.precipitation?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Date time</label>
                  <Controller
                    control={control}
                    name={"dateTime"}
                    rules={{
                      required: "enter date",
                    }}
                    render={({ field }) => (
                      <input className="form-control" type="datetime-local" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.dateTime?.message}</p>
                </div>
                <div className="form-group">
                <label className="control-label">House</label>
                <Controller
                  control={control}
                  name={"houseId"}
                  rules={{
                    required: "enter house",
                    validate: (data) => (data != 0 ? undefined : "Select house"),
                  }}
                  render={({ field }) => (
                    <select className="form-control" {...field}>
                      {selectHouses.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  )}
                ></Controller>
                <p style={{ color: "red" }}>{errors.houseId?.message}</p>
              </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Save
                </Button>
              </Modal.Footer>
            </form>
          </Modal>
      )
}
