import { useEffect } from "react";
const AllowReturnUndefined = () => {
  useEffect(() => {}, []);
  const renderUndefined = () => {
    return undefined;
  };
  return (
    <div className="tearing">
      test return undefined
      {renderUndefined()}
    </div>
  );
};
export default AllowReturnUndefined;
