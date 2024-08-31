import {useModel} from "@@/exports";

const { initialState } = useModel('@@initialState');

export const getNowSystemTheme = () => {
  if (initialState.settings.navTheme === "light"){
    return 'light'
  }else {
    return 'dark'
  }
}
