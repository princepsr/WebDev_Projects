import React from 'react'

function Navbar({filterData,category,setCategory}) {

  function clickHandler(title){
    setCategory(title);
  }

  return (
      <div className="w-11/12 mx-auto flex flex-wrap max-w-max space-x-4 gap-y-4 py-4 justify-center">
        {
            filterData.map((data)=>{
                return <button onClick={()=>clickHandler(data.title)} type='button' key={data.id} className={`
                text-lg px-2 py-1 rounded-md bg-black border-2 hover:bg-opacity-50 text-white transition-all duration-300 font-medium
                ${
                  category === data.title // if categ=data.title
                    ? "bg-opacity-60 border-white"
                    : "bg-opacity-40 border-transparent"
                }
                `}
                >{data.title}</button>;
            })
        }
    </div>
  )
}

export default Navbar