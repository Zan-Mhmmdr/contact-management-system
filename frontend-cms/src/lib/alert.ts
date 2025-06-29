import Swal from "sweetalert2"

export const alertSuccess = async (message: string) => {
    return Swal.fire({
        icon: 'success',
        title: 'Success',
        text: message,
    })
}

export const alertError = async (message: string) => {
    return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
    })
}

export const alertConfirm = async (messege: string) => {
    const result = await Swal.fire({
        icon: 'question',
        title: 'Are you sure?',
        text: messege,
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: ' #3085d6',
        confirmButtonText: 'Yes, delete it!',
    })

    return result.isConfirmed
}
