import React, { useState, useEffect } from "react";
import io from 'socket.io-client';
import TextField from '@material-ui/core/TextField';
import { Chat } from "./Components/Messages";
import { defaultFont, colors } from "./defaultStyles";

// Инициализируем сокет
const socket = io.connect('http://localhost:80')


let userName;
let userId;

const App = () => {

  // Данные сообщения - имя и само сообщение
  const [msgData, setMsgData] = useState({ message: '', name: '', msgUserId: -1 });
  // Все последние сообщения
  const [chat, setChat] = useState([]);

  // Получение размеров окна
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /**
   * Вернёт true, если ширина экрана больше высоты 
   */
  let GetScreenIsWide = () => windowDimensions.width > windowDimensions.height;

  useEffect(() => {
    // Смена цвета фона страницы
    document.body.style.background = colors.mainBackground;

    // Подключаем сокеты
    socket.on('message', ({ name, message, msgUserId }) => {
      setChat(c => [...c, { name, message, msgUserId }]);
    })

    // Задать id пользователю, чтобы отличать его сообщения
    userId = parseInt(Math.random() * (100000000 - 0), 10);
    setMsgData({ ...msgData, msgUserId: userId });
  }, [])



  const onTextChange = e => {
    if (e.target.name === 'name')
      userName = e.target.value;
    setMsgData({ ...msgData, [e.target.name]: e.target.value });
  }

  const onMessageSubmit = e => {
    e.preventDefault();
    const { name, message, msgUserId } = msgData;
    socket.emit('message', { name, message, msgUserId });
  }


  return (
    <div style={{ display: 'flex', backgroundColor: colors.mainBackground, fontFamily: defaultFont.fontFamily }}>

      {/* Вывод чата */}
      <Chat chat={chat} userId={userId} chatHeight={windowDimensions.height / 1.15} />

      <form style={{ ...styles.sendForm, flexDirection: GetScreenIsWide() ? 'column' : 'row' }} onSubmit={onMessageSubmit}>
        <h2> Messenger </h2>
        <TextField
          name='name'
          onChange={e => onTextChange(e)}
          value={msgData.msgData}
          label='Name'
        />
        {/* Ввод сообщения */}
        <div>
          <TextField
            name='message'
            onChange={e => onTextChange(e)}
            value={msgData.msgData}
            label='Message'
          />
        </div>

        {/* Кнопка отправки */}
        <button style={{
          ...styles.button, backgroundColor: colors.theme, color: colors.userMessageText
        }}> Send </button>

        {/* Кнопка очистки */}
        <button onClick={(e) => { e.preventDefault(); setChat([]) }} style={styles.button}> Clear </button>
      </form>
    </div>
  );
}


const styles = {
  sendForm: {
    backgroundColor: colors.elementBackground,
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  button: {
    marginTop: 30,
    width: '60%',
    borderRadius: 15,
    borderWidth: 0,
    height: 70,
    fontWeight: 'bold',
    color: "#4d4c69",
    fontSize: 15,
    boxShadow: "0px 0px 4px #9E9E9E"
  }
}

export default App;

export const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}
