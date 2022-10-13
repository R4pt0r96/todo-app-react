import { useSelector } from 'react-redux';

const Message = () => {
  const message = useSelector((state) => state.toDo.headMessage);
  return <p>{message}</p>;
};
export default Message;
