import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
// import { getFeaturedEvents } from "@/dummy-data";
import EventList from "@/components/events/EventList";
import { useState } from "react";
import axios from "axios";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function FeaturedEventsPage(props) {

  console.log(props.data)
  return (
    <>

      <div style={{textAlign:"center",fontFamily:"cursive"}}>
        <h1>Home Page: All Featured Events</h1> 
        <EventList data={props.data}/>
      </div>
     
      </>

  );
}

export async function getStaticProps(){

  try{
    const fetched_data=await axios.get('https://events-aed8d-default-rtdb.firebaseio.com/events.json');
    return{
      props:{
        data:fetched_data.data
      }
    }
  }
  catch{
    return{
      props:{
        data:null
      }
    }
  }

  
}