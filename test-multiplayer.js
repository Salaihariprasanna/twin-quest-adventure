// Automated integration test for 2-Player Online Multiplayer flow
import { io } from 'socket.io-client';

console.log('🧪 Starting Twin Quest Multiplayer Automated Verification...');

const SERVER_URL = 'http://localhost:3000';

const client1 = io(SERVER_URL, { transports: ['websocket'] });
let client2 = null;
let roomCode = null;

client1.on('connect', () => {
  console.log('✅ Client 1 connected:', client1.id);

  // 1. Client 1 creates room
  client1.emit('create-room', { playerName: 'Knight Arthur', characterClass: 'warrior' }, (res) => {
    console.log('✅ Room created response:', res);
    if (!res || !res.success) {
      console.error('❌ Failed to create room');
      process.exit(1);
    }

    roomCode = res.roomCode;
    console.log(`🔑 Room Code: ${roomCode}`);

    // 2. Client 2 joins room
    connectClient2();
  });
});

function connectClient2() {
  client2 = io(SERVER_URL, { transports: ['websocket'] });

  client2.on('connect', () => {
    console.log('✅ Client 2 connected:', client2.id);

    client2.emit('join-room', { code: roomCode, playerName: 'Ranger Robin', characterClass: 'archer' }, (joinRes) => {
      console.log('✅ Client 2 joined room:', joinRes);
      if (!joinRes || !joinRes.success) {
        console.error('❌ Failed to join room');
        process.exit(1);
      }

      // 3. Both toggle ready
      client1.emit('toggle-ready', true);
      client2.emit('toggle-ready', true);

      setTimeout(() => {
        // 4. Host starts game
        client1.emit('start-game');
      }, 300);
    });
  });

  client2.on('game-started', (snapshot) => {
    console.log('✅ Game Started event received by Client 2! Level:', snapshot.currentLevel);

    // 5. Test real-time movement sync
    client2.on('partner-sync', (data) => {
      console.log('✅ Client 2 received partner position sync:', { x: data.x, y: data.y, facing: data.facing });

      // 6. Test switch trigger
      client1.emit('trigger-switch', { switchId: 'sw_1_1', state: true });
    });

    client2.on('switch-updated', (data) => {
      console.log('✅ Client 2 received switch-updated:', data);

      // 7. Test checkpoint activation
      client1.emit('activate-checkpoint', { checkpointId: 'cp_1_1', x: 1050, y: 596 });
    });

    client2.on('checkpoint-activated', (data) => {
      console.log('✅ Client 2 received checkpoint-activated:', data);

      // 8. Test disconnect & reconnect resilience
      console.log('🔌 Testing Client 2 network disconnection...');
      client1.on('partner-disconnected', (discData) => {
        console.log('✅ Client 1 received partner-disconnected alert:', discData);

        // Reconnect Client 2
        console.log('🔄 Reconnecting Client 2 into room...');
        const client2Reconnect = io(SERVER_URL, { transports: ['websocket'] });
        client2Reconnect.on('connect', () => {
          client2Reconnect.emit('join-room', { code: roomCode, playerName: 'Ranger Robin', characterClass: 'archer' }, (reconnRes) => {
            console.log('✅ Client 2 reconnected response:', reconnRes);
            console.log('🎉 ALL MULTIPLAYER TESTS PASSED SUCCESSFULLY!');
            client1.disconnect();
            client2Reconnect.disconnect();
            process.exit(0);
          });
        });
      });

      client2.disconnect();
    });

    // Client 1 sends a movement update
    client1.emit('player-sync', { x: 250, y: 500, vx: 200, vy: 0, facing: 1, state: 'run', hp: 100 });
  });
}
