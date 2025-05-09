import classes from './event-content.module.css';

function EventContent(props) {
  return (
    <section className={classes.content}>
      <p>{props.data}</p>
    </section>
  );
}

export default EventContent;
