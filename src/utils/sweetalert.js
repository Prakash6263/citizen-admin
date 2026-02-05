import Swal from "sweetalert2"

export const showSuccess = (title, message = "") => {
  Swal.fire({
    icon: "success",
    title: title,
    text: message,
    confirmButtonColor: "#3085d6",
    confirmButtonText: "OK",
  })
}

export const showError = (title, message = "") => {
  Swal.fire({
    icon: "error",
    title: title,
    text: message,
    confirmButtonColor: "#d33",
    confirmButtonText: "OK",
  })
}

export const showWarning = (title, message = "") => {
  Swal.fire({
    icon: "warning",
    title: title,
    text: message,
    confirmButtonColor: "#f0ad4e",
    confirmButtonText: "OK",
  })
}

export const showInfo = (title, message = "") => {
  Swal.fire({
    icon: "info",
    title: title,
    text: message,
    confirmButtonColor: "#17a2b8",
    confirmButtonText: "OK",
  })
}

export const showConfirm = (title, message = "") => {
  return Swal.fire({
    icon: "question",
    title: title,
    text: message,
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
    cancelButtonText: "No",
  })
}
