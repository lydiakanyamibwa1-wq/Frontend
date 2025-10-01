import { useEffect, type ReactNode } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
};

export default function Modal({ open, onClose, children, title }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!open) return null;
  return (
    <div aria-modal className="fixed inset-0 z-50 grid place-items-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div role="dialog" className="card relative z-10 w-[min(92vw,700px)] p-6">
        {title && <h3 className="mb-4 text-xl font-bold">{title}</h3>}
        {children}
        <button onClick={onClose} className="btn-outline mt-6 w-full">
          Close
        </button>
      </div>
    </div>
  );
}
