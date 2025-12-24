import { useId } from "react";
import { ChangeEventHandler } from "react";
import { Textarea } from "@/components/ui/TextArea";

const AddItemDescription = ({
  onChange,
}: {
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
}) => {
  const id = useId();

  return (
    <div className="w-full space-y-2">
      <Textarea
        onChange={onChange}
        id={id}
        className="field-sizing-content max-h-30 min-h-12  resize-none "
      />
    </div>
  );
};

export default AddItemDescription;
