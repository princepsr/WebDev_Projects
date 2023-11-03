import React from 'react'
import Card from './Card'
import { useState } from 'react';

function Cards({courses,category}) {

    const [likedCourses, setLikedCourses] = useState([]) // to store array of likedcourses

    const getCourses = ()=>{
        let allCourses = [];
        if(category==="All"){
            Object.values(courses).forEach((course) => {  // courses is object type converting to array to iterate
                course.forEach((element) => {  //for array inside object
                    allCourses.push(element);
                });
            });
        }
        else{
            return courses[category]; //courses contains 5 arrays, it returns array of category courses
        }
        return allCourses;
    }

    return (
        <div className="flex flex-wrap justify-center gap-4 mb-4">
            {
                getCourses().map((course)=>{
                    return <Card key={course.id} course={course} likedCourses={likedCourses} setLikedCourses={setLikedCourses}/>
                })
            }
        </div>
    )
}

export default Cards