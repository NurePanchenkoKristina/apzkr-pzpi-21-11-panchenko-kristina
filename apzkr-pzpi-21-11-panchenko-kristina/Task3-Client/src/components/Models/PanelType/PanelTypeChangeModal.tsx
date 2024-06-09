import React, { useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { editPanelType } from '../../../http/panelTypeApi';
import { IPanelTypeChangeData } from '../../../interfaces/ChangeInterfaces/IPanelTypeChangeData';
import { IPanelTypeCreateData } from '../../../interfaces/CreateInterfaces/IPanelTypeCreateData';
import { ISolarPanelType } from '../../../interfaces/ISolarPanelType';

interface IProps {
    show: boolean,
    onHide: () => void,
    fetch: () => void,
    item?: ISolarPanelType,
}

export const PanelTypeChangeModal = ({ show, onHide, item, fetch }: IProps) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm<IPanelTypeChangeData>();

      useEffect(() => {
        if (item) {
          reset({
            ...item
          });
        }
      }, [item, reset]);
          
      const onSubmit = async (data: IPanelTypeChangeData) => {
        await editPanelType(data.id, data)
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
                  <label className="control-label">Manufacturer</label>
                  <Controller
                    control={control}
                    name={"manufacturer"}
                    rules={{
                      required: "enter manufacturer",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.manufacturer?.message}</p>
                </div>
                 <div className="form-group">
                  <label className="control-label">Efficiency class</label>
                  <Controller
                    control={control}
                    name={"efficiencyClass"}
                    rules={{
                      required: "enter efficiency class",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.efficiencyClass?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Technology</label>
                  <Controller
                    control={control}
                    name={"technology"}
                    rules={{
                      required: "enter technology",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.technology?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Cell type</label>
                  <Controller
                    control={control}
                    name={"cellType"}
                    rules={{
                      required: "enter cell type",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.cellType?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Cell Configuration</label>
                  <Controller
                    control={control}
                    name={"cellConfiguration"}
                    rules={{
                      required: "enter cell configuration",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.cellConfiguration?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Warranty</label>
                  <Controller
                    control={control}
                    name={"warranty"}
                    rules={{
                      required: "enter warranty",
                    }}
                    render={({ field }) => (
                      <input className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.warranty?.message}</p>
                </div>
                <div className="form-group">
                  <label className="control-label">Power</label>
                  <Controller
                    control={control}
                    name={"power"}
                    rules={{
                      min: {
                        value: 0,
                        message: "Minimum 0"
                      },
                      required: "enter power",
                    }}
                    render={({ field }) => (
                      <input type="number" className="form-control" {...field} />
                    )}
                  ></Controller>
                  <p style={{ color: "red" }}>{errors.power?.message}</p>
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
