import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Employee } from './employee.entity';

@Entity('attendances')
export class Attendance {
  @PrimaryGeneratedColumn()
  attendanceId: number;

  @Column({ name: 'leave_type', type: 'varchar', length: 50 })
  leaveType: string; // Loại phép (bệnh, thai sản, thường niên...)

  @Column({ name: 'date_start', type: 'timestamp' })
  dateStart: Date;

  @Column({ name: 'date_end', type: 'timestamp' })
  dateEnd: Date;

  @Column({ name: 'days', type: 'decimal', precision: 5, scale: 2 })
  days: number; // Số ngày nghỉ

  @Column({ type: 'text', nullable: true })
  note: string;

  @Column({ name: 'attachment', type: 'text', nullable: true })
  attachment: string; // link hình ảnh

  @ManyToOne(() => Employee, (employee) => employee.attendances, { onDelete: 'CASCADE' })
  employee: Employee;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
