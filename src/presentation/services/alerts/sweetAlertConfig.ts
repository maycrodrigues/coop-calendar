import Swal from 'sweetalert2';

export const defaultCustomClass = {
  confirmButton: 'px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mx-2',
  cancelButton: 'px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 mx-2',
  container: 'font-sans',
  popup: '',
  'swal2-modal-lg': 'max-w-3xl',
};

export const SwalConfig = Swal.mixin({
  customClass: defaultCustomClass,
  buttonsStyling: false,
});