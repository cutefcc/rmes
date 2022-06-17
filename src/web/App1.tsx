import AsyncFn from "./components/AsyncFn";
import JotaiTearing from "./components/JotaiTearing";
import RecoilTearing from "./components/RecoilTearing";
import AllowReturnUndefined from "./components/AllowReturnUndefined";
function App() {
  return (
    <div className="App">
      {/* <AsyncFn /> */}
      {/* <JotaiTearing /> */}
      <RecoilTearing />
      <AllowReturnUndefined />
    </div>
  );
}

export default App;
