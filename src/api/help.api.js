/**
 * Help API layer
 * Mock şu an aktif. Gerçek backend'e geçmek için bu
 * dosyadaki mock import'unu axios/fetch çağrısıyla değiştir.
 * Fonksiyon imzası aynı kalır.
 */
import { mockSendHelpRequest } from './mock/help.mock';

export const sendHelpRequest = mockSendHelpRequest;
