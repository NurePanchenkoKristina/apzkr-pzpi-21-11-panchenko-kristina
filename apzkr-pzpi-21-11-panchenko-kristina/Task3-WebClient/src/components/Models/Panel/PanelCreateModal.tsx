import React, { useState, useEffect, useMemo } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { getHouses } from '../../../http/houseApi';
import { createPanel } from '../../../http/panelApi';
import { getPanelTypes } from '../../../http/panelTypeApi';
import { IPanelCreateData } from '../../../interfaces/CreateInterfaces/IPanelCreateData';
import { IHouse } from '../../../interfaces/IHouse';
import { ISelect } from '../../../interfaces/ISelect';
import { ISolarPanelType } from '../../../interfaces/ISolarPanelType';

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
}

export const PanelCreateModal = ({show, onHide, fetch}: IProps) => {
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
      } = useForm<IPanelCreateData>();
      const [houses, setHouses] = useState<IHouse[]>([]);
      const [panelTypes, setPanelTypes] = useState<ISolarPanelType[]>([]);
    
      const handleClose = () => {
        reset({})
        onHide();
      }
      
      const onSubmit = async (data: IPanelCreateData) => {
        await createPanel(data)
          .then(() => {
            handleClose();
            fetch();
          }).catch(() => alert("Error"));
      };

      const fetchHouses = async () => {
        await getHouses().then((data) => setHouses(data));
      };

      const fetchPanelTypes = async () => {
        await getPanelTypes().then((data) => setPanelTypes(data));
      };

      useEffect(() => {
        fetchHouses();
        fetchPanelTypes();
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

      const selectPanelTypes = useMemo<ISelect[]>(() => {
        return [
          { value: "0", label: "Select item..." },
          ...panelTypes.map((type) => {
            return {
              value: type.id.toString(),
              label: `Id: ${type.id}, Type: ${type.manufacturer} - ${type.technology} - ${type.power}`,
            };
          }),
        ];
      }, [panelTypes]);
          
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
                  <label className="control-label">Name</label>
                  <Controller
                    control={control}
                    name={"name"}
                    rules={{
                      required: "enter name",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.name?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Frame color</label>
                  <Controller
                    control={control}
                    name={"frameColor"}
                    rules={{
                      required: "enter frameColor",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.frameColor?.message}</p>
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
              <div className="form-group">
                <label className="control-label">Type</label>
                <Controller
                  control={control}
                  name={"panelTypeId"}
                  rules={{
                    required: "enter type",
                    validate: (data) => (data != 0 ? undefined : "Select type"),
                  }}
                  render={({ field }) => (
                    <select className="form-control" {...field}>
                      {selectPanelTypes.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  )}
                ></Controller>
                <p style={{ color: "red" }}>{errors.panelTypeId?.message}</p>
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
