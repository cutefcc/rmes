import { Virtuoso } from 'react-virtuoso';

const ReactVirtuoso = () => {
  return (
    <>
      <Virtuoso
        style={{ height: '400px' }}
        totalCount={200}
        itemContent={index => <div>Item {index}</div>}
      />
      <div className="csstest">
        custom properties & var():
        <a>test a</a>
      </div>
    </>
  );
};
export default ReactVirtuoso;
