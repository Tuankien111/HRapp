import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'employee_code', type: 'varchar', length: 50, unique: true })
  employeeCode: string; // Mã nhân viên

  @Column({ name: 'full_name', type: 'varchar', length: 100 })
  fullName: string; // Họ và tên

  @Column({ type: 'varchar', length: 10 })
  gender: string; // Giới tính

  @Column({ name: 'birth_date', type: 'date' })
  birthDate: Date; // Ngày sinh

  @Column({ name: 'citizen_id', type: 'varchar', length: 20, unique: true })
  citizenId: string; // Số CMND/CCCD

  @Column({ name: 'citizen_issued_date', type: 'date', nullable: true })
  citizenIssuedDate: Date; // Ngày cấp

  @Column({ name: 'nationality', type: 'varchar', length: 50 })
  nationality: string; // Quốc tịch

  @Column({ name: 'address', type: 'text' })
  address: string; // Địa chỉ

  @Column({ name: 'phone', type: 'varchar', length: 20 })
  phone: string; // Số điện thoại

  @Column({ name: 'start_date', type: 'date' })
  startDate: Date; // Ngày vào làm

  @Column({ name: 'department', type: 'varchar', length: 100 })
  department: string; // Bộ phận

  @Column({ name: 'position', type: 'varchar', length: 100 })
  position: string; // Chức vụ

  @Column({ name: 'contract_type', type: 'varchar', length: 50 })
  contractType: string; // Loại hợp đồng (Thử việc / Chính thức)

  @Column({ name: 'contract_signed_date', type: 'date', nullable: true })
  contractSignedDate: Date; // Ngày ký hợp đồng

  @Column({ name: 'contract_end_date', type: 'date', nullable: true })
  contractEndDate: Date; // Ngày hết hạn

  @Column({ name: 'status', type: 'varchar', length: 20, default: 'Thử việc' })
  status: string; // Trạng thái làm việc
  
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
  
  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
