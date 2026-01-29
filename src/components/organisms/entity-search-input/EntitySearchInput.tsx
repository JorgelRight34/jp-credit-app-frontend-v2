import { ReactNode, useMemo, useState } from "react";
import { EntitySearchInputProps } from "./entitySearchInputProps";
import { useEntitySearchInput } from "./useEntitySearchInput";
import { CacheKey } from "@/models";
import { Query } from "@/models/query";
import { Input } from "@/components/atoms";
import { Modal } from "../modal";

type EntitySearchInputComponentProps<
  T,
  TData extends Query,
> = EntitySearchInputProps<T, TData> & {
  label?: string;
  modalProps: { title: string; height: string; width: string };
  cacheKey: CacheKey;
  accesorFn: (val: T | null) => string | number | Date | undefined | null;
  visibleValueFn: (val: T | null) => string | undefined;
  render: (setValue: (val: T) => void) => ReactNode;
  onSearch: (val: number) => Promise<T>;
};

const EntitySearchInput = <T, TData extends Query>({
  value: controlledValue,
  placeholder,
  label = "",
  floatingLabel = !!label,
  className = "",
  defaultValue,
  isDisabled = false,
  modalProps,
  cacheKey,
  error,
  render,
  onSearch,
  onChange,
  accesorFn,
  visibleValueFn,
  ...props
}: EntitySearchInputComponentProps<T, TData>) => {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<T>();
  /* eslint-disable react-hooks/exhaustive-deps */
  const initialDefaultValue = useMemo(() => controlledValue, []);

  const { entity: fetchedDefaultValue } = useEntitySearchInput<T>({
    defaultValue: initialDefaultValue,
    cacheKey,
    onSearch,
  });

  const value = useMemo(() => {
    if (controlledValue === undefined) {
      return undefined;
    }

    if (selected) {
      return selected;
    }

    if (fetchedDefaultValue && controlledValue) {
      return fetchedDefaultValue;
    }
  }, [controlledValue, defaultValue, fetchedDefaultValue]);

  const handleSelect = (val: T) => {
    onChange?.(val);
    setSelected(val);
    setShowModal(false);
  };

  return (
    <>
      <input
        type="hidden"
        value={accesorFn(value ?? null)?.toString() ?? ""}
        {...props}
        className="hidden"
        readOnly
      />
      <Input
        className={className}
        onClick={() => setShowModal(true)}
        placeholder={placeholder}
        value={visibleValueFn(value ?? null) ?? ""}
        disabled={isDisabled || false}
        label={floatingLabel ? label : undefined}
        error={error}
        readOnly={true}
      />
      <Modal
        {...modalProps}
        onHide={() => setShowModal(false)}
        show={showModal}
      >
        {render(handleSelect)}
      </Modal>
    </>
  );
};

export default EntitySearchInput;
