import uuidv1 from 'uuid/v1'
import findIndex from 'lodash/findIndex'
import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from "./constants";

function flashMessageReducer(state = [], action) {
  switch (action.type) {
    case ADD_FLASH_MESSAGE:
      return [
        ...state,
        {
          id: uuidv1(),
          type: action.message.type,
          text: action.message.text
        }
      ]
    case DELETE_FLASH_MESSAGE:
      const index = findIndex(state, { id: action.id });
      if (index >= 0) {
        return [
          ...state.slice(0, index),
          ...state.slice(index + 1)
        ];
      }

    default:
      return state;
  }
}

export default flashMessageReducer;