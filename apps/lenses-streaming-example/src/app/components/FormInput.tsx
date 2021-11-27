import {
    InputContainer,
    Input,
    InputIcon,
} from "../../assets/styles/styles";

type BlockProps = {
    type: string;
    placeholder: string;
    value: string;
    name: string;
    onChange: (event: React.SyntheticEvent<HTMLInputElement>) => void;
    icon?: string;
    width?: number;
    marginRight?: number
}

const FormInput: React.FC<BlockProps> = ({
    type,
    placeholder,
    value,
    name,
    onChange,
    icon,
    width,
    marginRight
}) => (
    <InputContainer width={width} marginRight={marginRight}>
        <Input
            type={type}
            placeholder={placeholder}
            value={value}
            name={name}
            onChange={onChange}
            hasIcon={icon}
        />
        {icon && <InputIcon>
            <i className={icon} />
        </InputIcon>}
    </InputContainer>
)

export default FormInput;