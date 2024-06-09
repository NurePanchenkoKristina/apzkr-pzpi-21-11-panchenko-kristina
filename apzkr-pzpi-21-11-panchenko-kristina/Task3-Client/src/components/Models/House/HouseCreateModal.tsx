import React, { useState, useEffect, useMemo } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { getCustomers } from '../../../http/customerApi';
import { createHouse } from '../../../http/houseApi';
import { IHouseCreateData } from '../../../interfaces/CreateInterfaces/IHouseCreateData';
import { ICustomer } from '../../../interfaces/ICustomer';
import { ISelect } from '../../../interfaces/ISelect';

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
}

export const HouseCreateModal = ({show, onHide, fetch}: IProps) => {
    const {
        control,
        reset,
        handleSubmit,
        formState: { errors },
      } = useForm<IHouseCreateData>();
      const [customers, setCustomers] = useState<ICustomer[]>([]);
    
      const handleClose = () => {
        reset({})
        onHide();
      }
      
      const onSubmit = async (data: IHouseCreateData) => {
        await createHouse(data)
          .then(() => {
            handleClose();
            fetch();
          }).catch(() => alert("Error"));
      };

      const fetchCustomers = async () => {
        await getCustomers().then((data) => setCustomers(data));
      };

      useEffect(() => {
        fetchCustomers();
      }, []);

      const selectCustomers = useMemo<ISelect[]>(() => {
        return [
          { value: "0", label: "Select item..." },
          ...customers.map((customer) => {
            return {
              value: customer.id.toString(),
              label: `Id: ${customer.id}, Name: ${customer.surname} ${customer.name}`,
            };
          }),
        ];
      }, [customers]);
          
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
                  <label className="control-label">Address</label>
                  <Controller
                    control={control}
                    name={"address"}
                    rules={{
                      required: "enter address",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.address?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">City</label>
                  <Controller
                    control={control}
                    name={"city"}
                    rules={{
                      required: "enter city",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.city?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Region</label>
                  <Controller
                    control={control}
                    name={"region"}
                    rules={{
                      required: "enter region",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.region?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Postal code</label>
                  <Controller
                    control={control}
                    name={"postalCode"}
                    rules={{
                      required: "enter postal code",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.postalCode?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Country</label>
                  <Controller
                    control={control}
                    name={"country"}
                    rules={{
                      required: "enter country",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.country?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Registration date</label>
                  <Controller
                    control={control}
                    name={"registrationDate"}
                    rules={{
                      required: "enter date",
                    }}
                    render={({ field }) => (
                      <input className="form-control" type="datetime-local" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.registrationDate?.message}</p>
                </div>
                <div className="form-group">
                <label className="control-label">Customer</label>
                <Controller
                  control={control}
                  name={"customerId"}
                  rules={{
                    required: "enter customer",
                    validate: (data) => (data != 0 ? undefined : "Select customer"),
                  }}
                  render={({ field }) => (
                    <select className="form-control" {...field}>
                      {selectCustomers.map(({ value, label }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  )}
                ></Controller>
                <p style={{ color: "red" }}>{errors.customerId?.message}</p>
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
