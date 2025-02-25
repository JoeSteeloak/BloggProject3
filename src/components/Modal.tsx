import React from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    onConfirm?: () => void; // En funktion för att hantera bekräftelsen
    confirmButtonText?: string; // Text för bekräftelseknappen
}

const Modal = ({ isOpen, onClose, title, message, onConfirm, confirmButtonText = "Bekräfta" }: ModalProps) => {
    if (!isOpen) return null;

    return (
        <div style={modalOverlayStyle}>
            <div style={modalContentStyle}>
                <h2>{title}</h2>
                <p>{message}</p>
                <div>
                    {onConfirm && (
                        <button onClick={onConfirm} style={buttonStyle}>{confirmButtonText}</button>
                    )}
                    <button onClick={onClose} style={buttonStyle}>Stäng</button>
                </div>
            </div>
        </div>
    );
};

const modalOverlayStyle = {
    position: "fixed" as "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

const modalContentStyle: React.CSSProperties = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    maxWidth: "500px",
    width: "100%",
    textAlign: "center" as "center",  // Typa det specifikt som "center"
};

const buttonStyle = {
    backgroundColor: "red",
    color: "white",
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
    margin: "10px",
};

export default Modal;
