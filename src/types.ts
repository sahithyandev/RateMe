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

/**
 * A wrapper for Formik's values
 */
export interface FormObj {
  initialValues: object;
  handlers: FormHandlersObj;
}
