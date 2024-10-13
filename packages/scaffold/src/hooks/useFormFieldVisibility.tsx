import { useState, useCallback } from "react";

export const useFormFieldVisibility = <T extends string>(fields: T[]) => {
  const [visibleFields, setVisibleFields] = useState<T[]>([]);

  const showField = useCallback((field: T) => {
    setVisibleFields((prev) => [...prev, field]);
  }, []);

  const showNextField = useCallback(() => {
    const nextField = fields.find((field) => !visibleFields.includes(field));
    if (nextField != null) {
      showField(nextField);
    }
  }, [fields, showField, visibleFields]);

  const isFieldVisible = useCallback(
    (field: T) => visibleFields.includes(field),
    [visibleFields]
  );

  const isAllFieldsVisible = visibleFields.length === fields.length;

  return {
    visibleFields,
    showField,
    showNextField,
    isFieldVisible,
    isAllFieldsVisible,
  };
};
