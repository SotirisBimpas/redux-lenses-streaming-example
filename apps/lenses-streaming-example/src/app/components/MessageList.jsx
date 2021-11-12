import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { List, AutoSizer } from "react-virtualized";
import { actions } from "../actions";
import ListItemDetails from "./ListItemDetails";

function MessageList(props) {
  const [message, setMessage] = useState();
  const { messages, onCommitMessage } = props;
  const list = useRef();
  console.log({props})

  useEffect(() => {
    if (!message) {
      list.current.scrollToRow(messages.length);
    }
  }, [message, messages.length])

  const onShowRowDetails = d => {
    setMessage(d);
  };

  const rowRenderer = messages => ({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style // Style object to be applied to row (to position it)
  }) => {
    let arr = []
    Object.keys(messages[index].value).forEach(function(k) {
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
            {({ height, width, disableHeight = true }) => (
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

function MessageListItem(props) {
  return (
    <div className="column is-2" style={{maxHeight: '33%', width: '33,33%'}}>
      <div>{props.label}</div>
      {props.value}
    </div>
  );
}

MessageList.defaultProps = {};

MessageList.propTypes = {
  onCommitMessage: PropTypes.func.isRequired,
  messages: PropTypes.array.isRequired,
  message: PropTypes.object
};

const mapStateToProps = state => ({
  message: state.session.message,
});

const mapDispatchToProps = {
  ...actions
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageList);
