import React,{useState} from "react";
import Tours from "./Components/Tours"
import Data from "./data"


function App() {
  const [tours, setTours] = useState(Data);

  function removeTour(id){
    const newTours = tours.filter(tour => tour.id!==id); //filter tour where tour.id=id
    setTours(newTours);
  }

  if(tours.length===0){
    return(
      <div className="refresh">
        <h2>No Tours Left</h2>
        <button type="button"className="refreshBtn"  onClick={()=>setTours(Data)}>Refresh</button>
      </div>
    );
  }

  return (
    <div>
      <Tours tours={tours} removeTour={removeTour}/>
    </div>
  );
}

export default App;