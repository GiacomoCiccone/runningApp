import { Controller } from "react-hook-form";
import TextInput from "./TextInput";

const ControlledTextInput = ({rules, label, name, error, control, ...props}) => {
    return (
        <Controller
            control={control}
            rules={rules}
            render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                    label={label}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={error}
                    {...props}
                />
            )}
            name={name}
        />
    );
};


export default ControlledTextInput;
