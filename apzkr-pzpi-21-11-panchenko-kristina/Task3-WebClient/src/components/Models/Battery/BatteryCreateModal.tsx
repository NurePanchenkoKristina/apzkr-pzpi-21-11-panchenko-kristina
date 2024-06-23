import React, { useEffect, useState, useMemo } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { createBatterie } from '../../../http/batteryApi';
import { getHouses } from '../../../http/houseApi';
import { IBatteryCreateData } from '../../../interfaces/CreateInterfaces/IBatteryCreateData';
import { IHouse } from '../../../interfaces/IHouse';
import { ISelect } from '../../../interfaces/ISelect';

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
}

export const BatteryCreateModal = ({show, onHide, fetch}: IProps) => {
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
      } = useForm<IBatteryCreateData>();
      const [houses, setHouses] = useState<IHouse[]>([]);
    
      const handleClose = () => {
        reset({})
        onHide();
      }
      
      const onSubmit = async (data: IBatteryCreateData) => {
        await createBatterie(data)
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
                  <label className="control-label">Battery type</label>
                  <Controller
                    control={control}
                    name={"batteryType"}
                    rules={{
                      required: "enter battery type",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.batteryType?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Installation date</label>
                  <Controller
                    control={control}
                    name={"installationDate"}
                    rules={{
                      required: "enter date",
                    }}
                    render={({ field }) => (
                      <input className="form-control" type="datetime-local" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.installationDate?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Capacity</label>
                  <Controller
                    control={control}
                    name={"capacity"}
                    rules={{
                      min: {
                        value: 0,
                        message: "Minimum 0"
                      },
                      required: "enter capacity",
                    }}
                    render={({ field }) => (
                      <input type="number" className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.capacity?.message}</p>
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
