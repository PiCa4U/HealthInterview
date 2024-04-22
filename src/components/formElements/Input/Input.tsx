import React, {memo} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import {Field} from 'formik';
import {ErrorTint} from './components/ErrorTint';
import {FormFieldContainer} from './components/FormWrapper';
import {AppInput, AppInputProps} from './components/AppInput';

export interface IInputProps extends AppInputProps {
  formikName?: string;
  fieldContainer?: StyleProp<ViewStyle>;
}

export const Input = memo<IInputProps>(
  ({formikName, fieldContainer, ...restProps}) => {
    if (!formikName) {
      return <AppInput {...restProps} />;
    }

    return (
      <Field name={formikName}>
        {({field, meta, form}) => (
          <FormFieldContainer style={fieldContainer}>
            <AppInput
              onChangeText={text => {
                !meta.touched && form.setFieldTouched(formikName);
                field.onChange(formikName)(text);
              }}
              isError={meta.touched && meta.error}
              onBlur={() => form.setFieldTouched(formikName)}
              value={field.value}
              {...restProps}
            />

            {meta.touched && meta.error && (
              <ErrorTint errorMessage={meta.error} />
            )}
          </FormFieldContainer>
        )}
      </Field>
    );
  },
);
