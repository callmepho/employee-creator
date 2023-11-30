import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { Employees } from "../services/employees";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./employee.module.scss";

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
  onGoing: Yup.boolean().required("onGoing is required"),
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
  onGoing: boolean;
  type: string;
  hours: number;
}

export interface Props {
  employee: FormData;
  id: any;
}

export const EmployeeForm = ({ employee, id }: Props) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(saveSchema),
    defaultValues: employee,
    mode: "all",
  });

  const formSubmit = async (data: FormData) => {
    await Employees.patch(parseInt(id as string), data)
      .then((response) => console.log(response))
      .catch((e) => console.error(e));
    navigate("/");
  };

  useEffect(() => {
    if (employee) {
      reset(employee);
    }
  }, [employee]);

  return (
    <form className={styles.forms} onSubmit={handleSubmit(formSubmit)}>
      <h3>Personal information</h3>
      <label className={styles.label}>
        First Name:
        <input type="text" {...register(`firstName`)} />
        {errors?.firstName && (
          <p className={styles.error}>{errors.firstName.message}</p>
        )}
      </label>

      <label className={styles.label}>
        Middle Name:
        <input type="text" {...register(`middleName`)} />
        {errors?.middleName && (
          <p className={styles.error}>{errors.middleName.message}</p>
        )}
      </label>

      <label className={styles.label}>
        Last Name:
        <input type="text" {...register(`lastName`)} />
        {errors?.lastName && (
          <p className={styles.error}>{errors.lastName.message}</p>
        )}
      </label>

      <h3>Contact details</h3>
      <label className={styles.label}>
        Email:
        <input type="email" {...register(`email`)} />
        {errors?.email && (
          <p className={styles.error}>{errors.email.message}</p>
        )}
      </label>

      <label className={styles.label}>
        Phone:
        <input type="tel" {...register(`phone`)} />
        {errors?.phone && (
          <p className={styles.error}>{errors.phone.message}</p>
        )}
      </label>

      <label className={styles.label}>
        Address:
        <input type="text" {...register(`address`)} />
        {errors?.address && (
          <p className={styles.error}>{errors.address.message}</p>
        )}
      </label>

      <h3>Employee status</h3>
      <label className={styles.label}>
        What is the contract type?
        <div>
          <input type="radio" {...register(`contract`)} value="permanent" />
          <label>Permanent</label>
        </div>
        <div>
          <input type="radio" {...register(`contract`)} value="contract" />
          <label>Contract</label>
        </div>
        {errors?.contract && (
          <p className={styles.error}>{errors.contract.message}</p>
        )}
      </label>

      <label className={styles.label}>
        Start Date
        <input type="date" {...register(`startDate`)} />
        {errors?.startDate && (
          <p className={styles.error}>{errors.startDate.message}</p>
        )}
      </label>

      <label className={styles.label}>
        Finish Date
        <input type="date" {...register(`finishDate`)} />
        {errors?.finishDate && (
          <p className={styles.error}>{errors.finishDate.message}</p>
        )}
      </label>
      <label>
        <input type="checkbox" {...register("onGoing", { value: true })} />
        On going
      </label>
      {errors?.onGoing && (
        <p className={styles.error}>{errors.onGoing.message}</p>
      )}

      <label className={styles.label}>
        Is this on a full-time or part-time basis?
        <div>
          <input type="radio" {...register("type")} value="full" />
          <label>Full-time</label>
        </div>
        <div>
          <input type="radio" {...register("type")} value="part" />
          <label>Part-time</label>
        </div>
        {errors?.type && <p className={styles.error}>{errors.type.message}</p>}
      </label>

      <label className={styles.label}>
        Hours per week
        <input type="number" {...register("hours")} />
        {errors?.hours && (
          <p className={styles.error}>{errors.hours.message}</p>
        )}
      </label>
      <div>
        <button className={styles.forms_btn}>Save</button>
        <button className={styles.forms_btn} onClick={() => navigate("/")}>
          Back
        </button>
      </div>
    </form>
  );
};
const EmployeePage = () => {
  const { id } = useParams();
  const [data, setData] = useState<any | null>(null);
  useEffect(() => {
    if (!id) {
      return;
    }
    Employees.find(parseInt(id as string)).then((data) => {
      setData(data);
    });
  }, [id]);
  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Employees Details</h1>
      </div>
      <EmployeeForm employee={data} id={id} />
    </div>
  );
};
export default EmployeePage;
