import { Realtime } from 'ably';
import { useAuthContext } from './AuthContext.jsx';
import { createContext, useState, useEffect, useContext } from 'react';

const AblyContext = createContext();

const useAblyContext = () => {
  return useContext(AblyContext);
}

const AblyContextProvider = ({ children }) => {
  const [ablyClient, setAblyClient] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  const handleEnterChannel = async (channel) => {
    // User enters the channel
    await channel.presence.enter();
    console.log(`User ${authUser._id} has entered the channel`);

    // Fetch the full list of online users and update the state
    const members = await channel.presence.get();
    const allOnlineUsers = members.map(member => member.clientId);
    setOnlineUsers(allOnlineUsers);

    channel.presence.subscribe('enter', (member) => {
      setOnlineUsers((prevUsers) => {
        const updatedUsers = [...prevUsers];
        if (!updatedUsers.includes(member.clientId)) {
          updatedUsers.push(member.clientId);
        }
        return updatedUsers;
      });
    });

    channel.presence.subscribe('leave', (member) => {
      setOnlineUsers(
        (prevUsers) => prevUsers.filter(user => user !== member.clientId));
    });
  }

  useEffect(() => {
    console.log('AblyClient Key:', import.meta.env.VITE_ABLY_CLIENT_API_KEY);
    if (authUser) {
      const ably = new Realtime({
        key: import.meta.env.VITE_ABLY_CLIENT_API_KEY,
        clientId: authUser._id,
      });
      setAblyClient(ably);

      const channel = ably.channels.get('onlineUsers');

      handleEnterChannel(channel)

      return () => {
        channel.presence.leave();
        ably.close();
        setAblyClient(null);
      };
    } else {
      if (ablyClient) {
        ablyClient.close();
        setAblyClient(null);
      }
    }
  }, [authUser]);

  return (
    <AblyContext.Provider value={{ ablyClient, ablyOnlineUsers: onlineUsers }}>
      {children}
    </AblyContext.Provider>
  );
}

export { AblyContext, AblyContextProvider, useAblyContext };
