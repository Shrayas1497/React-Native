// App.tsx
import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import io, {Socket} from 'socket.io-client';

const App: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [incomingCall, setIncomingCall] = useState<{caller: string} | null>(
    null,
  );

  useEffect(() => {
    // Replace 'http://your-socket-io-server' with the actual URL of your Socket.IO server
    const socket = io('http://localhost:5000');
    setSocket(socket);

    // Listen for incoming call events
    socket.on('incomingCall', (data: {caller: string}) => {
      console.log(`Incoming call from ${data.caller}`);
      setIncomingCall(data);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [socket]);

  const answerCall = () => {
    // Implement the logic to answer the call
    if (incomingCall) {
      console.log('Answering call from', incomingCall.caller);
    }
  };

  return (
    <View>
      <Text> hello</Text>
      {incomingCall && (
        <View>
          <Text>{`Incoming call from ${incomingCall.caller}`}</Text>  
          <Button title="Answer Call" onPress={answerCall} />
        </View>
      )}
    </View>
  );
};

export default App;
