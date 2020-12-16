export interface CreateBoardData {
  name: string;
  description: string;
  passcode: string;
  unlockKey: string;
}
export interface FormHandlersObj {
  onSumbit: (values, q: object) => void;
  [key: string]: any;
}

export interface InputFieldObj {
  label: string;
  description?: string;
  placeholder?: string;
  isMultiLine?: boolean;
  isSecured?: boolean;
  isRequired?: boolean;
  initialValue: string;
}

export interface StrObject<Q> {
  [key: string]: Q;
}

/**
 * A wrapper for Formik's values
 */
export interface FormObj {
  // initialValues: object;
  handlers: FormHandlersObj;
  inputFields: StrObject<InputFieldObj>;
}

export interface BoardObj {
  name: string;
  description: string;
  feedbackCount: number;
}

export interface FeedbackObj {
  message: string;
}
