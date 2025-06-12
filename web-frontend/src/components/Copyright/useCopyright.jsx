import { useEffect, useMemo, useState } from "react";
import Copyright from "./Copyright";

export const useCopyright = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalCoords, setModalCoords] = useState({ top: 0, left: 0 });

  // Show copyright modal on right click
  const onRightClick = (event) => {
    event.preventDefault();
    requestAnimationFrame(() => setShowModal(true));
    setModalCoords({ left: event.clientX, top: event.clientY });
  };

  // Dismiss copyright modal
  useEffect(() => {
    const onClick = () => {
      setShowModal(false);
    };
    document.addEventListener("contextmenu", onClick);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("contextmenu", onClick);
    };
  }, []);

  // Copyright element to display
  const copyrightElement = useMemo(() => {
    return <Copyright showModal={showModal} modalCoords={modalCoords} />;
  }, [modalCoords, showModal]);

  return { copyrightElement, onRightClick };
};
