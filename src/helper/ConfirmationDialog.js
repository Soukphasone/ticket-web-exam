
import Swal from 'sweetalert2';

const ConfirmationDialog = ({ title, text, onConfirm }) => {
    const handleConfirm = () => {
        Swal.fire({
            title: title || 'Confirmation',
            text: text || 'Are you sure you want to proceed?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if (result.isConfirmed) {
                onConfirm();
            }
        });
    };

    // Render nothing directly, as this component handles the logic, not the UI.
    return null;
};

export default ConfirmationDialog;
