import { useEffect, useState } from "react"
import { capitalize } from "@material-ui/core"
import { colors, defaultFont } from "../defaultStyles"
import "./Messages.css"


const MessageBox = (props) => (
    <div style={styles.message}>
        <p style={styles.nameOnMessage}>{capitalize(props.name)}</p>
        <p>{props.children}</p>
    </div>
)

const UserMessageBox = (props) => (
    <div style={{ ...styles.message, backgroundColor: colors.userMessageBackground, alignSelf: 'flex-end' }}>
        <p style={styles.nameOnMessage}>{capitalize(props.name)}</p>
        <p style={{ color: colors.userMessageText }}>{props.children}</p>
    </div>
)



export const Chat = ({ chat, userId, chatHeight }) => {
    return (
        <div style={{
            flex: 3, backgroundColor: colors.elementBackground, margin: 50, borderRadius: 30, overflow: 'hidden',
            paddingTop: 30, paddingLeft: 30, boxShadow: "0px 0px 5px #9E9E9E"
        }}>
            <div style={{ display: 'flex', flexDirection: 'column-reverse', overflow: 'auto', height: chatHeight }}>
                {chat.length !== 0 &&
                    [...chat].reverse().map(({ name, message, msgUserId }, index) => (
                        (msgUserId === userId) ?
                            <UserMessageBox playAnimOnStart={index === 0} key={index} name={name}>{message}</UserMessageBox> :
                            <MessageBox playAnimOnStart={index === 0} key={index} name={name}>{message}</MessageBox>
                    ))}

            </div>

        </div >
    )
}


const styles = {
    message: {
        backgroundColor: colors.messageBackground,
        width: '50%',
        color: colors.defaultText,
        padding: 8,
        flexWrap: 'wrap',
        wordBreak: 'break-all',
        borderRadius: 10,
        margin: 10,
        fontFamily: defaultFont.fontFamily,
        fontSize: 16,
        boxShadow: "0px 0px 4px #9E9E9E"
    },
    nameOnMessage: {
        color: colors.theme,
        fontWeight: 'bold',
        fontFamily: defaultFont.fontFamily
    }
}