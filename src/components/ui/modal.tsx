"use client";

import React from "react";
import { X } from "lucide-react";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    width?: number;
}

export default function Modal({ open, onClose, title, children, width = 520 }: ModalProps) {
    if (!open) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" style={{ maxWidth: width }} onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 className="modal-title">{title}</h2>
                    <button className="btn btn-ghost btn-icon btn-sm" onClick={onClose}><X size={18} /></button>
                </div>
                <div className="modal-body">{children}</div>
            </div>
        </div>
    );
}
