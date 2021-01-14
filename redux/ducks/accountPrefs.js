const TOGGLE_DARKMODE = "toggle_darkmode";

export function toggleDarkMode() {
  return {
    type: TOGGLE_DARKMODE,
  };
}

const initialState = {
  darkMode: false,
};

export default function accountPrefsReducer(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_DARKMODE:
      return { ...state, darkMode: !state.darkMode };
    default:
      return state;
  }
}
