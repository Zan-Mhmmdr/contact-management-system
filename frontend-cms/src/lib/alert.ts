import Swal from "sweetalert2";

export const alertSuccess = async (message: string) => {
  return Swal.fire({
    icon: "success",
    title: "Success",
    text: message,
  });
};

export const alertError = async (message: string) => {
  return Swal.fire({
    icon: "error",
    title: "Error",
    text: message,
  });
};

export const alertConfirm = async (
  message: string,
  title = "Are you sure?",
  confirmButtonText = "Yes, delete it!",
  cancelButtonText = "Cancel"
) => {
  const result = await Swal.fire({
    icon: "question",
    title,
    text: message,
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText,
    cancelButtonText,
  });

  return result.isConfirmed;
};
