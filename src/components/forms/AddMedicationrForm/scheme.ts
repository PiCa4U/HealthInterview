import * as Yup from 'yup';

export const MedicationSchema = Yup.object().shape({
  name: Yup.string().required(),
  description: Yup.string().required(),
  initialCount: Yup.number()
    .min(0, 'Initial count must be greater than or equal to 0')
    .integer('Value must be an integer')
    .required('Initial count is required')
    .test(
      'is-less-than-destination',
      'Initial count must be less than destination count',
      function (value) {
        let {destinationCount} = this.parent;
        return value <= destinationCount;
      },
    ),
  destinationCount: Yup.number()
    .integer('Value must be an integer')
    .min(1, 'Destination count must be greater than or equal to 0')
    .required('Destination count is required'),
});

export const INIT_VALUES = {
  name: '',
  description: '',
  initialCount: '',
  destinationCount: '',
};
