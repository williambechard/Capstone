//weird lint error saying modalValue not used, but it is in the function...
/**
 * Function for showing a modal.
 * Uses passed parameters so that ANY Modal state
 * can be set, and therefor shown with this function.
 * @param setModal -The Function which sets the State's value
 * @param modalValue -The current value of the state
 */
const triggerModal = (setModal, modalValue) => {
  setModal(modalValue => !modalValue); //uses arrow function to make sure current value is used and not stale data
};

export default triggerModal;
