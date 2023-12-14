import { useEffect, useState } from "react";
import { Employee, Employees } from "../services/employees";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Form, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./front.module.scss";

const saveSchema = Yup.object().shape({
  email: Yup.string().email("Email is invalid").required("Email is required"),
  firstName: Yup.string().required("First name is required"),
  middleName: Yup.string(),
  lastName: Yup.string().required("First name is required"),
  phone: Yup.number().required("Phone number is required"),
  address: Yup.string().required("Address is required"),
  contract: Yup.string().required("Contract is required"),
  startDate: Yup.date()
    .max(Yup.ref("finishDate"), "Start date can't be after Finish Date")
    .required("Start date is required"),
  finishDate: Yup.date().min(
    Yup.ref("startDate"),
    "Finish Date can't be before Start Date"
  ),
  onGoing: Yup.string().required("onGoing is required"),
  type: Yup.string().required("Employeement type is required"),
  hours: Yup.number()
    .min(1, "Minimum hours is 1")
    .max(38, "Maximum hours is 38")
    .required("Hours is required"),
});

export interface FormData {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phone: number;
  address: string;
  contract: string;
  startDate: Date;
  finishDate?: Date;
  onGoing: string;
  type: string;
  hours: number;
}

export interface PropInterface {
  employee: Employee;
  reloadData: any;
}

const EmployeeCard = ({ employee, reloadData }: PropInterface) => {
  const fullName = [];
  employee.firstName ? fullName.push(employee.firstName) : null;
  employee.middleName ? fullName.push(employee.middleName) : null;
  employee.lastName ? fullName.push(employee.lastName) : null;
  let date1 = new Date(employee.finishDate);
  let date2 = new Date(employee.startDate);
  let yearDiff = date1.getFullYear() - date2.getFullYear();
  const deleteById = async () => {
    await Employees.delete(employee.id)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    reloadData();
  };
  return (
    <div className={styles.card}>
      <div className={styles.card_heading}>
        <h3>{fullName.join(" ")}</h3>
        <div>
          <Link to={`/${employee.id}`}>
            <button className={styles.card_btn}>Edit</button>|
          </Link>
          <button className={styles.card_btn} onClick={deleteById}>
            Delete
          </button>
        </div>
      </div>
      <p className={styles.card_info}>
        {employee.contract.charAt(0).toUpperCase() + employee.contract.slice(1)}{" "}
        - {yearDiff}yrs
      </p>
      <p className={styles.card_info}>{employee.email}</p>
    </div>
  );
};

export const CreateEmployeeForm = ({ setShowModal, reloadData }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(saveSchema),
    defaultValues: { onGoing: "false" },
    mode: "all",
  });

  const formSubmit = async (data: FormData) => {
    console.log(data);
    await Employees.create(data)
      .then((response) => console.log(response))
      .catch((e) => console.error(e));
    setShowModal(false);
    reloadData();
  };

  return (
    <form className={styles.forms} onSubmit={handleSubmit(formSubmit)}>
      <h4>Personal information</h4>
      <label>
        First Name:
        <input type="text" {...register(`firstName`)} />
        {errors?.firstName && (
          <p className={styles.error}>{errors.firstName.message}</p>
        )}
      </label>

      <label>
        Middle Name:
        <input type="text" {...register(`middleName`)} />
        {errors?.middleName && (
          <p className={styles.error}>{errors.middleName.message}</p>
        )}
      </label>

      <label>
        Last Name:
        <input type="text" {...register(`lastName`)} />
        {errors?.lastName && (
          <p className={styles.error}>{errors.lastName.message}</p>
        )}
      </label>
      <h4>Contact Details</h4>
      <label>
        Email:
        <input type="email" {...register(`email`)} />
        {errors?.email && (
          <p className={styles.error}>{errors.email.message}</p>
        )}
      </label>

      <label>
        Phone:
        <input type="tel" {...register(`phone`)} />
        {errors?.phone && (
          <p className={styles.error}>{errors.phone.message}</p>
        )}
      </label>
      <label>
        Address:
        <input type="text" {...register(`address`)} />
        {errors?.address && (
          <p className={styles.error}>{errors.address.message}</p>
        )}
      </label>
      <h4>Employee status</h4>
      <label>
        What is the contract type?
        <input type="radio" {...register(`contract`)} value="permanent" />
        <label>Permanent</label>
        <input type="radio" {...register(`contract`)} value="contract" />
        <label>Contract</label>
        {errors?.contract && (
          <p className={styles.error}>{errors.contract.message}</p>
        )}
      </label>

      <label>
        Start Date
        <input type="date" {...register(`startDate`)} />
        {errors?.startDate && (
          <p className={styles.error}>{errors.startDate.message}</p>
        )}
      </label>

      <label>
        Finish Date
        <input type="date" {...register(`finishDate`)} />
        {errors?.finishDate && (
          <p className={styles.error}>{errors.finishDate.message}</p>
        )}
      </label>
      <label>
        <input type="checkbox" {...register("onGoing", { value: "true" })} />
        On going
      </label>
      {errors?.onGoing && (
        <p className={styles.error}>{errors.onGoing.message}</p>
      )}

      <label>
        Is this on a full-time or part-time basis?
        <input type="radio" {...register("type")} value="full" />
        <label>Full-time</label>
        <input type="radio" {...register("type")} value="part" />
        <label>Part-time</label>
        {errors?.type && <p className={styles.error}>{errors.type.message}</p>}
      </label>

      <label>
        Hours per week
        <input type="number" {...register("hours")} />
        {errors?.hours && (
          <p className={styles.error}>{errors.hours.message}</p>
        )}
      </label>
      <div>
        <button>Submit</button>
        <button onClick={() => setShowModal(false)}>Cancel</button>
      </div>
    </form>
  );
};

const Modal = ({ setShowModal, reloadData }: any) => {
  return (
    <div className={styles.modal}>
      <CreateEmployeeForm setShowModal={setShowModal} reloadData={reloadData} />
      <div
        className={styles.modal_outer}
        onClick={() => setShowModal(false)}></div>
    </div>
  );
};

const FrontPage = () => {
  const [data, setData] = useState<Employee[] | null>(null);
  const [showModal, setShowModal] = useState(false);

  const reloadData = async () => {
    await Employees.get()
      .then((data) => setData(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    reloadData();
  }, []);
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Employees' list</h1>
      </div>
      <div className={styles.info}>
        <p>Please click on 'Edit' to find more details of each employee</p>
        <button className={styles.addbtn} onClick={() => setShowModal(true)}>
          Add employee
        </button>
      </div>

      <div className={styles.container}>
        {data != null &&
          data.map((employee: any) => (
            <EmployeeCard employee={employee} reloadData={reloadData} />
          ))}
      </div>
      {showModal ? (
        <Modal setShowModal={setShowModal} reloadData={reloadData} />
      ) : null}
    </div>
  );
};
export default FrontPage;
