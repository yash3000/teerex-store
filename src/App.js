import Products from "./components/Products";

export const config = {
  endpoint: `https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart`,
};

function App() {
  return (
    <div className="App">
      <Products />
    </div>
  );
}

export default App;
