import { createContext, useState } from 'react';

export const AlertContext = createContext({});
export function AlertProvider({ children }) {
  const [alertInfo, setAlertInfo] = useState(null);
  const [openFailerAlert, setOpenFailerAlert] = useState(false);
  //clear all timeouts in case user triggered another alert and the perv one didnt finsih
  const sleep = (ms) =>
    new Promise((resolve) => {
      const highestId = window.setTimeout(() => {
        for (let i = highestId; i >= 0; i--) {
          window.clearInterval(i);
        }
      }, 0);
      setTimeout(resolve, ms);
    });
  // const location = useLocation();

  function setAlert(alert) {
    if (alert) {
      setOpenFailerAlert(false);
      handleOpenAlert(alert);
      setAlertInfo(alert);
    }
  }
  const handleCloseAlert = () => setOpenFailerAlert(false);
  const handleOpenAlert = async (alert) => {
    window.scrollTo(0, 0);
    setOpenFailerAlert(true);
    await sleep(alert.sleep || 5000);
    handleCloseAlert();
  };

  // useEffect(() => {
  //   const handleRemoveAlertInPageChange = async () => {
  //     await sleep(2000);
  //     handleCloseAlert();
  //   };
  //   handleRemoveAlertInPageChange();
  // }, [location]);
  return (
    <AlertContext.Provider
      value={{
        alertInfo,
        handleCloseAlert,
        setAlert,
        handleOpenAlert,
        openFailerAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
}
