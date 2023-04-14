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

export const alertaEdit =()=>{
    Swal.fire({
        title: 'Estas seguro?',
        text: "¡No podrás revertir esto!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#256d85',
        cancelButtonColor: '#b74848',
        cancelButtonText:'Calcelar',
        confirmButtonText: '¡Sí, Registrar!',
    }).then(async (result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Registrado!',
                'El equipo ha sido registrado a la liga.',
                'success'
                )
        }
    })
}