import "./UserModal.style.css";

const UserModal = ({ onClose, user }) => {
    return (
        <div id="UserModal" className="view-modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>
                    &times;
                </span>
                <h3>User Data</h3>
                <div>
                    <div>
                        <label>Weight: {user.weight}</label>
                    </div>
                    <div>
                        <label>Item Name: {user.itemName}</label>
                    </div>
                    <div>
                        <label>Flammable: {user.flammable}</label>
                    </div>
                    <div>
                        <label>Fast Expiration: {user.fastExpiration}</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserModal;
