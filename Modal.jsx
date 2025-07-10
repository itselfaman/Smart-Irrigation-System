function Modal({ show, onClose, message }) {
  if (!show) return null

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="modal" onClick={handleBackdropClick}>
      <div className="modal-content">
        <span className="close-btn" onClick={onClose}>&times;</span>
        <p id="modal-message">{message}</p>
      </div>
    </div>
  )
}

export default Modal