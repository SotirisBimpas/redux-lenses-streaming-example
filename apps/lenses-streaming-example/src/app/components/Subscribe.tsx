import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { actions } from "../actions";
import Button from "./Button";
import FormInput from "./FormInput";
import {
  FormContainer,
  FormHeader,
  InputContainer,
  FormField,
  Input,
  InputIcon,
  ErrorMessageContainer,
  ErrorMessageHeader,
  ErrorMessageBody,
  TextAreaContainer,
  TextArea
} from "../../assets/styles/styles";
import { Message, State } from "../config/state";
import {
  selectMin,
  selectMax,
  selectMessages,
  selectFilteredMessages
} from "../selectors";

export type SubscribeStateProps = {
  messages: Message[];
  messageReceived: (payload: Message) => Record<string, unknown>;
  updateMin: (payload: string) => Record<string, unknown>;
  updateMax: (payload: string) => Record<string, unknown>;
  min: string;
  max: string;
};

export type SubscribeProps = {
  clearMessages: () => void,
};

const _Subscribe: React.FC<SubscribeProps & SubscribeStateProps> = ({
  messages,
  clearMessages,
  messageReceived,
  updateMin,
  updateMax,
  min,
  max
}) => {
  const [sqls, setSqlState] = useState("");

  const onSqlsChange = (event: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const target = event.currentTarget;
    const value = target.value;

    setSqlState(value);
  }

  const onInputChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    const value = target.value;
    const name = target.name;

    switch (name) {
      case "min":
        updateMin(value);
        break;
      case "max":
        updateMax(value);
        break;
      default:
        break;
    }
  };

  const onSubscribe = useCallback(() => {
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
      if (msg.data?.rownum === 10000 || !msg.data) {
        ws.close();
        return;
      }
      if (msg.data.rownum < 10000 && msg.type === "RECORD") messageReceived(msg.data);
    }
  }, [messageReceived, sqls]);

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const onUnsubscribe = (topic: string) => { };

  const btnStyle = classnames("button is-small is-info");

  return (
    <FormContainer>
      <FormHeader>
        <TextAreaContainer>
          <TextArea
            placeholder="SQLS"
            value={sqls}
            onChange={onSqlsChange}
            name='sqls'
          />
        </TextAreaContainer>
      </FormHeader >
      <FormField>
        <Button
          style={{ marginRight: "10px" }}
          onClick={onSubscribe}
          className={btnStyle}
          disabled={!sqls}
        >
          Subscribe
        </Button>
        <Button
          style={{ marginRight: "10px" }}
          onClick={clearMessages}
          className="button is-small is-danger"
        >
          Clear Messages
        </Button>
        <FormInput
          type="text"
          placeholder="min"
          value={min}
          name="min"
          onChange={onInputChange}
          width={150}
          marginRight={10}
        />
        <FormInput
          type="text"
          placeholder="max"
          value={max}
          name="max"
          onChange={onInputChange}
          width={150}
        />
      </FormField>
      <FormField>
        Number of messages: {messages.length}
      </FormField>
    </FormContainer >
  );
}

const mapStateToProps = (state: State) => ({
  messages: selectMessages(state),
  min: selectMin(state),
  max: selectMax(state),
});

const mapDispatchToProps = {
  ...actions,
};

const Subscribe = connect(mapStateToProps, mapDispatchToProps)(_Subscribe);

export default Subscribe;
