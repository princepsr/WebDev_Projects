import React, { useEffect, useState } from "react";
import Title from "./Components/Title";
import Navbar from "./Components/Navbar";
import Cards from "./Components/Cards";
import Loading from "./Components/Loading";
import { filterData, apiUrl } from './data';
import { toast } from "react-toastify";


const App = () => {

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(filterData[0].title);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(apiUrl);
        const output = await res.json();
        setCourses(output.data); // doesnt set value to courses variable instantly
        // console.log(courses); this shows empty array because we are printing immediately and useState has not
        // updated variable yet, after sometime value gets updated
        setLoading(false);
      } catch (error) {
        toast.error("Something went wrong");
      }
    }
    fetchData();
  }, []);

  //console.log(courses); gets rendered two times once during rendering of component and second time when setCourses
  // has set the value. first time prints empty array second time prints data from api

  return (
    <div className="min-h-screen flex flex-col  bg-bgDark2">
      <Title />
      
      <div>
        <Navbar filterData={filterData} category={category} setCategory={setCategory} />
        <div className="w-11/12 max-w-[1200px] mx-auto flex flex-wrap justify-center items-center min-h-[50vh]">
          {loading ? (<Loading />) : (<Cards courses={courses} category={category}/>)}
        </div>
      </div>
    </div>
  )
};

export default App;