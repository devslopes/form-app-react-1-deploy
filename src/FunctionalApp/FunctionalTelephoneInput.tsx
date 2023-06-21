import { ChangeEventHandler, useRef } from "react";
import { isAllNumbers } from "../validations";
import { ErrorMessage } from "../ErrorMessage";

export type PhoneNumberState = [string, string, string];

export const FunctionalTelephoneInput = ({
  phoneNumberInput,
  setPhoneNumberInput,
  shouldShowError,
  errorMessage,
}: {
  phoneNumberInput: PhoneNumberState;
  setPhoneNumberInput: (input: PhoneNumberState) => void;
  shouldShowError: boolean;
  errorMessage: string;
}) => {
  const phoneNumberInput0RefRef = useRef<HTMLInputElement>(null);
  const phoneNumberInput1RefRef = useRef<HTMLInputElement>(null);
  const phoneNumberInput2RefRef = useRef<HTMLInputElement>(null);

  const maxLengths = [3, 3, 4];

  const phoneNumberRefs = [
    phoneNumberInput0RefRef,
    phoneNumberInput1RefRef,
    phoneNumberInput2RefRef,
  ];

  const handlePhoneNumberInput =
    (phoneNumberIndex: 0 | 1 | 2): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      const newValue = e.target.value;
      const nextRef = phoneNumberRefs[phoneNumberIndex + 1];
      const prevRef = phoneNumberRefs[phoneNumberIndex - 1];

      const maxLength = maxLengths[phoneNumberIndex];
      const shouldGotoNextFocus =
        phoneNumberIndex < 2 && newValue.length === maxLength;
      const shouldGotoPrevFocus = phoneNumberIndex > 0 && newValue.length === 0;

      if (!isAllNumbers(newValue)) return;

      if (newValue.length > maxLength) {
        return;
      }

      setPhoneNumberInput(
        phoneNumberInput.map((n, index) =>
          phoneNumberIndex === index ? newValue : n
        ) as PhoneNumberState
      );

      if (shouldGotoNextFocus) {
        nextRef.current?.focus();
      }
      if (shouldGotoPrevFocus) {
        prevRef.current?.focus();
      }
    };
  return (
    <>
      <div className="input-wrap">
        <label htmlFor="phone">Phone:</label>
        <div id="phone-input-wrap">
          <input
            type="text"
            id="phone-input-1"
            ref={phoneNumberInput0RefRef}
            onChange={handlePhoneNumberInput(0)}
            value={phoneNumberInput[0]}
            placeholder="555"
          />
          -
          <input
            type="text"
            id="phone-input-2"
            ref={phoneNumberInput1RefRef}
            onChange={handlePhoneNumberInput(1)}
            value={phoneNumberInput[1]}
            placeholder="555"
          />
          -
          <input
            type="text"
            id="phone-input-3"
            ref={phoneNumberInput2RefRef}
            onChange={handlePhoneNumberInput(2)}
            value={phoneNumberInput[2]}
            placeholder="5555"
          />
        </div>
      </div>
      <ErrorMessage message={errorMessage} show={shouldShowError} />
    </>
  );
};
