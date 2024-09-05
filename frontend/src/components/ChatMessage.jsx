import PropTypes from 'prop-types';
import { Avatar, Image } from 'antd';
import { Buffer } from 'buffer';

const ChatMessage = (props) => {
  const localTime = new Date(props.message.createdAt).toLocaleString();
  const imageSrc = props.message.imageObj ? `data:image/*;base64,${Buffer.from(
    props.message.imageObj.data).toString('base64')}` : null;

  return (
    <>
      {props.isSender ? (
        <div>
          <div className={'flex flex-row gap-1.5'}>
            <div
              className={'bg-blue-300 max-w-xs w-auto h-auto rounded-lg flex items-center pl-2 ml-auto'}>
              <divtt
                className={'text-gray-800 text-sm mr-[8px] break-all mt-1.5 mb-1.5'}>
                {props.message.content ?
                  (props.message.content) :
                  (<Image src={imageSrc}/>)}
              </divtt>
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
              <p
                className={'text-gray-800 text-sm mr-[8px] break-all mt-1.5 mb-1.5'}>
                {props.message.content ?
                  (props.message.content) :
                  (<Image src={imageSrc}/>)}
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

export default ChatMessage;