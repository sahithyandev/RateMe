import * as React from "react";
import { Modal, Form, Input } from "antd";
import { ModalProps } from "antd/lib/modal";
import { InputFieldObj } from "./../types";
import { validateYupSchema } from "formik";

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface Props {
  modalProps: ModalProps;
  inputField: InputFieldObj;
  validaterFunction: (value) => boolean;
  errorMessage: string;
}

export const ModalForm: React.FC<Props> = ({
  modalProps,
  inputField,
  validaterFunction,
  errorMessage,
}) => {
  const [error, setError] = React.useState("");
  const [form] = Form.useForm();

  const onSubmitInternal = () => {
    if (validaterFunction) {
      const isCorrect = validaterFunction(
        form.getFieldValue(inputField.name || inputField.label)
      );
      console.log("validating internally", isCorrect);
      setError(isCorrect ? "" : errorMessage);
    }
  };
  return (
    <Modal {...modalProps} onOk={onSubmitInternal}>
      <Form
        form={form}
        layout="vertical"
        name="form_inside_modal"
        initialValues={{
          [inputField.name || inputField.label]: inputField.initialValue,
        }}
        requiredMark={true}
      >
        <Form.Item label={inputField.label} required={inputField.isRequired}>
          <Input
            type={inputField.type || "text"}
            name={inputField.name || inputField.label}
            placeholder={inputField.placeholder}
            value={inputField.initialValue}
          />
          {error ? <span className="error-message">* {error}</span> : null}
        </Form.Item>
        <p className="form-item-description">{inputField.description}</p>
      </Form>
    </Modal>
  );
};
