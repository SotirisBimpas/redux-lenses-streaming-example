import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect, MapStateToProps } from "react-redux";
import { List, AutoSizer } from "react-virtualized";
import { actions } from "../actions";
import { Message, State } from "../config/state";
import ListItemDetails from "./ListItemDetails";

type Props = {
  onCommitMessage: (message: Message) => void;
  messages: Message[];
}

export type StateProps = {
  message: Message;
};

const MessageList: React.FC<Props> = ({ messages, onCommitMessage }) => {
  const [message, setMessage] = useState<Message | null>(null);
  const list = useRef<List | null>(null);

  useEffect(() => {
    if (!message) {
      list.current && list.current.scrollToRow(messages.length);
    }
  }, [message, messages.length])

  const onShowRowDetails = (d: Message) => {
    setMessage(d);
  };

  const rowRenderer = (messages: Message[]) => ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style // Style object to be applied to row (to position it)
  }: {
    key: string;
    index: number;
    isScrolling: boolean;
    isVisible: boolean;
    style: React.CSSProperties | undefined;
  }) => {
    const arr: { label: string, value: string }[] = [];
    Object.keys(messages[index].value).forEach(function (k) {
      arr.push({ label: k, value: messages[index].value[k] });
    });
    return (
      <div
        key={key}
        style={style}
        className="message-row columns ws-message-list is-multiline is-flex is-flex-direction-column is-flex-wrap-wrap"
        onClick={() => onShowRowDetails(messages[index])}
      >
        <div className="column is-2">
          <div>Index</div>
          {index}
        </div>
        <MessageListItem
          className="key"
          key={messages[index].key}
          label='key'
          value={messages[index].key}
        />
        {arr.map(item => (
          <MessageListItem
            key={item.label}
            label={item.label}
            value={item.value}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <ListItemDetails
        message={message}
        onCommitMessage={onCommitMessage}
        onShowRowDetails={onShowRowDetails}
      />
      <nav className="panel">
        <div className="panel-block">
          <AutoSizer className="autosizer-bulma-fix">
            {({ height, width }) => (
              <List
                ref={ref => list.current = ref}
                width={width}
                height={320}
                rowCount={messages.length}
                rowHeight={160}
                rowRenderer={rowRenderer(messages)}
              />
            )}
          </AutoSizer>
        </div>
      </nav>
    </div>
  );
}

type ItemProps = {
  label: string;
  value: string;
  className?: string;
}

const MessageListItem: React.FC<ItemProps> = ({ label, value, className }) => {
  return (
    <div
      className={`column is-2 ${className || ''}`}
      style={{ maxHeight: '33%', width: '33,33%' }
      }>
      <div>{label}</div>
      {value}
    </div >
  );
}

const mapStateToProps: MapStateToProps<
  StateProps,
  Props,
  State
> = (state: State) => ({
  message: state.session.message,
});

const mapDispatchToProps = {
  ...actions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageList);
