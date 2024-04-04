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
        title: 'ດຳເນີນການສຳເລັດ!',
        text: message,
        icon: 'success',
        showConfirmButton: false,
        timer: 1500
    });
};


export const showConfirmationAlert = (onConfirm) => {
    Swal.fire({
        title: '<span style="font-size: smaller;">ທ່ານຕ້ອງການປ່ຽນສະຖານະແທ້ບໍ ?</span>',
        // text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: `ຕົກລົງ`,
        cancelButtonText: `ຍົກເລີກແລ້ວ`, // Edited cancelButtonText
    }).then((result) => {
        if (result.isConfirmed) {
            onConfirm();
            Swal.fire({
                position: "center",
                icon: "success",
                title: "ດຳເນີນການສຳເລັດ",
                showConfirmButton: false,
                timer: 1500
            });
        }
    });
};

