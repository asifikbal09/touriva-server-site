import httpStatus from 'http-status';
import { ZodError} from 'zod';
import { TGenericErrorResponse } from '../types/error';


interface ZodIssueBase {
  readonly code?: string;
  readonly input?: unknown;
  readonly path: PropertyKey[];
  readonly message: string;
}

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const statusCode = httpStatus.BAD_REQUEST;
  let errorMessage: string = '';
  const errorMessageArray = err.issues.map((issue: ZodIssueBase) => {
    return {
      path: issue.path.at(-1),
      message: issue.message,
    };
  });

  errorMessageArray.forEach(
    (message) =>
      (errorMessage =
        errorMessage +
        `${message.path as string} is  ${message.message}. `.toLowerCase()),
  );

  return {
    statusCode,
    message: 'Validation Error',
    errorMessage: errorMessage,
  };
};

export default handleZodError;