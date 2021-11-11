import React from "react";
import { connect, MapStateToProps } from "react-redux";
import axios from 'axios';

import Connect from "../components/Connect";
import Subscribe from "../components/Subscribe";
import MessageList from "../components/MessageList";
import { Message, State } from "../config/state";

export type MainContainerProps = {
  commit: (message: Message) => void;
};

export type MainContainerStateProps = {
  messages: Message[];
};

const _MainContainer: React.FC<MainContainerProps & MainContainerStateProps> =
  ({ messages, commit }) => {
    const loginUser = (user: string, password: string, host: string) => {
      const data = {  
        user,
        password,
      };
      axios.post(`http://${host}/api/login`, data).then((res) => {
        const token = res.data;
        localStorage.setItem('token', JSON.stringify(token));
      });
    };
    return(
      <div className="container app">
        <div className="columns">
          <div className="column">
            <Connect onLogin={(user, password, host) => loginUser(user, password, host)} />
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <Subscribe />
            {messages.length ? (
              <MessageList messages={messages} onCommitMessage={commit} />
            ) : null}
          </div>
        </div>
      </div>
    )
}

const mapStateToProps: MapStateToProps<
  MainContainerStateProps,
  MainContainerProps,
  State
> = (state: State) => ({
  messages: state.session.messages,
});

export const MainContainer = connect(mapStateToProps)(_MainContainer);
