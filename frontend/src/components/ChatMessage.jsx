import PropTypes from 'prop-types';
import { Avatar } from 'antd';

const ChatMessage = (props) => {
  return (
    <>
      {props.isSender ? (
        <div className={'flex flex-row gap-1.5'}>
          <div
            className={'bg-gray-300 max-w-xs w-auto h-auto rounded-lg flex items-center pl-2 break-words ml-auto'}>
            <p className={'text-gray-800 text-sm mr-1'}>
              {props.message}
            </p>
          </div>
          <Avatar src={props.avatar}/>
        </div>
      ) : (
        <div className={'flex flex-row gap-1.5'}>
          <Avatar src={props.avatar}/>
          <div
            className={'bg-gray-300 max-w-xs w-auto h-auto rounded-lg flex items-center pl-2 break-words mr-auto'}>
            <p className={'text-gray-800 text-sm mr-1'}>
              {props.message}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

ChatMessage.propTypes = {
  isSender: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

ChatMessage.defaultProps = {
  message: '',
};

export default ChatMessage;