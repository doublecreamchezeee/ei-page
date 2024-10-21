import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (let inputId in state.inputs) {
        if (state.inputs[inputId] === undefined) continue;
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    case "ARRAY_CHANGE":
      let formValid = true;
      for (let inputId in state.inputs) {
        if (state.inputs[inputId] === undefined) continue;

        if (inputId === action.inputId) {
          formValid = formValid && action.isValid;
        } else {
          formValid = formValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            value:
              action.value === "" ||
              action.value === "default" ||
              undefined ||
              state.inputs[action.inputId].value.includes(action.value)
                ? [...state.inputs[action.inputId].value]
                : [...state.inputs[action.inputId].value, action.value],
            isValid: action.isValid,
          },
        },
        isValid: formValid,
      };
    case "SET_DATA":
      return {
        inputs: {
          ...state.inputs,
          ...action.inputs,
        },
        isValid: action.validity,
      };
    default:
      return state;
  }
};
export const useForm = (initialInputs, initialValidity) => {

  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialValidity,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      inputId: id,
      value: value,
      isValid: isValid,
    });
  }, []);
  const arrayInputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "ARRAY_CHANGE",
      inputId: id,
      value: value,
      isValid: isValid,
    });
  }, []);

  const SetData = useCallback((newInputs, newValidity) => {
    dispatch({
      type: "SET_DATA",
      inputs: newInputs,
      validity: newValidity,
    });
  }, []);

  return { formState, inputHandler, SetData, arrayInputHandler };
  
};
