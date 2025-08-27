
export class CreateEmployeeDto {
  employeeCode: string;
  fullName: string;
  gender: "Nam" | "Nữ";
  birthDate: Date;
  citizenId: string;
  citizenIssuedDate: Date;
  nationality: string;
  address?: string;
  phone?: string;
  startDate: Date;
  department: string;
  position: string;
  contractType: string;
  contractSignedDate?: Date;
  contractEndDate?: Date;
  status?: "Thử việc" | "Chính thức";
}
