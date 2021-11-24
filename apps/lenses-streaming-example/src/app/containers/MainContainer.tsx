import React, { useState } from "react";
import { connect, MapStateToProps } from "react-redux";
import axios from 'axios';
import { selectMessages, selectFilteredMessages } from "../selectors";

import Connect from "../components/Connect";
import Subscribe from "../components/Subscribe";
import MessageList from "../components/MessageList";
import { Message, State } from "../config/state";

export type MainContainerProps = {
  commit: (message: Message) => void;
};

export type MainContainerStateProps = {
  messages: Message[];
  filteredMessages: Message[];
};

const _MainContainer: React.FC<MainContainerProps & MainContainerStateProps> =
  ({ messages, filteredMessages, commit }) => {
    const [error, setError] = useState<string>('');

    const loginUser = (user: string, password: string, host: string) => {
      const data = {
        user,
        password,
      };
      axios.post(`http://${host}/api/login`, data)
        .then((res) => {
          if (res.status === 200) {
            const token = res.data;
            localStorage.setItem('token', JSON.stringify(token));
          }
        })
        .catch(err => {
          setError('Please check your host and credentials')
        })
    };

    const list = filteredMessages.length ? filteredMessages : messages.length ? messages : []
    return (
      <div className="container app">
        <div className="columns">
          <div className="column">
            <Connect onLogin={(user, password, host) => loginUser(user, password, host)} error={error} />
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <Subscribe />
            {list.length ? (
              <MessageList messages={list} onCommitMessage={commit} />
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
  messages: selectMessages(state),
  filteredMessages: selectFilteredMessages(state),
});

export const MainContainer = connect(mapStateToProps)(_MainContainer);

