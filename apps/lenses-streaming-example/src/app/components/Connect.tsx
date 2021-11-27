import React from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import Button from "./Button";
import { actions } from "../actions";
import { State } from "../config/state";
import { selectHost, selectUser, selectPassword } from "../selectors";
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
  ErrorMessageBody
} from "../../assets/styles/styles";

export type ConnectStateProps = {
  updateHost: (payload: string) => Record<string, unknown>;
  updateUser: (payload: string) => Record<string, unknown>;
  updatePassword: (payload: string) => Record<string, unknown>;
  onLogin: (user: string, password: string, host: string) => void;
  host: string;
  user: string;
  password: string;
  error: string;
};

export type ConnectProps = {
  connection?: boolean;
  heartbeatCount?: number;
};

const _Connect: React.FC<ConnectProps & ConnectStateProps> = ({
  host,
  user,
  password,
  error,
  connection = false,
  heartbeatCount = 0,
  updateHost,
  updateUser,
  updatePassword,
  onLogin,
}) => {
  const onInputChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    const value = target.value;
    const name = target.name;

    switch (name) {
      case "host":
        updateHost(value);
        break;
      case "user":
        updateUser(value);
        break;
      case "password":
        updatePassword(value);
        break;
      default:
        break;
    }
  };
  const btnStyle = classnames("button is-fullwidth", {
    "is-primary": !connection,
    "is-danger": connection,
  });



  return (
    <FormContainer>
      <FormHeader>Connection Details</FormHeader>
      <FormField>
        <FormInput
          type="text"
          placeholder="host"
          value={host}
          name="host"
          onChange={onInputChange}
          icon="fa fa-server"
        />
      </FormField>
      <FormField>
        Heartbeat Count: {heartbeatCount}
      </FormField>
      <FormField>
        <FormInput
          type="text"
          placeholder="User"
          value={user}
          name="user"
          onChange={onInputChange}
          icon="fa fa-user" />
      </FormField>
      <FormField>
        <FormInput
          type="password"
          placeholder="Password for Authentication"
          value={password}
          name="password"
          onChange={onInputChange}
          icon="fa fa-lock" />
      </FormField>
      <FormField>
        <Button
          onClick={() => onLogin(user, password, host)}
          className={btnStyle}
          data-testid="login-button"
          disabled={!host || !user || !password}
        >
          Login
        </Button>
      </FormField>
      {error &&
        <ErrorMessageContainer>
          <ErrorMessageHeader>
            <p>Login falied</p>
          </ErrorMessageHeader>
          <ErrorMessageBody>
            {error}
          </ErrorMessageBody>
        </ErrorMessageContainer>
      }
    </FormContainer >
  );
};

const mapDispatchToProps = {
  ...actions,
};

const mapStateToProps = (state: State) => ({
  host: selectHost(state),
  user: selectUser(state),
  password: selectPassword(state),
});

const Connect = connect(mapStateToProps, mapDispatchToProps)(_Connect);

export default React.memo(Connect);

