import { generalSuccessReducer } from 'hooks/reducers/store';
import {
  JWTFalureHitHandle,
  handleChangePassCodeActions,
  handleEmailCodeActions,
  handleGeneralErrorCodeActions,
  handleGetAnswerFailure,
  handleOTPCodeActions,
  handleUserCodeActions,
} from './response_handlers';
export function successHitHandle(result, utils) {
  const { code } = result.data.roboAgentRs.header.responseStatus;
  const { codeLetters, codeNumbers } = handleExtractCodeInfo(code, 'string');
  console.log('Code Letter======>', codeLetters);
  switch (codeLetters) {
    case '':
      return generalSuccessReducer(result, utils);
    case 'USR':
      return handleUserCodeActions(result, codeNumbers, utils);
    case 'OTP':
      return handleOTPCodeActions(result, codeNumbers, utils);
    case 'EML':
      return handleEmailCodeActions(result, codeNumbers, utils);
    case 'CPW':
      return handleChangePassCodeActions(result, codeNumbers, utils);
    case 'GAM':
      return handleGetAnswerFailure(result, codeNumbers);
    default:
      return handleGeneralErrorCodeActions(result, codeNumbers, utils);
  }
}
export function failureHitHandle(result, utils) {
  const { setAlert } = utils;
  if ([401, 402, 403].includes(result.response?.status)) {
    const { code } = result.response.data.roboAgentRs.header.responseStatus;
    const { codeLetters, codeNumbers } = handleExtractCodeInfo(code);
    switch (codeLetters) {
      case 'JWT':
        return JWTFalureHitHandle(result, codeNumbers);
      default:
        return handleGeneralErrorCodeActions(result, codeNumbers, utils);
    }
  } else {
    console.log('result ===> ', result?.message);
    setAlert({ alertType: 'error', alertMsg: result?.message });
  }
}
export function handleExtractCodeInfo(code = 0) {
  return {
    codeLetters: code
      ?.split('')
      ?.filter((l) => isNaN(Number.parseInt(l)))
      ?.join(''),
    codeNumbers: code
      ?.split('')
      ?.filter((l) => !isNaN(Number.parseInt(l)))
      ?.join(''),
  };
}
