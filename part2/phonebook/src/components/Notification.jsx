/**
 * TODO: Receive an array of messages to display multiple
 * messages in succession, rather than replacing one
 * message with another.
 */

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className={message.type ?? 'success'}>{message.body}</div>;
};

export default Notification;
