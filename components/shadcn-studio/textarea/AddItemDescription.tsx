import { useId } from "react";

import { Textarea } from "@/components/ui/textarea";

const AddItemDescription = () => {
  const id = useId();

  return (
    <div className="w-full space-y-2">
      <Textarea
        id={id}
        className="field-sizing-content max-h-30 min-h-12  resize-none "
      />
    </div>
  );
};

export default AddItemDescription;
