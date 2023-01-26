export const VERI_URL = '/veris';
export const RECIPIENTS_URL = '/recipients';
export const BASE_URL =
  process.env.REACT_APP_BASE_URL || 'http://localhost:5000';
export const SUPPORTED_FORMATS = '.JPG, .JPEC, .PNG, .GIF';
export const DIMENTION_SIZE = 1000;
export const VERI_STATUS = ['draft', 'created', 'disabled', 'enabled'];
export const RECIPIENT_STATUS = ['pending', 'error', 'minting', 'minted'];
