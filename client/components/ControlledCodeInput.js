import { Controller } from "react-hook-form";
import CodeInput from "./CodeInput";


const ControlledInput = ({rules, label, name, error, control, ...props}) => {
    return (
        <Controller
            control={control}
            rules={rules}
            render={({ field: { onChange, onBlur, value } }) => (
                <CodeInput
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


export default ControlledInput;