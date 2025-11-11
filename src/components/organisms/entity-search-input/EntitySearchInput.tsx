/* eslint-disable react-hooks/exhaustive-deps */
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { EntitySearchInputProps } from "./entitySearchInputProps";
import Modal from "../Modal/Modal";
import Input from "../EntityForm/inputs/Input";
import { useEntitySearchInput } from "./useEntitySearchInput";
import { CacheKey } from "@/models";
import { Query } from "@/models/query";

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
  const [value, setValue] = useState<T | null>();
  const initialDefaultValue = useRef(controlledValue);
  const { entity: fetchedDefaultValue } = useEntitySearchInput<T>({
    defaultValue: initialDefaultValue.current,
    cacheKey,
    onSearch,
  });

  useEffect(() => {
    if (fetchedDefaultValue && defaultValue) {
      setValue(fetchedDefaultValue);
    }
  }, [defaultValue, fetchedDefaultValue]);

  useEffect(() => {
    if (controlledValue && fetchedDefaultValue) {
      setValue(fetchedDefaultValue);
    }
  }, [fetchedDefaultValue]);

  useEffect(() => {
    if (controlledValue === undefined) {
      setValue(undefined);
    }
  }, [controlledValue]);

  const handleSelect = useCallback(
    (val: T) => {
      setValue(val);
      onChange?.(val);
      setShowModal(false);
    },
    [onChange],
  );

  const hiddenValue = useMemo(
    () => accesorFn(value ?? null)?.toString() ?? "",
    [value, accesorFn],
  );

  const visibleValue = useMemo(
    () => visibleValueFn(value ?? null) ?? "",
    [value, visibleValueFn],
  );

  return (
    <>
      <input
        type="hidden"
        value={hiddenValue}
        {...props}
        className="hidden"
        readOnly
      />
      <Input
        className={className}
        onClick={() => setShowModal(true)}
        placeholder={placeholder}
        value={visibleValue}
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
