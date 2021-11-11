import React, { useState } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { actions } from "../actions";
import Button from "./Button";
import { Message, State } from "../config/state";

export type SubscribeStateProps = {
  messages: Message[];
  messageReceived: (payload: Message) => Record<string, unknown>;
};

export type SubscribeProps = {
  clearMessages: ()=>void,
};

const _Subscribe: React.FC<SubscribeProps & SubscribeStateProps> = ({
  messages,
  clearMessages,
  messageReceived
}) => {
  const [sqls, setSqlState] = useState("");

  const onSqlsChange = (event:React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = event.currentTarget;
    const value = target.value;

    setSqlState(value);
  }

  const onSubscribe = () => {
      const ws = new WebSocket('ws://localhost:3030/api/ws/v2/sql/execute')
      ws.onclose = (e) => {
        console.log('Readystate is', ws.readyState, '.Backentd WebSocket is closed now.', e);
      };
      ws.onopen = (e) => {
        console.log('Readystate is', ws.readyState, '.Backentd WebSocket is open now.', e);
        const value = localStorage.getItem('token') || ''
        const token = JSON.parse(value);
        ws.send(JSON.stringify({
          token: token,
          sql: sqls,
          stats: 2000
        }))
      };
      ws.onerror = (e) => {
        console.log('WebSocket error observed:', e);
      };
      ws.onmessage = (e) => {
        const msg = JSON.parse(e.data);
        if(msg.data.rownum <= 10 && msg.type === "RECORD") messageReceived(msg.data);
        if(msg.data.rownum === 10) ws.close(1000);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onUnsubscribe = (topic:string) => {};

  const btnStyle = classnames("button is-small is-info");

  return (
    <nav className="ws-subscribe panel">
      <div className="panel-heading">
        <div className="field has-addons">
          <p className="control is-expanded">
            <textarea
              className="textarea is-small is-info"
              placeholder="SQLS"
              value={sqls}
              onChange={onSqlsChange}
            />
          </p>
        </div>
      </div>
      <div className="panel-block">
        <div className="control">
          <Button
            style={{ marginRight: "10px" }}
            onClick={onSubscribe}
            className={btnStyle}
            disabled={!sqls}
          >
            Subscribe
          </Button>
          <Button
            onClick={clearMessages}
            className="button is-small is-danger"
          >
            Clear Messages
          </Button>
        </div>
      </div>
      <div className="panel-block">
        <div className="control">Number of messages: {messages.length}</div>
      </div>
    </nav>
  );
}

const mapStateToProps = (state:State) => ({
  messages: state.session.messages,
});

const mapDispatchToProps = {
  ...actions,
};

const Subscribe = connect(mapStateToProps, mapDispatchToProps)(_Subscribe);

export default Subscribe;
