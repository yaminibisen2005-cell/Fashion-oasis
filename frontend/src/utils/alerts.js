import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import './alerts.css';

// Toast Mixin with luxury styling, smooth animations, and auto-close (3.5s)
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3500,
  timerProgressBar: true,
  customClass: {
    popup: 'fashion-oasis-toast-popup',
  },
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

// Custom Modal Alert Mixin
const CustomAlert = Swal.mixin({
  customClass: {
    popup: 'fashion-oasis-alert-popup',
    confirmButton: 'fashion-oasis-alert-btn-confirm',
    cancelButton: 'fashion-oasis-alert-btn-cancel',
  },
  buttonsStyling: false,
});

/**
 * Show toast notification (Auto-close 3.5s)
 * @param {'success'|'error'|'warning'|'info'} icon
 * @param {string} title
 */
export const showToast = (icon, title) => {
  return Toast.fire({
    icon,
    title,
  });
};

/**
 * Show modal alert popup (Requires user click)
 * @param {'success'|'error'|'warning'|'info'} icon
 * @param {string} title
 * @param {string} [text]
 */
export const showAlert = (icon, title, text = '') => {
  return CustomAlert.fire({
    icon,
    title,
    text,
    confirmButtonText: 'OK',
  });
};

/**
 * Show confirmation modal dialog replacing window.confirm
 * @param {string} title
 * @param {string} [text]
 * @param {string} [confirmButtonText]
 * @returns {Promise<boolean>} Resolves to true if confirmed, false otherwise
 */
export const showConfirm = async (
  title,
  text = '',
  confirmButtonText = 'Yes, Proceed'
) => {
  const result = await CustomAlert.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText: 'Cancel',
  });
  return result.isConfirmed;
};

// Shorthand notification helpers
export const notifySuccess = (msg) => showToast('success', msg);
export const notifyError = (msg) => showToast('error', msg);
export const notifyWarning = (msg) => showToast('warning', msg);
export const notifyInfo = (msg) => showToast('info', msg);
