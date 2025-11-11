import { FormError } from "./models/formError";

interface FormErrorsProps {
  errors: string[];
  formErrors: FormError[];
}

const FormErrors = ({ formErrors, errors }: FormErrorsProps) => {
  return (
    <>
      {errors.length > 0 && (
        <ul className="list-disc">
          {errors.map((err, index) => (
            <li key={index}>{err}</li>
          ))}
        </ul>
      )}
      {errors && (
        <ul className="list-disc">
          {formErrors.map((err, index) => (
            <li key={index}>
              {err.src} - {err.message}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default FormErrors;
