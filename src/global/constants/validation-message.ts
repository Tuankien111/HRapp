import { STATUS_CODES } from "http";

export const ValidationMessage = { 
    REQUIRED: 'This field is required',
    // Attendance_record
    ATTENDANCE_DAYS: {
        MIN: "Số ngày nghỉ phải >= 0.5",
        MAX: "Số ngày nghỉ không vượt quá 3 ngày"
    },
    // Employee
    EMPLOYEE_CODE: {
        REQUIRE: "Mã nhân viên không được để trống",
        INVALID: "Mã nhân viên phải có dạng TK025xx (xx là số)"
    },
    FULLNAME: {
        REQUIRE: "Họ và tên không được để trống",
        INVALID: "Họ tên không hợp lệ (chữ cái đầu viết hoa, không chứa số/ký tự đặc biệt)"
    },
    GENDER: {
        INVALID: "Giới tính chỉ được là Nam hoặc Nữ"
    },
    BIRTHDAY: {
        INVALID: "Độ tuổi nhân viên không phù hợp (nhân viên phải từ 18 tuổi trở lên)"
    },
    PHONE: {
        INVALID: "Số điện thoại phải là 10-11 chữ số"
    },
    STATUS: {
        INVALID: "Trạng thái không hợp lệ (chỉ được là Thử việc hoặc Chính thức)"
    }



}