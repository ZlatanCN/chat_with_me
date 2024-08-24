import PropTypes from 'prop-types';
import { Avatar } from 'antd';

const ChatMessage = (props) => {
  const localTime = new Date(props.message.createdAt).toLocaleString();

  return (
    <>
      {props.isSender ? (
        <div>
          <div className={'flex flex-row gap-1.5'}>
            <div
              className={'bg-blue-300 max-w-xs w-auto h-auto rounded-lg flex items-center pl-2 ml-auto'}>
              <p className={'text-gray-800 text-sm mr-[8px] break-all mt-1.5 mb-1.5'}>
                {props.message.content}
              </p>
            </div>
            <Avatar src={props.avatar}/>
          </div>
          <time className={'ml-[296px] text-[8px] text-gray-300 opacity-60'}>
            {localTime}
          </time>
        </div>
      ) : (
        <div>
          <div className={'flex flex-row gap-1.5'}>
            <Avatar src={props.avatar}/>
            <div
              className={'bg-gray-300 max-w-xs w-auto h-auto rounded-lg flex items-center pl-2 mr-auto'}>
              <p className={'text-gray-800 text-sm mr-[8px] break-all mt-1.5 mb-1.5'}>
                {props.message.content}
              </p>
            </div>
          </div>
          <time className={'ml-[38px] text-[8px] text-gray-300 opacity-60'}>
            {localTime}
          </time>
        </div>
      )}
    </>
  );
};

ChatMessage.propTypes = {
  isSender: PropTypes.bool.isRequired,
  message: PropTypes.object.isRequired,
  avatar: PropTypes.string.isRequired,
};

ChatMessage.defaultProps = {
  message: '',
};

export default ChatMessage;