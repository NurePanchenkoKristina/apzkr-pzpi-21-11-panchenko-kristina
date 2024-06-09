import React, {useEffect} from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { editCustomer } from '../../../http/customerApi';
import { ICustomerChangeData } from '../../../interfaces/ChangeInterfaces/ICustomerChangeData';
import { ICustomer } from '../../../interfaces/ICustomer';

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
    item?: ICustomer,
}

export const CustomerChangeModal = ({ show, onHide, item, fetch }: IProps) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<ICustomerChangeData>();
    
      useEffect(() => {
        if (item) {
          reset({
            ...item
          });
        }
      }, [item, reset]);
          
      const onSubmit = async (data: ICustomerChangeData) => {
        await editCustomer(data.id, data)
          .then(() => {
            onHide();
            fetch();
          })
          .catch(() => alert("Error"));
      };

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
                  <label className="control-label">Surname</label>
                  <Controller
                    control={control}
                    name={"surname"}
                    rules={{
                      required: "enter surname",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.surname?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Phone</label>
                  <Controller
                    control={control}
                    name={"phone"}
                    rules={{
                      required: "enter phone",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.phone?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Registration date</label>
                  <Controller
                    control={control}
                    name={"registrationDate"}
                    rules={{
                      required: "enter registration date",
                    }}
                    render={({ field }) => (
                      <input className="form-control" type="datetime-local" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.registrationDate?.message}</p>
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
