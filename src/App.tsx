import "./App.css";
import { FilterContainer } from "./Components/FilterContainer/FilterContainer";
import { FilterProvider } from "./Context/FilterContextProvider";

export const App: React.FC = () => {
  return (
    <FilterProvider>
      <FilterContainer />
    </FilterProvider>
  )
};
