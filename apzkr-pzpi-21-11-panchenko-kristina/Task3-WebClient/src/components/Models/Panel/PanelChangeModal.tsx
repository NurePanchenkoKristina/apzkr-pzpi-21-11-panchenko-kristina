import React, { useMemo, useState, useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { getHouses } from '../../../http/houseApi';
import { editPanel } from '../../../http/panelApi';
import { getPanelTypes } from '../../../http/panelTypeApi';
import { IPanelChangeData } from '../../../interfaces/ChangeInterfaces/IPanelChangeData';
import { IHouse } from '../../../interfaces/IHouse';
import { ISelect } from '../../../interfaces/ISelect';
import { ISolarPanel } from '../../../interfaces/ISolarPanel';
import { ISolarPanelType } from '../../../interfaces/ISolarPanelType';

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
    item?: ISolarPanel,
}

export const PanelChangeModal = ({ show, onHide, item, fetch }: IProps) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<IPanelChangeData>();
      const [houses, setHouses] = useState<IHouse[]>([]);
      const [panelTypes, setPanelTypes] = useState<ISolarPanelType[]>([]);

    
      useEffect(() => {
        if (item) {
          reset({
            ...item
          });
        }
      }, [item, reset]);
          
      const onSubmit = async (data: IPanelChangeData) => {
        await editPanel(data.id, data)
          .then(() => {
            onHide();
            fetch();
          })
          .catch(() => alert("Error"));
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
