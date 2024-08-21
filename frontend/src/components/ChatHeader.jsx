import PropTypes from 'prop-types';

const ChatHeader = (props) => {
  return (
    <div className="bg-sky-600 px-4 py-1.5 mb-2 rounded-md">
      <span className={'text-gray-200 font-mono'}>
        {props.receiver}
      </span>
    </div>
  );
};

ChatHeader.propTypes = {
  receiver: PropTypes.string.isRequired,
}

export default ChatHeader;