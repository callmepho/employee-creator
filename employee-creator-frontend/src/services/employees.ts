import { FormData } from "../pages/employee";
import instance from "./axios";

export interface Employee {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: number;
  address: string;
  contract: string;
  startDate: string;
  finishDate: string;
  onGoing: string;
  type: string;
  hours: number;
}

export class Employees {
  public static async get(): Promise<Employee[]> {
    const data = await instance.get("/employees");
    console.log(data);
    return data.data.map((employee: Employee) => ({
      ...employee,
      startDate: new Date(employee.startDate),
      finishDate: new Date(employee.finishDate),
    }));
  }

  public static async create(data: any): Promise<any> {
    await instance.post("/employees", data);
    return;
  }

  public static async find(id: number): Promise<Employee> {
    const data = await instance.get(`/employees/${id}`);
    console.log(data);
    return data.data;
  }

  public static async patch(id: number, data: FormData): Promise<any> {
    const response = await instance.patch(`/employees/${id}`, data);
    console.log(data);
    return response.data;
  }

  public static async delete(id: number): Promise<any> {
    const response = await instance.delete(`/employees/${id}`);
    return response.data;
  }
}
