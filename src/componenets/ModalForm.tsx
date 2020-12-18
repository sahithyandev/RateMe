import * as React from "react";
import { Modal, Form, Input } from "antd";
import { ModalProps } from "antd/lib/modal";
import { InputFieldObj } from "./../types";

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface Props {
  modalProps: ModalProps;
  onSubmit: (values) => void;
  inputField: InputFieldObj;
}

export const ModalForm: React.FC<Props> = ({
  modalProps,
  onSubmit,
  inputField,
}) => {
  const [form] = Form.useForm();
  const onSubmitInternal = () => {
    form
      .validateFields()
      .then(onSubmit)
      .catch((error) => {
        console.error("Validation error", error);
      });
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
        <Form.Item
          label={inputField.label}
          name={inputField.name || inputField.label}
          required={inputField.isRequired}
        >
          <Input
            type={inputField.type || "text"}
            placeholder={inputField.placeholder}
          />
        </Form.Item>
        <p className="form-item-description">{inputField.description}</p>
      </Form>
    </Modal>
  );
};
