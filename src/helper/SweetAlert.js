// SweetAlert.js
import Swal from "sweetalert2";

export const showErrorAlert = (message) => {
    Swal.fire({
        title: 'ດຳເນີນການບໍ່ສຳເລັດ!',
        text: message,
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
    });
};

export const showSuccessAlert = (message) => {
    Swal.fire({
        title: 'Thực hiện thành công ',
        text: message,
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
    });
};


export const showConfirmationAlert = (onConfirm) => {
    Swal.fire({
        title: '<span style="font-size: smaller;">Bạn có muốn thay đổi trạng thái ?</span>',
        // text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: `Đồng ý`,
        cancelButtonText: `Hủy bỏ`, // Edited cancelButtonText
    }).then((result) => {
        if (result.isConfirmed) {
            onConfirm();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Thực hiện thành công ",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
};

