type GuideModalProps = {
  title: string | undefined;
  subtitle: string | undefined;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function guideModal({
  title,
  subtitle,
  onConfirm,
  onCancel,
}: GuideModalProps) {
  return (
    <>
      <h1>guideModal</h1>
    </>
  );
}
