import React, {useState} from 'react'
import PopUpContext from './PopUpContext';

const PopUpProvider = ({children}) => {

  const [showLoginPopup, setShowLoginPopup] = useState(false);
  return (
    <PopUpContext.Provider value={{showLoginPopup, setShowLoginPopup}}>
        {children}
    </PopUpContext.Provider>
  )
}

export default PopUpProvider
