import { nextfinRequest } from '@/api/api-client';
import { Employee, EmployeeRole } from '@/types/Employee';

export type GetEmployeesResponse = Employee[];

export const fetchEmployees = async (
  roles?: EmployeeRole[]
): Promise<GetEmployeesResponse> => {
  const query = roles ? '?role=' + roles.join('&role=') : '';
  return await nextfinRequest('/employees' + query, 'GET');
};
