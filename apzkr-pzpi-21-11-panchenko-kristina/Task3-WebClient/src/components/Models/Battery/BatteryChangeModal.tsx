import React, { useEffect, useState, useMemo } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { editBatterie } from '../../../http/batteryApi';
import { getHouses } from '../../../http/houseApi';
import { IBatteryChangeData } from '../../../interfaces/ChangeInterfaces/IBatteryChangeData';
import { IBattery } from '../../../interfaces/IBattery';
import { IHouse } from '../../../interfaces/IHouse';
import { ISelect } from '../../../interfaces/ISelect';

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
    item?: IBattery,
}

export const BatteryChangeModal = ({ show, onHide, item, fetch }: IProps) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<IBatteryChangeData>();
      const [houses, setHouses] = useState<IHouse[]>([]);

    
      useEffect(() => {
        if (item) {
          reset({
            ...item
          });
        }
      }, [item, reset]);
          
      const onSubmit = async (data: IBatteryChangeData) => {
        await editBatterie(data.id, data)
          .then(() => {
            onHide();
            fetch();
          })
          .catch(() => alert("Error"));
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
        <Modal show={show} onHide={onHide}>
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
                <Button variant="secondary" onClick={onHide}>
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
