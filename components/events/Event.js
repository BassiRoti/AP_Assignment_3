import Link from "next/link";
import styles from './Event.module.css';
import Button from "../ui/button";

export default function Event(props) {
    return (
        <li className={styles.item}>
            <img src={'/'+props.i} alt={props.t}/>
            <div className={styles.content}>
                <div className={styles.summary}>
                    <h2>{props.t}</h2>
                </div>
                
                <div className={styles.date}>
                    <time>{props.d}</time>
                </div>
                <div className={styles.address}>
                    <address>{props.loc}</address>
                </div>
            </div>
            <div className={styles.actions}>
                 <Button link={'/events/'+props.id}>Explore Event</Button>
            </div>
       </li>
      
    );
  }