import { TErrorResponse, TErrorSources } from '../interface/error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateError = (err: any): TErrorResponse => {
  // Extract the department name using a simple regular expression
  const match = err?.message?.match(/"([^"]+)"/);

  const extractedMessage = match && match[1];

  const errorSources: TErrorSources = [
    {
      path: '',
      message: `${extractedMessage} is already exists!`,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Already Exists!',
    errorSources,
  };
};

export default handleDuplicateError;
