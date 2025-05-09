
import LogisticsItem from './logistics-item';
import classes from './event-logistics.module.css';

function EventLogistics(props) {

  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
        <img src={`/${props.i}`} alt={props.t} />
      </div>
      <ul className={classes.list}>
        <LogisticsItem >
          <time>{props.d}</time>
        </LogisticsItem>
        <LogisticsItem >
          <address>{props.ad}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
}

export default EventLogistics;
