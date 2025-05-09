import { useEffect, useState } from "react";
import Event from "./Event";
import styles from './EventList.module.css';

export default function EventList(props) {
  const [data,setdata]=useState([]);
  const d=[];
  useEffect(()=>{
    for(let key in props.data){
      d.push({
        id:key,
        ...props.data[key],
      })
    }
    setdata(d);
  },[props.data])

console.log(props.data)
    return (
        <div>
          <ul className={styles.list}>
            
            {data.map(event=>{
               return <Event id={event.id} t={event.title} i={event.image} d={event.date} loc={event.location}/>
            })}
          </ul>
        </div>
      
    );
  } 