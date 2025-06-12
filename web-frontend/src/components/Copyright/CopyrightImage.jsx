import { useCopyright } from "./useCopyright";

const CopyrightImage = (props) => {
  const { onRightClick, copyrightElement } = useCopyright();
  return (
    <>
      <img onContextMenu={onRightClick} {...props} />
      {copyrightElement}
    </>
  );
};

export default CopyrightImage;
