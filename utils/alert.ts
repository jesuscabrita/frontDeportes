import Swal from "sweetalert2";

export const alertaSubmit = (submit, message) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-right',
        iconColor: 'white',
        customClass: { popup: 'colored-toast'},
        showConfirmButton: false,
        timer: 5500,
        timerProgressBar: true
    });

    if (submit) {
        Toast.fire({
            icon: 'success',
            title: message
        });
    } else {
        Toast.fire({
            icon: 'error',
            title: message,
        });
    }
};