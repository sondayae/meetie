import { Spinner } from './Spinner';

type LoadingModalProps = {
  label?: string;
};

export default function LoadingModal({ label }: LoadingModalProps) {
  return (
    <div className="fixed inset-0 z-50 mx-auto flex max-w-[600px] flex-col items-center justify-center bg-white bg-opacity-75">
      <Spinner className="spinner h-16 w-16 animate-spin rounded-full" />
      <p className="text-primary">{label}</p>
    </div>
  );
}
